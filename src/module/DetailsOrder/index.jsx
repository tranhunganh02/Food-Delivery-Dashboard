import { Button, Card, Descriptions, Divider, List, Image, Alert } from "antd";
import React, { useEffect, useState } from "react";
import dishes from "../../data/dishes.json";
import { useParams } from "react-router-dom";
import SideMenu from "../../components/SideMenu/index";
import { Layout } from "antd";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbFireStore } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
var { Sider, Content, Footer } = Layout;
export default function OrderDetail() {
  let status;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  async function accpectOrder() {
    const docRef = doc(dbFireStore, "orders", `${id}`);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      status: 1,
    });

    Alert("Success");
  }

  async function getData() {
    const docRef = doc(dbFireStore, "orders", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const b = {
        idUser: docSnap.data().idUser,
        address: docSnap.data().address,
        total: docSnap.data().total,
        listFood: docSnap.data().data,
        status: Number(docSnap.data().status),
      };
      console.log(b);
      setData(b);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() => {
    console.log(1);
    getData();
  }, []);

  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "#fff" }}>
        <Image
          preview={false}
          src="../../src/assets/Logo Delivery Food copy.png"
        />
        <SideMenu />
      </Sider>
      <Layout>
        {data != {} ? (
          <>
            <Content>
              <Card title={`ID Order #${id}`}>
                <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label={"Customer Id"}>
                    {data.idUser}
                  </Descriptions.Item>
                  <Descriptions.Item label={"Customer Address"}>
                    {data.address}
                  </Descriptions.Item>
                  <Descriptions.Item label={"Status"}>
                    {status}
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
                <List
                  dataSource={data.listFood}
                  renderItem={(dishesItem) => (
                    <>
                      <List.Item>
                        <div>
                          {dishesItem.idProduct} x {dishesItem.quantity}
                        </div>
                        <div>{dishesItem.price}</div>
                      </List.Item>
                    </>
                  )}
                ></List>
                <Divider />
                <div style={styles.totalContainer}>
                  <h2>Total:</h2>
                  <h2 style={styles.totalPrice}>
                    {new Intl.NumberFormat("de-DE").format(`${data.total}`)}đ
                  </h2>
                </div>
                <Divider />
                {Number(data.status) == 0 ? (
                  <>
                    <div style={styles.buttonContainer}>
                      <Button
                        type="ghost"
                        size="large"
                        style={styles.buttonAction}
                      >
                        Delice Order
                      </Button>
                      <Button
                        type="primary"
                        size="large"
                        style={styles.buttonAction}
                        onClick={() => {
                          accpectOrder(), navigate(`../order`);
                        }}
                      >
                        Accpect order
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                   <div>
                   <Button
                        type="ghost"
                        size="large"
                      
                      >
                        Delice Order
                      </Button>
                   </div>
                  </>
                )}
              </Card>
            </Content>
          </>
        ) : (
          "Loading"
        )}
        <Footer style={{ textAlign: "center" }}>Food Delivery Dashboard</Footer>
      </Layout>
    </Layout>
  );
}
const styles = {
  totalContainer: {
    display: "flex",
    flexDirection: "row",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonAction: {
    width: 700,
  },
};
