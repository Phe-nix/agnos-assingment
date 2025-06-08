"use server";

import { sendFormUpdate } from "@/storage/websocket";
import { z } from "zod";

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const patientInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  dateOfBirth: z
    .string()
    .regex(dateRegex, "Date of birth must be in YYYY-MM-DD format"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
  preferredLanguage: z.string().min(1, "Preferred language is required").trim(),
  nationality: z.string().min(1, "Nationality is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  address: z.string().min(1, "Address is required").trim(),
  street: z.string().min(1, "Street is required").trim(),
  province: z.string().min(1, "Province is required").trim(),
  district: z.string().min(1, "District is required").trim(),
  subDistrict: z.string().min(1, "Sub-District is required").trim(),
  postalCode: z
    .string()
    .length(5, "Postal code must be 5 digits")
    .regex(/^\d+$/, "Postal code must contain only digits"),

  emergencyContactName: z
    .string()
    .min(1, "Emergency contact name is required")
    .trim(),
  emergencyContactPhone: z
    .string()
    .regex(phoneRegex, "Invalid emergency contact phone format"),
  emergencyContactRelationship: z
    .string()
    .min(1, "Emergency contact relationship is required")
    .trim(),
});

export async function submitInformation(state: any, formData: FormData) {
  const validatedData = patientInfoSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validatedData.success) {
    console.log(validatedData.error.flatten().fieldErrors);
    sendFormUpdate({ status: "failed" });
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  sendFormUpdate({
    ...validatedData.data,
    status: "submitted",
  });

  return {
    success: true,
    data: validatedData.data,
  };
}
