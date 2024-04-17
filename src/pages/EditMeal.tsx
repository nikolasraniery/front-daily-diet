import { FiberManualRecordRounded } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers";
import { DateField } from "@mui/x-date-pickers/DateField";
import * as Form from "@radix-ui/react-form";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GreenArrow } from "../components/GreenArrow";
import { createMeal } from "../services/mealsService";

export function EditMeal() {
  const [toggleButton, setToggleButton] = useState(true);
  const [meal, setMeal] = useState({
    name: "",
    description: "",
    in_diet: true,
    time: "",
  });

  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////

  /* CONFIGURAÇÕES DE TIMEZONE */
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.tz.setDefault("America/Sao_Paulo");
  dayjs.locale("pt-br");

  const handleFormatDate = (e: dayjs.Dayjs | null) => {
    setMeal((prev) => ({
      ...prev,
      time: dayjs(e).utc().format("DD/MM/YYYY"),
    }));
  };
  ///////////////////////////////////////////////////////////

  const handleToggleButton = () => {
    setToggleButton((preState) => !preState);

    setMeal((prevMeal) => ({ ...prevMeal, in_diet: !toggleButton }));
  };

  function registerMeal(event: React.FormEvent) {
    event.preventDefault();
    if (
      meal.name &&
      meal.description &&
      meal.in_diet !== undefined &&
      meal.time
    ) {
      createMeal(meal);
      navigate("/dashboard");
      toast.success("Refeição cadastrada com sucesso!");
    } else {
      toast.error("Erro ao cadastrar refeição, tente novamente!");
    }
  }

  console.log(meal);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="bg-gray-5 pb-6 h-[200px] w-full fixed">
        <button
          className="absolute mt-14 ml-6"
          onClick={() => navigate("/dashboard")}
        >
          <GreenArrow className="text-gray-2 -rotate-135 " fill={"#333638"} />
        </button>
        <div className="flex items-center justify-center pt-14">
          <h1>
            <strong>Editar refeição</strong>
          </h1>
        </div>
      </div>
      <div className="h-screen w-full overflow-auto flex flex-col justify-between absolute mt-24">
        <Form.Root
          className="w-full h-screen overflow-auto z-10 flex flex-col p-6 bg-white rounded-3xl"
          onSubmit={registerMeal}
        >
          <Form.Field className="grid" name="name">
            <div className="flex items-center justify-between">
              <Form.Label className="text-16 font-medium leading-[35px] text-gray-2">
                <strong>Nome</strong>
              </Form.Label>
              <Form.Message
                className="text-12 text-gray-3 opacity-[0.8]"
                match="valueMissing"
              >
                Insira seu nome
              </Form.Message>
              <Form.Message
                className="text-12 text-gray-3 opacity-[0.8]"
                match="typeMismatch"
              >
                Nome
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                autoComplete="none"
                className=" bg-white border border-gray-5 rounded-lg"
                onChange={(e) =>
                  setMeal((prevMeal) => ({ ...prevMeal, name: e.target.value }))
                }
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid" name="description">
            <div className="flex items-baseline justify-betweenp-3">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-2">
                <strong>Descrição</strong>
              </Form.Label>
              <Form.Message
                className="text-[13px] text-gray-3 opacity-[0.8]"
                match="valueMissing"
              >
                Insira sua descrição
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className=" bg-white border border-gray-5 rounded-lg h-32"
                onChange={(e) =>
                  setMeal((prevMeal) => ({
                    ...prevMeal,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Control>
          </Form.Field>
          <div className="flex w-full justify-center gap-14 mt-6">
            <Form.Field name="date">
              <div className="flex items-baseline justify-betweenp-3">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-2"></Form.Label>
                <Form.Message
                  className="text-[13px] text-gray-3 opacity-[0.8]"
                  match="valueMissing"
                >
                  Insira a data
                </Form.Message>
              </div>
              <Form.Control asChild>
                <DateField
                  onChange={(event) => handleFormatDate(event)}
                  label="Selecione a data"
                  format="DD/MM/YYYY"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="hour">
              <div className="flex items-baseline">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-3"></Form.Label>
                <Form.Message
                  className="text-[13px] text-gray-3 opacity-[0.8]"
                  match="valueMissing"
                >
                  Insira a hora
                </Form.Message>
              </div>
              <Form.Control asChild>
                <TimePicker label="Selecione o horário" />
              </Form.Control>
            </Form.Field>
          </div>
          <div className="mt-4 w-full text-gray-2">
            <strong>Está dentro da dieta?</strong>
            <div className="flex gap-6 justify-center items-center w-full">
              <button
                onClick={handleToggleButton}
                disabled={toggleButton ?? true}
                className={`bg-gray-6 text-gray-1 rounded-lg mt-4 py-6 border flex gap-2 items-center justify-center ${
                  toggleButton ? "border-green-dark bg-green-light" : ""
                }  w-full`}
                type="button"
              >
                <div className="p-1 flex gap-2">
                  <FiberManualRecordRounded className="text-green-dark text-sm" />
                  <span>Sim</span>
                </div>
              </button>
              <button
                onClick={handleToggleButton}
                disabled={!toggleButton ?? true}
                className={`bg-gray-6 text-gray-1 rounded-lg mt-4 py-6 border flex gap-2 items-center justify-center ${
                  !toggleButton ? "border-red-dark bg-red-light" : ""
                }  w-full`}
                type="button"
              >
                <div className="flex gap-2">
                  <FiberManualRecordRounded className="text-red-dark text-sm" />
                  <span>Não</span>
                </div>
              </button>
            </div>
          </div>
          <Form.Submit asChild className="flex w-full justify-center mt-64">
            <button
              className="bg-gray-2 text-white rounded-lg mt-4 p-2 active:bg-gray-1"
              type="submit"
            >
              Cadastrar refeição
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}
