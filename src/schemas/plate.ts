import { z } from "zod";

const VALID_REGION_CODES = new Set([
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "75",
  "77",
  "85",
  "88",
  "90",
]);

const CAR_RE = /^(\d{2})[A-Z]{2}\d{3}$/;
const MOTO_RE = /^(\d{2})[A-Z]{1}\d{3}$/;

function isValidPlate(val: string): boolean {
  const m = CAR_RE.exec(val) ?? MOTO_RE.exec(val);
  return m !== null && VALID_REGION_CODES.has(m[1]);
}

export const plateSchema = z.object({
  plateNumber: z
    .string()
    .trim()
    .toUpperCase()
    .superRefine((val, ctx) => {
      const hasFormat = CAR_RE.test(val) || MOTO_RE.test(val);
      if (!hasFormat) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid plate format. Car: 77PU488, motorcycle: 10A100",
        });
        return;
      }
      if (!isValidPlate(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid region code "${val.slice(0, 2)}"`,
        });
      }
    }),
});

export type PlateFormData = z.infer<typeof plateSchema>;

export type PlateErrorState = {
  plateNumber: string | null;
};
