import { LoginForm } from "../components/LoginForm";
import { Logo } from "../components/Logo";


export function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
      <div>
        <Logo col="flex-col"/>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <LoginForm/>
      </div>
    </div>
  )
}