import { GiClothes } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import esoLogo from "@/assets/icone.png";

export const data = {
  teams: [
    {
      name: "Sistema ESO",
      logo: esoLogo,
      plan: "Sistema listagem cosmeticos",
      logoType: "image",
      path: "/",
    },
  ],
  navMain: [
    {
      title: "Cosmeticos",
      to: "/",
      icon: GiClothes,
    },
    {
      title: "Usuários",
      to: "/users",
      icon: FaUsers,
    },
  ],
};
