import { DropDownProps, MenuProps } from "antd";
import { ItemType } from "antd/es/menu/interface";

export interface CustomDropDownProps extends DropDownProps {
  items: ItemType[];
  handleMenuClick: MenuProps["onClick"];
  menuValue: string;
}
