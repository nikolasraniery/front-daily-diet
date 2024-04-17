import { AuthInterface } from "../interfaces/Auth.interface";
import { UserDataProps } from "../interfaces/UserDataProps";
import { getToken } from "../storage/auth/getToken";
import { API } from "./API";

export const userRegister = async (userData: UserDataProps) => {
  try {
    const response = await API.post("/user", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
};

export const userLogin = async (
  userData: UserDataProps
): Promise<AuthInterface> => {
  try {
    const response = await API.post("/login", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const token = getToken();
    const response = await API.get("/user", {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};
