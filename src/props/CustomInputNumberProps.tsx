import { InputNumberProps } from "antd";
import IProduct from "../interfaces/IProduct";

export interface CustomInputNumberProps extends InputNumberProps {
  product: IProduct | undefined;
  handleNumberChange: (value: number | null) => void;
}
