import { FiberManualRecordRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Meal } from "../interfaces/MealsInterface";
import { getAllMeals } from "../services/mealsService";

export function MealsList() {
  const [mealsList, setMealsList] = useState<Meal[]>([
    {
      id: "",
      created_at: "",
      user_id: "",
      name: "",
      description: "",
      in_diet: true,
      time: "",
    },
  ]);

  const navigate = useNavigate();

  function editMeal(mealId: string | undefined) {
    navigate(`/meals/${mealId}`, {
      state: {
        id: mealId,
      },
    });
  }

  function groupMealsByDay(meals: Meal[]) {
    const groupedMeals = meals.reduce(
      (acc: { [date: string]: Meal[] }, meal) => {
        const date =
          meal.time.slice(0, 2) +
          "." +
          meal.time.slice(3, 5) +
          "." +
          meal.time.slice(8, 10);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(meal);
        return acc;
      },
      {}
    );
    return groupedMeals;
  }

  const groupedMeals = groupMealsByDay(mealsList);

  useEffect(() => {
    const getMealsData = async () => {
      try {
        const data = await getAllMeals();
        setMealsList(data.data.meals);
      } catch (error) {
        console.error("Erro ao buscar dados");
      }
    };
    getMealsData();
  }, []);

  return (
    <>
      {Object.entries(groupedMeals).map(([date, meals]) => (
        <div key={date} className="w-full mt-6">
          <strong>{date}</strong>
          {meals.map((meal) => (
            <button
              key={meal.id}
              onClick={() => editMeal(meal?.id)}
              className="font-nunito antialiased rounded-lg w-full mt-4 p-4 border border-gray-5 flex gap-2 justify-center items-center"
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <strong className="text-gray-1">
                    {meal?.created_at?.slice(11, 16)}{" "}
                  </strong>
                  <span className="text-gray-2">| {meal.name}</span>
                </div>
                <div>
                  <FiberManualRecordRounded
                    className={`${
                      meal.in_diet ? "text-green-mid" : "text-red-mid"
                    }`}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      ))}
    </>
  );
}
