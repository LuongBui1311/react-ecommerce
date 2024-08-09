import { Layout } from "antd";
import CustomHeader from "../../../components/header/index.tsx";
import MainProduct from "../../../components/mainProduct/index.tsx";
import MainAdminContent from "../../../components/mainAdminContent/index.tsx";

const { Header } = Layout;

const ProductDetailPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <CustomHeader />
      </Header>
      <MainAdminContent>
        <MainProduct />
      </MainAdminContent>
    </Layout>
  );
};

export default ProductDetailPage;
