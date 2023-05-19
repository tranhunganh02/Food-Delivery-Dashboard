import { Layout, Image, Card } from "antd";
import { Button, Col, Row, Statistic, Space, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import SideMenu from "../../components/SideMenu/index";
import React,{ useEffect, useState, lazy } from "react";
import { getStatistical } from "../../config/firebase";
var { Sider, Content, Footer } = Layout;
export default function Home() {
  const [statistical, setStatistical] = useState([]);
  async function fetchData() {
    const data = await getStatistical();
    setStatistical(data)
  }
  useEffect(() => {
    console.log(1);
    fetchData();
  }, []);
  return (
    <Layout>
      <Sider
        style={{ height: "100vh", backgroundColor: "#fff" }}
        className="sidebar"
      >
        <a href="./">
          <Image
            preview={false}
            src="../../src/assets/Logo Delivery Food copy.png"
          />
        </a>
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <Card title="Statistical">
            <Row gutter={10}>
              
              <Col span={12}>
              <Space wrap size={30}>
                <Avatar shape="square" size={150} icon={<UserOutlined />} />
              
              </Space>
               <p>Quantity User: {statistical.quantityUser}</p>
               
               <p>Quantity Deliver: {statistical.quantityDeliver}</p>
              </Col>
              <Col span={12}>
                <Statistic title="Active Users" value={112893} loading />
              </Col>
            </Row>
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>Food Delivery Dashboard</Footer>
      </Layout>
    </Layout>
  );
}
