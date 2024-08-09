import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { HOME } from "../../routes/routes";
import { logOut } from "../../api/apiCall";
import ILogout from "../../interfaces/ILogout";

// Create data for logging out
const postData: ILogout = {
  refreshToken: sessionStorage.getItem("refreshToken"),
};

// Call API
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

const handleLogOutClick = () => {
  loggingOut();
  sessionStorage.setItem("loginStatus", "false");
  sessionStorage.setItem("role", "");
  window.location.href = HOME;
};

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <a href="#">My Orders</a>,
  },
  {
    key: "2",
    label: <a href="#">Profile</a>,
  },
  {
    type: "divider",
  },
  {
    key: "4",
    label: (
      <a onClick={handleLogOutClick} href="#">
        Log Out
      </a>
    ),
  },
];

export const Menu = ({ children }: { children: JSX.Element }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>{children}</Space>
      </a>
    </Dropdown>
  );
};
