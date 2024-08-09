import { CardProps } from "antd";
import IProduct from "../interfaces/IProduct";

export interface CustomCardProps extends CardProps {
  data: IProduct;
}
