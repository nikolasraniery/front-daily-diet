import AddRounded from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { MealsList } from "../components/MealsList";
import { Percentage } from "../components/Percentage";
import { Profile } from "../components/Profile";

export function Dashboard() {
  const navigate = useNavigate();

  function redirectNewMeal() {
    navigate("/meals");
  }

  return (
    <div className="w-full h-screen flex flex-col gap-4 p-6">
      <div className="flex justify-between">
        <Logo />
        <Profile />
      </div>
      <Percentage />
      <div className="flex flex-col mt-6">
        <span>Refeições</span>
        <button
          className="bg-gray-2 text-white font-nunito antialiased rounded-lg mt-4 p-2 active:bg-gray-1 flex gap-2 justify-center items-center"
          onClick={redirectNewMeal}
        >
          <AddRounded />
          <span>Nova refeição</span>
        </button>
      </div>
      <div className="mt-4 pb-16 flex flex-col font-nunito antialiased">
        <MealsList />
      </div>
    </div>
  );
}
