import { titleFromKey, escapeHtml } from "../fn/format.js";
import { renderTable } from "../layouts/tableLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { getImagesByFoodCode } from "../services/imageService.js";
import { getLocalizedValue, formatDate, t } from "../i18n/i18n.js";

/* Хайлтын үр дүнгийн хүснэгтийг харуулах хэсэг */
export function renderNutritionTables(items, selectedTypes) {
  // Хайлтын үр дүн олдохгүй бол анхааруулах мессеж харуулна.
  if (!items.length) {
    return renderNotification(t("notification.noMatchFound"));
  }

  // Ямар нэгэн шим тэжээлийн төрлийг сонгоогүй бол
  if (!selectedTypes.length) {
    return renderNotification(t("notification.selectAtLeastOneCategory"));
  }

  // Сонгосон төрлүүдээр хүснэгт үүсгэнэ.
  return selectedTypes
    .map((type) => renderTableByType(type, items))
    .join("");
}


/* Тухайн type-ийн хүснэгтийг үүсгэнэ */
function renderTableByType(type, items) {

  /* =========================
     DESCRIPTION
  ========================= */

  if (type === "description") {
    return renderTable({
      title: t("table.description"),

      columns: [
        {
          key: "food_name",
          label: t("table.foodName"),
        },
        {
          key: "food_group",
          label: t("table.foodGroup"),
        },
        {
          key: "scientific_name",
          label: t("table.scientificName"),
        },
        {
          key: "province",
          label: t("table.province"),
        },
      ],

      rows: items.map((item) => ({
        ...item,
        food_name: getLocalizedValue(item.food_name),
        food_group: getLocalizedValue(item.food_group),
        province: getLocalizedValue(item.province),
      })),
    });
  }


  /* =========================
     IMAGES
  ========================= */

  if (type === "images") {
    return renderTable({
      title: t("table.images"),

      columns: [
        {
          key: "food_name",
          label: t("table.foodName"),
        },

        {
          key: "number_of_images",
          label: t("table.numberOfImages"),

          render: (item) => {
            const foodCode = String(item.food_code ?? "").trim();

            const images = getImagesByFoodCode(foodCode);

            const count = Array.isArray(images)
              ? images.length
              : 0;

            if (count === 0) {
              return "-";
            }

            return `
              <span
                class="tag is-primary image-count-tag open-image-btn"
                data-foodcode="${escapeHtml(foodCode)}"
                data-foodname="${escapeHtml(
                  getLocalizedValue(item.food_name)
                )}"
              >
                ${count}
              </span>
            `;
          },
        },
      ],

      rows: items.map((item) => ({
        ...item,
        food_name: getLocalizedValue(item.food_name),
      })),
    });
  }


  /* =========================
     NUTRITION DATA
  ========================= */

  const nutrientKeys = Array.from(
    new Set(
      items.flatMap((item) => {
        const data = item?.[type];

        return data &&
          typeof data === "object" &&
          !Array.isArray(data)
          ? Object.keys(data)
          : [];
      })
    )
  );


  /* =========================
     COLUMNS
  ========================= */

  const columns = [
    {
      key: "food_name",
      label: t("table.foodName"),
    },

    ...nutrientKeys.map((key) => ({
      key,

      label:
        t(`table.${key}`) !== `table.${key}`
          ? t(`table.${key}`)
          : t(`nutrients.${key}`) !== `nutrients.${key}`
            ? t(`nutrients.${key}`)
            : key,
    })),
  ];


  /* =========================
     ROWS
  ========================= */

  const rows = items.map((item) => {
    const rowData = getLocalizedValue(
      item?.[type] &&
      typeof item[type] === "object"
        ? item[type]
        : {}
    );

    if (rowData["Collection date"]) {
      rowData["Collection date"] =
        formatDate(rowData["Collection date"]);
    }

    return {
      food_name: getLocalizedValue(item.food_name),
      ...rowData,
    };
  });


  /* =========================
     FINAL TABLE
  ========================= */

  return renderTable({
    title:
      t(`sidebar.${type}`) !== `sidebar.${type}`
        ? t(`sidebar.${type}`)
        : titleFromKey(type),

    columns,
    rows,
  });
}