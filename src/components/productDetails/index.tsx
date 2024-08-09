import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "antd";
import IProduct from "../../interfaces/IProduct";
import defaultpic from "../../assets/defaultpic.png";
import { getProductByUrlName } from "../../api/apiCall";
import ProductInfo from "../productInfo";
import BackButton from "../backButton";

export default function ProductDetails() {
  const param = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [singlePrice, setSinglePrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [totalItems, setTotalItems] = useState<number | null>(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const getProduct = (urlName: string) => {
    const response = getProductByUrlName(urlName);
    response
      .then((res) => {
        setProduct(res.data);
        if (res.data.discountPercentage !== 0) {
          setDiscountedPrice(
            getDiscountedPrice(res.data.basePrice, res.data.discountPercentage)
          );
          setSinglePrice(
            getDiscountedPrice(res.data.basePrice, res.data.discountPercentage)
          );
          setTotalPrice(
            getDiscountedPrice(res.data.basePrice, res.data.discountPercentage)
          );
        } else {
          setTotalPrice(res.data.basePrice);
          setSinglePrice(res.data.basePrice);
        }
      })
      .catch();
  };
  const getDiscountedPrice = (originalPrice: number, discount: number) => {
    return parseFloat((originalPrice * (1 - discount / 100)).toFixed(2));
  };
  const getTotalPrice = (singlePrice: number, quantity: number) => {
    return parseFloat((singlePrice * quantity).toFixed(2));
  };
  const handleNumberChange = (value: number | null) => {
    if (value) {
      setTotalItems(value);
      setTotalPrice(getTotalPrice(singlePrice, value));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (param.productUrlName) {
      getProduct(param.productUrlName);
    }
  }, []);

  return (
    <>
      <BackButton/>
      <Row gutter={{ xxl: 100 }}>
        <Col sm={24} xxl={12}>
          <Image
            width="100%"
            src={`http://${product?.picture}`}
            fallback={defaultpic}
            alt={`Image of ${product?.name}`}
            style={{ borderRadius: 16 }}
          />
        </Col>
        <Col sm={24} xxl={12}>
          <ProductInfo
            product={product}
            handleNumberChange={handleNumberChange}
            discountedPrice={discountedPrice}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        </Col>
      </Row>
    </>
  );
}
