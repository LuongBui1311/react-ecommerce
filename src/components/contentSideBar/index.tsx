import { Card, Flex, Typography } from "antd";

export default function ContentSideBar() {
  return (
    <div>
      <Card className="card">
        <Flex vertical gap="large">
          <Typography.Title level={4}>
            Today <br /> 5 orders
          </Typography.Title>
          <Typography.Title level={4}>
            This month <br /> 240 orders
          </Typography.Title>
        </Flex>
      </Card>
    </div>
  );
}
