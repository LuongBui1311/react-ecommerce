import { Layout } from "antd";
import CustomHeader from "../../../components/header/index.tsx";
import MainDashboard from "../../../components/mainDashboard/index.tsx";
import MainAdminContent from "../../../components/mainAdminContent/index.tsx";

const { Header } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <CustomHeader />
      </Header>
      <MainAdminContent>
        <MainDashboard />
      </MainAdminContent>
    </Layout>
  );
};

export default Dashboard;
