import { MdAlternateEmail } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
import { GiPlantsAndAnimals } from "react-icons/gi";

const menu = [
    {
        label: "Items",
        path: "/items",
        icon: TbLayoutDashboardFilled,
        subItems: [
            { label: "SubItem 01", path: "/items/item01", icon: GiPlantsAndAnimals },
            { label: "SubItem 02", path: "/items/item02", icon: GiPlantsAndAnimals },
        ]
    },
];

export const getMenuByRole = (role) => {
    return menu.filter(item => {
        if (item.label === "Pedidos" && role !== "manager") return false;
        return true;
    });
};

export default menu;
