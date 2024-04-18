import { ArrowBackRounded } from "@mui/icons-material";
import * as Form from "@radix-ui/react-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userRegister } from "../services/userService";

export function Register() {
  const [userData, setUserData] = useState({
    name: "",
    login: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userRegister(userData);

      if (userData.login!) {
        if (response) {
          navigate("/login");
          toast.success("Usuário cadastrado com sucesso!");
        }
      }
    } catch (error) {
      toast.error("Erro ao cadastrar, tente novamente");
    }
  };

  useEffect(() => {
    setUserData({
      name: `${userData.name}`,
      login: `${userData.login}`,
      password: `${userData.password}`,
    });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center">
      <button className="flex m-6" onClick={() => navigate("/login")}>
        <ArrowBackRounded />
      </button>
      <h1 className="w-full flex items-center justify-center pt-4 font-nunito text-[24px]">
        Cadastre-se
      </h1>
      <Form.Root
        className="w-full flex flex-col items-center p-8 gap-4"
        onSubmit={handleSubmit}
      >
        <Form.Field name="name" className="w-full items-center justify-center">
          <div className="flex flex-col w-full items-center justify-center">
            <Form.Label className="w-full">Nome</Form.Label>
            <Form.Message match="valueMissing">Insira seu nome</Form.Message>
            <Form.Message match="typeMismatch">Nome</Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className=" bg-gray-6 border-2 rounded-lg w-full"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="login" className="w-full items-center justify-center">
          <div className="flex flex-col w-full items-center justify-center">
            <Form.Label className="w-full">Login</Form.Label>
            <Form.Message match="valueMissing">Insira seu login</Form.Message>
            <Form.Message match="typeMismatch">Login</Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className=" bg-gray-6 border-2 rounded-lg w-full"
              onChange={(e) =>
                setUserData({ ...userData, login: e.target.value })
              }
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          name="password"
          className="w-full items-center justify-center"
        >
          <div className="flex flex-col w-full items-center justify-center">
            <Form.Label className="w-full">Senha</Form.Label>
            <Form.Message match="valueMissing">Insira seu senha</Form.Message>
            <Form.Message match="typeMismatch">Senha</Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className=" bg-gray-6 border-2 rounded-lg w-full"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Control>
        </Form.Field>
        <div className="flex flex-col gap-2 mt-2 w-full">
          <Form.Submit asChild>
            <button className="bg-gray-2 text-white rounded-lg mt-4 p-2 active:bg-gray-1 w-full">
              Cadastrar
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
}
