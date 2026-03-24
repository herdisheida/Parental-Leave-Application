"use server";

export async function submitApplication(data: any) {
  try {
    // simulate a processing delay of 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    //  TODO - delete when done testing
    // mock random failure (for test)
    // if (Math.random() > 0.9) throw new Error("Database connection failed");

    // return success with a GUID confirmation number
    return {
      success: true,
      confirmationId: crypto.randomUUID(),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while submitting. Please try again.",
    };
  }
}
