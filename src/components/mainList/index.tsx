import { Button, Col, Layout, Row, Typography } from "antd";
import ProductTable from "../productTable";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomFooter from "../footer";
import { PRODUCT_DETAILS } from "../../routes/routes";

export default function MainList() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Content style={{ margin: "0 16px" }} className="admin-content">
        <Row align="middle" justify="space-between">
          <Col>
            <Typography.Title>
              <span className="primary--color">Products</span> List
            </Typography.Title>
          </Col>
          <Col>
            <Button
              type="primary"
              className="btn"
              onClick={() => {
                navigate(PRODUCT_DETAILS);
              }}
            >
              <PlusOutlined /> Add new product
            </Button>
          </Col>
        </Row>
        <ProductTable />
      </Content>
      <CustomFooter />
    </Layout>
  );
}
