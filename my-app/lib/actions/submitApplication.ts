"use server";

export async function submitApplication(data: any) {
  // simulate a processing delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // save submission TODO
  return {
    success: true,
    confirmationId: crypto.randomUUID(), // Returns a GUID
  };
}
