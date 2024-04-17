import { useEffect, useState } from "react";
import { Meal } from "../interfaces/MealsInterface";
import { getAllMeals } from "../services/mealsService";
import { GreenArrow } from "./GreenArrow";

export function Percentage() {
  const [mealsPercentage, setMealsToPercentage] = useState<{
    meals: Meal[];
    total: number;
  } | null>(null);
  const [percentages, setPercentages] = useState({
    inDietPercentage: 0,
    notInDietPercentage: 0,
  });

  const calculatePercentages = () => {
    if (!mealsPercentage)
      return { inDietPercentage: 0, notInDietPercentage: 0 };

    const { meals, total } = mealsPercentage;
    let inDietCount = 0;
    let notInDietCount = 0;

    meals.forEach((meal) => {
      if (meal.in_diet) {
        inDietCount++;
      } else {
        notInDietCount++;
      }
    });

    const inDietPercentage = (inDietCount / total) * 100;
    const notInDietPercentage = (notInDietCount / total) * 100;

    return { inDietPercentage, notInDietPercentage };
  };

  useEffect(() => {
    const { inDietPercentage, notInDietPercentage } = calculatePercentages();
    setPercentages({ inDietPercentage, notInDietPercentage });
  }, [mealsPercentage]);

  const { inDietPercentage = 0 } = calculatePercentages();

  function changePercentageColor(mealsToPercentageColor?: string) {
    if (inDietPercentage < 40) {
      mealsToPercentageColor = "bg-red-light";
    } else {
      mealsToPercentageColor = "bg-green-light";
    }
    return mealsToPercentageColor;
  }

  const percentageBackgroundColor = changePercentageColor();

  function changeArrowColor(arrowColor?: string) {
    if (inDietPercentage < 40) {
      arrowColor = "#BF3B44";
    } else {
      arrowColor = "#639339";
    }
    return arrowColor;
  }

  const percentageArrowColor = changeArrowColor();

  useEffect(() => {
    const fetchMealsData = async () => {
      try {
        const data = await getAllMeals();
        setMealsToPercentage(data.data);
      } catch (error) {
        console.error("Erro ao buscar dados");
      }
    };
    fetchMealsData();
  }, []);

  return (
    <div
      className={`${percentageBackgroundColor} flex flex-col justify-center items-center pt-4 pb-4 rounded-md font-nunito antialiased`}
    >
      <div className="flex items-center justify-center w-full">
        <strong className="flex justify-center text-32 w-full ml-8">
          {percentages.inDietPercentage.toFixed(2).replace(".", ",")}%
        </strong>
        <GreenArrow
          fill={`${percentageArrowColor}`}
          className={`flex justify-start w-[60px] self-start`}
        />
      </div>
      <span>das refeições dentro da dieta</span>
    </div>
  );
}
