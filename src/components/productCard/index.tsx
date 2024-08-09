import { Card, Flex, Image, Tag } from "antd";
import defaultpic from "../../assets/defaultpic.png";
import "./style.css";
import { CustomCardProps } from "../../props/CustomCardProps";
const { Meta } = Card;

export default function ProductCard({ data }: CustomCardProps) {
  const discountedPrice = parseFloat(
    (data.basePrice * (1 - data.discountPercentage / 100)).toFixed(2)
  );
  const productPrice =
    data.discountPercentage !== 0 ? (
      <>
        <p className="original_price">{`$${data.basePrice}`}</p>
        <p className="discounted_price">{`$${discountedPrice}`}</p>
        <Tag className="discount_tag">{`${data.discountPercentage}%`}</Tag>
      </>
    ) : (
      <p className="discounted_price">{`$${data.basePrice}`}</p>
    );
  return (
    <Card key={data.id} className="product_card">
      <Flex vertical justify="space-between" style={{ height: "100%" }}>
        <Image
          src={`http://${data.picture}`}
          fallback={defaultpic}
          className="product_image"
          alt={`Image of ${data.name}`}
          preview={false}
        />
        <div className="card_content">
          <Meta title={data.name} style={{ marginTop: "1rem" }} />
          <div className="card_price">{productPrice}</div>
        </div>
      </Flex>
    </Card>
  );
}
