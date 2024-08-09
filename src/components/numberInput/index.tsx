import { Flex, InputNumber, Typography } from "antd";
import { CustomInputNumberProps } from "../../props/CustomInputNumberProps";

export default function NumberInput({
  product,
  handleNumberChange,
}: CustomInputNumberProps) {
  return (
    <Flex vertical gap="middle" id="quantity">
      <Typography.Title level={4} style={{ margin: 0 }}>
        Quantity
      </Typography.Title>
      <Flex justify="space-between" align="center">
        <InputNumber
          min={1}
          max={product?.stock}
          defaultValue={1}
          onChange={handleNumberChange}
          disabled={product?.stock === 0}
        />
        <Typography.Text>In stock: {product?.stock}</Typography.Text>
      </Flex>
    </Flex>
  );
}
