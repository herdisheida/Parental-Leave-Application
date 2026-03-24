import { z } from "zod";

// Step 1 : Applicant
export const applicantSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  kennitala: z.string().regex(/^\d{10}$/, "Kennitala must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  email: z.string().min(4, "Email is required").email("Email is invalid"),
  phone: z.string().regex(/^\d{7}$/, "Phone number must be 7 digits"),
});

// Step 2: Employment
export const employmentSchema = z
  .object({
    employmentType: z.enum(
      ["Employed", "Self-employed", "Unemployed"],
      "Employment type is required",
    ),
    employerName: z.string().min(1, "Employer name is required").optional(),
    employmentRatio: z.coerce
      .number()
      .min(1, "Employment ratio must be between 1-100")
      .max(100, "Employment ratio must be between 1-100")
      .optional(),
    companyName: z.string().min(1, "Company name is required").optional(),
  })
  .refine(
    (data) => {
      if (data.employmentType === "Employed")
        return !!data.employerName && !!data.employmentRatio;
      if (data.employmentType === "Self-employed") return !!data.companyName;
      return true;
    },
    { message: "Required fields for employment type are missing" },
  );

// Step 3: Partner
export const partnerSchema = z
  .object({
    hasPartner: z.boolean(),
    partnerFullName: z
      .string()
      .min(1, "Partner's full name is required")
      .optional(),
    partnerKennitala: z
      .string()
      .regex(/^\d{10}$/, "Kennitala must be 10 digits")
      .optional(),
    partnerEmploymentStatus: z.enum(
      ["Employed", "Self-employed", "Unemployed"],
      "Partner's employment status is required",
    ),
  })
  .refine(
    (data) => {
      if (data.hasPartner) {
        return (
          !!data.partnerFullName &&
          !!data.partnerKennitala &&
          !!data.partnerEmploymentStatus
        );
      }
      return true;
    },
    { message: "Partner details are required if you have a partner" },
  );

// Step 4: Leave
export const leaveSchema = z
  .object({
    startDate: z.date("Start date is required"),
    endDate: z.date("End date is required"),
    leaveRatio: z.enum(["25%", "50%", "75%", "100%"], {
      message: "Please select a leave ratio",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      if (data.endDate <= data.startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date must be after the start date",
          path: ["endDate"],
        });
      }

      const diffInMs = data.endDate.getTime() - data.startDate.getTime();
      const msInMonth = 1000 * 60 * 60 * 24 * 30.44;
      const diffInMonths = diffInMs / msInMonth;
      if (diffInMonths > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Total leave duration cannot exceed 12 months",
          path: ["endDate"],
        });
      }
    }
  });

// Step 5: Payment
export const paymentSchema = z.object({
  bankNumber: z
    .string()
    .min(1, "Bank number is required")
    .regex(/^\d{4}$/, "Bank number must be 4 digits"),
  ledger: z
    .string()
    .min(1, "Ledger is required")
    .regex(/^\d{2}$/, "Ledger must be 2 digits"),
  accountNumber: z
    .string()
    .min(1, "Account number is required")
    .regex(/^\d{6}$/, "Account number must be 6 digits"),
  // TODO - all fields are validated seperatoely but displayed together
});

// Step 6: Documents
export const documentsSchema = z.object({
  files: z
    .array(z.any())
    .min(1, "At least one document is required")
    .refine((files) => {
      return files.every((file: File) => file.size <= 25 * 1024 * 1024);
    }, "Max file size is 25 MB per file")
    .refine((files) => {
      const acceptedTypes = ["application/pdf", "image/jpeg", "image/png"];
      return files.every((file: File) => acceptedTypes.includes(file.type));
    }, "Accepted formats are .pdf, .jpg, .png"),
});

// merge schemas for the entire form
export const masterSchema = applicantSchema
  .merge(employmentSchema)
  .merge(partnerSchema)
  .merge(leaveSchema)
  .merge(paymentSchema)
  .merge(documentsSchema);
export type MasterData = z.infer<typeof masterSchema>;
