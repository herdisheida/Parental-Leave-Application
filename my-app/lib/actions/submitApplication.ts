"use server";

import { MasterData } from "../schemas/formSchema";

export async function submitApplication(formData: FormData) {
  try {
    // simulate a processing (3 sec delay)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const fullName = formData.get("fullName");
    const files = formData.getAll("files"); // Gets all uploaded files

    console.log(`Processing application for: ${fullName}`);
    console.log(`Number of files: ${files.length}`);
    //  TODO - delete when done testing
    // mock random failure (for test)
    // if (Math.random() > 0.9) throw new Error("Database connection failed");

    // return success with a GUID confirmation number
    return {
      success: true,
      confirmationId: crypto.randomUUID(),
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      message: "An error occurred while submitting. Please try again.",
    };
  }
}
