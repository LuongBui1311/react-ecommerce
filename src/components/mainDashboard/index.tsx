import { Col, Flex, Layout, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import MainContent from "../mainContent";
import SideContent from "../sideContent";
import CustomFooter from "../footer";

export default function MainDashboard() {
  return (
    <>
      <Layout>
        <Content style={{ margin: "0 16px" }} className="admin-content">
          <Flex vertical gap="large">
            <Typography.Title>
              Welcome back, <span className="primary--color">Name</span>
            </Typography.Title>
            <Row gutter={[16, { xs: 32, sm: 24, md: 18 }]}>
              <Col xs={24} sm={24} md={24} lg={18}>
                <MainContent />
              </Col>
              <Col xs={24} sm={24} md={24} lg={6}>
                <SideContent />
              </Col>
            </Row>
          </Flex>
        </Content>
        <CustomFooter />
      </Layout>
    </>
  );
}
