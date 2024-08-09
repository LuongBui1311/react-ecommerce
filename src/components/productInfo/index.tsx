import { Divider, Flex } from "antd";
import ProductGeneralInfo from "../productGeneralInfo";
import NumberInput from "../numberInput";
import ProductPurchase from "../productPurchase";
import { ProductInfoProps } from "../../props/ProductInfoProps";

export default function ProductInfo({
  product,
  handleNumberChange,
  discountedPrice,
  totalItems,
  totalPrice,
}: ProductInfoProps) {
  return (
    <Flex vertical>
      <ProductGeneralInfo product={product} discountedPrice={discountedPrice} />
      <Divider />
      <NumberInput product={product} handleNumberChange={handleNumberChange} />
      <Divider />
      <ProductPurchase totalItems={totalItems} totalPrice={totalPrice} />
    </Flex>
  );
}
