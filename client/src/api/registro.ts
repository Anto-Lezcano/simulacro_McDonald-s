const BaseURL = "http://localhost:3000";

export async function registerUser(userData: {
  username: string;
  mail: string;
  password: string;
}) {
  try {
    const response = await fetch(`${BaseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el registro");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
