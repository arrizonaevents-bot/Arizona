"use server";

export async function submitContactForm(formData: any) {
  const scriptURL = process.env.CONTACT_FORM_URL;

  if (!scriptURL) {
    throw new Error("CONTACT_FORM_URL is not defined in environment variables");
  }

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Note: Google Apps Script Web Apps usually return a redirect or a 200 OK
    // Even if it's no-cors on client, on server we can handle the response.
    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error: "Failed to send message" };
  }
}
