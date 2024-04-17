import * as Form from "@radix-ui/react-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userLogin } from "../services/userService";
import { addTokenInStorage } from "../storage/auth/addTokenInStorage";

export function LoginForm() {
  const [userLoginData, setUserLoginData] = useState({
    login: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userLogin(userLoginData);

      if (userLoginData.login && userLoginData.password) {
        if (response) {
          addTokenInStorage(response.auth);
          navigate("/dashboard");
          toast.success("Logado com sucesso!");
        }
      }
    } catch (error) {
      toast.error(`Erro ao tentar realizar login, tente novamente.`);
    }
  };

  useEffect(() => {
    setUserLoginData({
      login: `${userLoginData.login}`,
      password: `${userLoginData.password}`,
    });
  }, []);

  return (
    <Form.Root className="w-[260px] flex flex-col" onSubmit={handleSubmitLogin}>
      <Form.Field className="grid" name="login">
        <div className="flex items-center justify-between">
          <Form.Label className="text-16 font-medium leading-[35px] text-gray-3">
            Login
          </Form.Label>
          <Form.Message
            className="text-12 text-gray-3 opacity-[0.8]"
            match="valueMissing"
          >
            Insira seu login
          </Form.Message>
          <Form.Message
            className="text-12 text-gray-3 opacity-[0.8]"
            match="typeMismatch"
          >
            Login
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className=" bg-gray-6 border-2 rounded-lg"
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, login: e.target.value })
            }
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid" name="password">
        <div className="flex items-baseline justify-betweenp-3">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-3">
            Senha
          </Form.Label>
          <Form.Message
            className="text-[13px] text-gray-3 opacity-[0.8]"
            match="valueMissing"
          >
            Insira sua senha
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className=" bg-gray-6 border-2 rounded-lg"
            type="password"
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, password: e.target.value })
            }
          />
        </Form.Control>
      </Form.Field>
      <div className="flex flex-col gap-2 mt-2">
        <Form.Submit asChild>
          <button
            className="bg-gray-2 text-white rounded-lg mt-4 p-2 active:bg-gray-1"
            type="submit"
          >
            Entrar
          </button>
        </Form.Submit>
        <button className="border-gray-1 border rounded-lg p-1" type="button">
          <Link to={`/register`}>Registre-se</Link>
        </button>
      </div>
    </Form.Root>
  );
}
