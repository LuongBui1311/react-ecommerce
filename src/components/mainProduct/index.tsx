import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import ProductForm from "../productForm";
import CustomFooter from "../footer";
import BackButton from "../backButton";
export default function MainProduct() {

  return (
    <Layout>
      <Content style={{ margin: "0 16px" }} className="admin-content">
        <BackButton />
        <Typography.Title>
          <span className="primary--color">Products</span> Details
        </Typography.Title>
        <ProductForm />
      </Content>
      <CustomFooter />
    </Layout>
  );
}
