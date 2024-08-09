import {
  CarryOutOutlined,
  LogoutOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../routes/routes";
import { logOut } from "../../api/apiCall";
import ILogout from "../../interfaces/ILogout";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/admin/dashboard", <UserOutlined />),
  getItem("Products", "/admin/productlist", <CarryOutOutlined />),
  getItem("Profile", "/profile", <SolutionOutlined />),
  getItem("Settings", "/setting", <SettingOutlined />),
  getItem("Log out", "/signin", <LogoutOutlined />),
];

export default function SideBar() {
  const navigate = useNavigate();

  const postData: ILogout = {
    refreshToken: sessionStorage.getItem("refreshToken"),
  };
  const loggingOut = () => {
    const response = logOut(postData);
    response
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("accessToken", "");
        sessionStorage.setItem("refreshToken", "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex vertical className="sider">
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="menu-bar"
        onClick={({ key }) => {
          if (key === "/signin") {
            loggingOut();
            sessionStorage.setItem("loginStatus", "false");
            sessionStorage.setItem("role", "");
            window.location.href = HOME;
          }
          navigate(key);
        }}
      />
    </Flex>
  );
}
