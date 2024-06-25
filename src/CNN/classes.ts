export const classesEnum = {
  0: "vascular_lesion",
  1: "actinic_keratosis",
  2: "basal_cell_carcinoma",
  3: "dermatofibroma",
  4: "melanoma",
  5: "nevus",
  6: "pigmented_bening_keratosis",
  7: "seborrheic_keratosis",
  8: "solar_lentigo",
  9: "squamous_cell_carcinoma",
} as const;

type ClassIndex = keyof typeof classesEnum;
