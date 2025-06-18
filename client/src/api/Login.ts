const BaseURL = "http://localhost:3000";

export async function loginUser(loginData: { mail: string; password: string }) {
  try {
    const response = await fetch(`${BaseURL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el login");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const loginGoogle = async (idToken: string) => {
  const response = await fetch(`${BaseURL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error en el login con Google");
  }

  return response.json();
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BaseURL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cerrar sesión");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error al cerrar sesión");
  }
};
