import React from "react";
import { Layout, Image } from "antd";
import "./style.scss";
import SideMenu from "../../components/SideMenu/index";
import Sidebar from "../../components/Chat/Sidebar";
import ChatScreen from "../../components/Chat/ChatScreen";
var { Sider, Content, Footer } = Layout;
export default function index() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "#fff" }} className="sidebar">
        <Image
          preview={false}
          src="https://play-lh.googleusercontent.com/6S0e_QZi2-fIznbpE8Oax017bUYGTxHFph1Buj7tqr_zBB3e80I32rouvtjVqhRHxA=w480-h960-rw"
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
            <div className="container">
              <Sidebar />
              <ChatScreen />
            </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Food Delivery Dashboard</Footer>
      </Layout>
    </Layout>
  );
}
