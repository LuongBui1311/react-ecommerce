import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button style={{ margin: "0 0 20px" }} onClick={() => navigate(-1)}>
      <ArrowLeftOutlined /> Back
    </Button>
  );
}
