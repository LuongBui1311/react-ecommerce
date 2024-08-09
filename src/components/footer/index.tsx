import { Footer } from "antd/es/layout/layout";

export default function CustomFooter() {
  return (
    <Footer style={{ textAlign: "center" }} className="footer">
      Bui Thi Xuan Luong ©{new Date().getFullYear()}
    </Footer>
  );
}
