import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { CustomDropDownProps } from "../../props/CustomDropDownProps";

export default function PageDropDown({
  items,
  handleMenuClick,
  menuValue,
}: CustomDropDownProps) {
  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectable: true,
  };
  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          {menuValue}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
