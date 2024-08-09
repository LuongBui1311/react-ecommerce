import IProduct from "../interfaces/IProduct";

export interface ProductInfoProps {
  product: IProduct | undefined;
  handleNumberChange: (value: number | null) => void;
  discountedPrice: number;
  totalItems: number | null;
  totalPrice: number;
}
