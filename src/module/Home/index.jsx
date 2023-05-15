import { Layout, Image } from "antd";

import SideMenu from "../../components/SideMenu/index";
var { Sider, Content, Footer } = Layout;
export default function Home() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "#fff" }} className="sidebar">
        <Image
          preview={false}
          src="../../src/assets/Logo Delivery Food copy.png"
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content></Content>
        <Footer style={{ textAlign: "center" }}>Food Delivery Dashboard</Footer>
      </Layout>
    </Layout>
  );
}
