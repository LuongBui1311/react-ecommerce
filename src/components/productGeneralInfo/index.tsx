import { Flex, Space, Typography } from "antd";
import ProductGeneralInfoProps from "../../props/ProductGeneralInfoProps";
import "./style.css";

export default function ProductGeneralInfo({
  product,
  discountedPrice,
}: ProductGeneralInfoProps) {
  return (
    <Flex vertical gap="middle" id="general-info">
      <Flex gap="small" id="categories">
        {product?.categories?.map((cate: any) => (
          <span className="cate-name">{cate.name}</span>
        ))}
      </Flex>
      <Typography.Title level={2} className="product_name">
        {product?.name}
      </Typography.Title>
      <Flex vertical gap="small" id="price">
        {product?.discountPercentage !== 0 ? (
          <>
            <Space size="middle">
              <span className="product_original_price">{`$${product?.basePrice}`}</span>
              <span className="product_discounted_price primary--color">{`$${discountedPrice}`}</span>
            </Space>
            <Typography.Text strong className="">
              This product is currently on a{" "}
              <span className="primary--color">
                {product?.discountPercentage}%
              </span>{" "}
              sale
            </Typography.Text>
          </>
        ) : (
          <span className="product_discounted_price primary--color">
            {`$${product?.basePrice}`}
          </span>
        )}
      </Flex>
      <Typography.Text className="product_description">
        <strong>Description:</strong> {product?.description}
      </Typography.Text>
    </Flex>
  );
}
