import { Button, Flex, Typography } from "antd";
import ProductPurchaseProps from "../../props/ProductPurchaseProps";
import './style.css'

export default function ProductPurchase({
  totalItems,
  totalPrice,
}: ProductPurchaseProps) {
  return (
    <Flex vertical gap="middle" style={{ width: "100%" }} id="purchase">
      <Flex justify="space-between" align="baseline">
        <Typography.Title className="total-items" level={4}>
          Total ({totalItems})
        </Typography.Title>
        <Typography.Title className="total-price" style={{ margin: 0 }} level={3}>
          ${totalPrice}
        </Typography.Title>
      </Flex>
      <Flex gap={20} align="center" style={{ width: "100%" }}>
        <Button className="btn_add">ADD TO CART</Button>
        <Button className="btn_buy" type="primary">
          BUY NOW
        </Button>
      </Flex>
    </Flex>
  );
}
