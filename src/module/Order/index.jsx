import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Layout, Image } from "antd";
import { dbFireStore } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import { query, getDocs, collection, where } from "firebase/firestore";
var { Sider, Content, Footer } = Layout;
const Order = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  async function getData() {
    const q = query(collection(dbFireStore, "orders"));

    const querySnapshot = await getDocs(q);

    const dataa = querySnapshot.docs.map((doc) => {
      return {
        idUser: doc.data().id,
        idOrder: doc.id,
        status: doc.data().status,
        total: doc.data().total,
        address: doc.data().address,
      };
    });
    setData(dataa);
  }
  const navigate = useNavigate();
  const renderOrderStatus = (orderStatus) => {
    if (orderStatus === 0) {
      return <Tag color={"red"} >{"unconfimred"}</Tag>;
    } else if (orderStatus === 1) {
      return <Tag color={"orange"}>{"confirmed"}</Tag>;
    } else if (orderStatus === 2) {
      return <Tag color={"grey"}>{"delivery"}</Tag>;
    } else if (orderStatus === 3) {
      return <Tag color={"green"}>{"successful delivery"}</Tag>;
    }
  };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "idOrder",
      key: "idOrder",
    },
    {
      title: "Delivery Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (price) => {
        return <>{new Intl.NumberFormat("de-DE").format(price)}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
    },
  ];
  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <Layout>
        <Sider
          style={{ height: "150vh", backgroundColor: "#fff" }}
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
            <Card title={"Order"}>
              <Table
                loading={loading}
                dataSource={data}
                columns={tableColumns}
                rowKey="orderID"
                onRow={(orderItem) => ({
                  onClick: () => navigate(`../order/${orderItem.idOrder}`),
                })}
                pagination={{
                  pageSize: 10,
                }}
              />
            </Card>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Food Delivery Dashboard
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default Order;
