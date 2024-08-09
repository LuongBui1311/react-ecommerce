import { Flex } from "antd";
import Banner from "../banner";
import ProductList from "../productList";

const MainContent = () => {
  return (
    <div style={{ flex: 1 }}>
      <Flex vertical gap="2.3rem">
        <Banner />
        <ProductList />
      </Flex>
    </div>
  );
};

export default MainContent;
