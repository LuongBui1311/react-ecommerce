import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import CustomHeader from "../../../components/header";
import CustomFooter from "../../../components/footer";
import ProductDetails from "../../../components/productDetails";
import './style.css'

export default function UserProductDetails() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <CustomHeader />
      </Header>
      <Layout>
        <Content className="content">
          <ProductDetails />
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
}
