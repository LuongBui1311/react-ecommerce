import { MoonFilled } from "@ant-design/icons";
import { Flex } from "antd";
import { Link } from "react-router-dom";

export default function Logo({ color }: any) {
  return (
    <Link to="/">
      <Flex gap="small" className="logo-page" style={{ color: color }}>
        MoonChild
        <MoonFilled />
      </Flex>
    </Link>
  );
}
