import {
  DoorBackTwoTone,
  HowToRegTwoTone,
  SettingsTwoTone,
} from "@mui/icons-material";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataProps } from "../interfaces/UserDataProps";
import { getUserData } from "../services/userService";
import { removeToken } from "../storage/auth/removeToken";

export function Profile() {
  const [userInfo, setUserInfo] = useState<UserDataProps>();

  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/login");
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserInfo(data);
      } catch (error) {
        console.error("Erro ao buscar dados");
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex gap-5">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button>
            <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none border-gray-1 border-2 items-center justify-center overflow-hidden rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={userInfo?.user?.picture}
                alt={userInfo?.user?.name?.slice(0, 1)}
              />
              <Avatar.Fallback
                className="flex justify-center items-center text-24 bg-gray-1 text-gray-7 w-[45px] h-[45px]"
                delayMs={600}
              >
                {userInfo?.user?.name?.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <span className="text-14">Meus dados</span>
              <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                <HowToRegTwoTone fontSize="small" />
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <span className="text-14">Configurações</span>
              <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                <SettingsTwoTone fontSize="small" />
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              onClick={handleLogout}
            >
              <span className="text-14">Sair</span>
              <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                <DoorBackTwoTone fontSize="small" />
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
