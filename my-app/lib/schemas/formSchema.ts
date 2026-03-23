import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

// step 1 : applicant schema
export const applicantSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  kennitala: z.string().regex(/^\d{10}$/, "Kennitala must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  email: z.string().min(4, "Email is required").email("Email is invalid"),
  phone: z.string().regex(/^\d{7}$/, "Phone number must be 7 digits"),
});

// step 2 : employment schema
