import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import SideBar from "../sidebar";

export default function MainAdminContent({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <SideBar />
      </Sider>
      {children}
    </Layout>
  );
}
