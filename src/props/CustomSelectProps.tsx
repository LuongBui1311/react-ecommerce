import { SelectProps } from "antd";
import ICatergory from "../interfaces/ICatergory";

export interface CustomSelectProps extends SelectProps {
  categories: ICatergory[];
  productCategories?: ICatergory[];
  onchange: (value: string[]) => void;
}
