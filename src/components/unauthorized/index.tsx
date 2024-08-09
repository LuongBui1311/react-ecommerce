import { Flex, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import CustomFooter from "../footer";

export default function Unauthorized() {
  return (
    <Layout>
      <Content style={{ margin: "100px auto" }}>
        <Flex vertical align="center">
          <Typography.Title
            level={1}
            style={{ fontSize: "5rem", fontWeight: 500 }}
            className="primary--color"
          >
            Admin Only!
          </Typography.Title>
          <Typography.Text strong style={{ fontSize: "1.2rem" }}>
            You need to be an Admin to access this page.
          </Typography.Text>
        </Flex>
      </Content>
      <CustomFooter />
    </Layout>
  );
}
