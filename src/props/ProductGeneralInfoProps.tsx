import IProduct from "../interfaces/IProduct";

export default interface ProductGeneralInfoProps {
  product: IProduct | undefined;
  discountedPrice: number;
}
