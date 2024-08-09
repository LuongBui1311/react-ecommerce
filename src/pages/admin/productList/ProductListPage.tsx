import { Layout } from "antd";
import CustomHeader from "../../../components/header/index.tsx";
import MainList from "../../../components/mainList/index.tsx";
import MainAdminContent from "../../../components/mainAdminContent/index.tsx";

const { Header } = Layout;

const ProductListPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <CustomHeader />
      </Header>
      <MainAdminContent>
        <MainList />
      </MainAdminContent>
    </Layout>
  );
};

export default ProductListPage;
