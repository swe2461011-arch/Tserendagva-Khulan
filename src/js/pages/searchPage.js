
import { getNutritions } from "../services/nutritionService.js";

import {
  buildFoodGroups,
  bindSearchEvents,
  renderDefaultTables,
  initNutritionData,
} from "../fn/foodSearchEvents.js";

import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";

import {
  bindSidebar,
  bindMenuListToggle,
} from "../fn/sidebarEvents.js";

import { renderPageLayout } from "../layouts/pageLayout.js";

import { renderNotification } from "../layouts/notificationLayout.js";

import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";

import { renderSearchSettings } from "../components/searchSettingsSidebar.js";

import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";

import { loadImages } from "../../services/imageService.js";

import {
  renderImageModal,
  bindImageModalEvents,
} from "../components/imageModal.js";


let imageModalBound = false;


export async function renderSearchPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    content: renderNotification("Loading data..."),
  });

  try {
    const nutritionData = await getNutritions();

    await loadImages();

    initNutritionData(nutritionData);

    const groupedFoods = buildFoodGroups(nutritionData);

    app.innerHTML =
      renderSidebarPageLayout({
        sidebarContent: `
          ${renderSearchFoodName()}
          ${renderSearchSettings()}
          ${renderFoodGroupList(groupedFoods)}
        `,

        pageId: "search",

        pageTitle: "Food Composition Database",

        mainContent: `
          <div id="resultTbl">
            ${renderDefaultTables(nutritionData)}
          </div>
        `,
      }) + renderImageModal();


    bindSidebar();

    bindMenuListToggle();

    bindSearchEvents();


    if (!imageModalBound) {
      bindImageModalEvents();

      imageModalBound = true;
    }

  } catch (error) {

    app.innerHTML = renderPageLayout({
      content: renderNotification(
        "Failed to load nutrition data.",
        "danger"
      ),
    });

    console.error(
      "Failed to load nutrition data:",
      error
    );
  }
}

