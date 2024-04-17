import { Meal } from "../interfaces/MealsInterface";
import { getToken } from "../storage/auth/getToken";
import { API } from "./API";

export const createMeal = async ({
  name,
  description,
  in_diet,
  time,
}: Meal) => {
  try {
    const token = getToken();
    const newMealResponse = await API.post(
      "/meals",
      {
        name,
        description,
        in_diet,
        time,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return newMealResponse;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
};

export const getAllMeals = async () => {
  try {
    const token = getToken();
    const getAllMealsResponse = await API.get("/meals", {
      headers: {
        Authorization: `${token}`,
      },
    });

    return getAllMealsResponse;
  } catch (error) {
    console.error(
      "Erro ao buscar refeições cadastradas, recarregue a página e tente novamente!",
      error
    );
    throw error;
  }
};

export const getOneMeal = async (mealId: string) => {
  try {
    const token = getToken();
    const getOneMealResponse = await API.get(`/meals/${mealId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return getOneMealResponse;
  } catch (error) {
    console.error("Erro ao acessar refeição");
    throw error;
  }
};
