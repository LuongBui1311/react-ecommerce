import {
  MessageOutlined,
  MoonFilled,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGIN, REGISTER } from "../../routes/routes";
import { Menu } from "../menu";
import './style.css'

export default function CustomHeader() {
  const user = useSelector((state: any) => state.users);
  function UserAvatar() {
    return (
      <>
        <Avatar className="avatar" icon={<UserOutlined />} />
        <Typography.Text>{user.name}</Typography.Text>
      </>
    );
  }
  const MenuInfo =
    user.role === "USER" ? (
      <Menu>
        <Flex align="center" gap="10px">
          <UserAvatar />
        </Flex>
      </Menu>
    ) : (
      <UserAvatar />
    );
  const userIcons = user.loggedInStatus ? (
    <Flex align="center" gap="10px">
      <MessageOutlined className="header-icon" />
      <NotificationOutlined className="header-icon" />
      {MenuInfo}
    </Flex>
  ) : (
    <Flex align="center" gap="10px">
      <Link to={LOGIN}>
        <Button type="primary">Login</Button>
      </Link>
      <Link to={REGISTER}>
        <Button>
          Register
        </Button>
      </Link>
    </Flex>
  );

  return (
    <Flex align="center" justify="space-between">
      <Flex gap="small" className="logo">
        MoonChild
        <MoonFilled />
      </Flex>
      {userIcons}
    </Flex>
  );
}
