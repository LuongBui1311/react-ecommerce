import { Layout } from "antd";
import CustomHeader from "../../../components/header/index.tsx";
import { Content } from "antd/es/layout/layout";
import ProductList from "../../../components/productList/index.tsx";
import CustomFooter from "../../../components/footer/index.tsx";
import './style.css'

const { Header } = Layout;

const UserProductList: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <CustomHeader />
      </Header>
      <Layout>
        <Content className="content"
        >
          <ProductList />
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
};

export default UserProductList;
