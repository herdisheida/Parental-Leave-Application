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
    employmentType: z.enum(["Employed", "Self-employed", "Unemployed"]),
    employerName: z.string().min(1, "Employer name is required").optional(),
    employmentRatio: z.coerce.number().min(1).max(100).optional(),
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
    partnerEmploymentStatus: z.enum([
      "Employed",
      "Self-employed",
      "Unemployed",
    ]),
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
export const leaveSchema = z.object({
  leaveStart: z.string().min(1, "Leave start date is required"),
  leaveEnd: z.string().min(1, "Leave end date is required"),
  // TODO - add validation to ensure end date is after start date + max 12 months + leave ratio
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
  files: z.array(z.string()).min(1, "At least one document must be uploaded"),

  // TODO this validation bullshit
  // Accepted file types are: .pdf, .jpg, .png
  // Maximum file size is 25 MB per file
  // Multiple files can be uploaded
  // The file name of each uploaded file should be displayed after selection
});

// merge schemas for the entire form
export const masterSchema = applicantSchema
  .merge(employmentSchema)
  .merge(partnerSchema)
  .merge(leaveSchema)
  .merge(paymentSchema)
  .merge(documentsSchema);
export type MasterData = z.infer<typeof masterSchema>;
