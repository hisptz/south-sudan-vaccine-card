export const VACCINE_CARD_DOSES_HEADERS = [
  "bbnyNYD1wgS",
  "Yp1F4txx8tm",
  "LUIsbsm3okG",
  "eventDate",
  "orgUnitName",
];

export const VACCINE_CARD_LOCATION = ["state", "country", "payam"];

export const VACCINE_CARD_BIO = [
  [
    {
      id: "identificationNumber",
      name: "Identification number",
      ids: ["KSr2yTdu1AI"],
    },
    {
      id: "fullName",
      name: "Full name",
      ids: ["sB1IHYu2xQT", "NfbmVFsS80D", "ENRjVGxVL6l"],
    },
    { id: "dateOfBirth", name: "Date of birth", ids: ["NI0QRzJvQ0k"] },
    { id: "age", name: "Age", ids: ["Rv8WM2mTuS5"] },
    { id: "gender", name: "Gender", ids: ["oindugucx72"] },
  ],
  [
    { name: "Phone #", ids: ["fctSQp5nAYl"] },
    { name: "Physical Address", ids: ["Xhdn49gUd52"] },
    { name: "Occupation", ids: ["LY2bDXpNvS7"] },
    { name: "History of Allergy", ids: ["dWoveSw6b79"] },
    { name: "Existing condition", ids: ["bCtWZGjSWM8"] },
  ],
];

export const VACCINE_CARD_QR_CODE = {
  bioData: [
    { name: "Identification number", ids: ["KSr2yTdu1AI"] },
    { name: "Full name", ids: ["sB1IHYu2xQT", "NfbmVFsS80D", "ENRjVGxVL6l"] },
    { name: "Date of birth", ids: ["NI0QRzJvQ0k"] },
    { name: "Age", ids: ["Rv8WM2mTuS5"] },
    { name: "Gender", ids: ["oindugucx72"] },
    { name: "Phone #", ids: ["fctSQp5nAYl"] },
  ],
  doseData: [
    { name: "Vaccine", ids: ["bbnyNYD1wgS"] },
    { name: "Date", ids: ["eventDate"] },
    { name: "Place", ids: ["orgUnitName"] },
  ],
};
