import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { MdOutlinePeople } from "react-icons/md";
import { ROUTES } from "./app-constants";

export const adminSideBarList = [
    {
        id: 1,
        label: "Dashboard",
        icon: MdOutlineSpaceDashboard,
        link: ROUTES.ADMIN.DASHBOARD,
    },
    {
        id: 2,
        label: "AI Profiles",
        icon: RiRobot2Line,
        link: ROUTES.ADMIN.AI_PROFILE,
    },
    {
        id: 3,
        label: "User Management",
        icon: MdOutlinePeople,
        link: ROUTES.ADMIN.USER_MANAGEMENT,
    },
]