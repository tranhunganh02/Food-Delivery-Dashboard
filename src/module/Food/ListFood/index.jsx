import React, { useEffect, useState } from "react";
import { Card, Table, Image, Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  doc,
  collection,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { dbFireStore } from "../../../config/firebase";
import { Layout, Pagination } from "antd";
import SideMenu from "../../../components/SideMenu";
import { deleteFood, getListFood } from "../../../features/Food/Food";
var { Sider, Content, Footer } = Layout;

const ListFood = () => {
  //const navigate =useNavigate()
  const [listFoods, setListFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
  
  const getListFood = async () => {
    const q = query(collection(dbFireStore, "products"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        image: doc.data().image,
        category: doc.data().selectedCategory,
        create_at: doc.data().created_at,
      };
    });
    setListFoods(data);
  };
  const { confirm } = Modal;
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this food?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteFood(id);
      },
      onCancel() {},
    });
  };

  const renderImage = (Image) => {
    return (
      <>
        <img
          src={Image}
          height={210}
          width={220}
        ></img>
      </>
    );
  };
  const modalUpdate = () => {

  }
  const renderDate = (date) =>{
    return(
      <>
        {new Date(Number(date)).toLocaleDateString() + " "}
                    {new Date(Number(date)).toTimeString().slice(0, 8)}
      </>
    )
  }
  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: 'name'
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: renderImage,
    },
    {
      title: "Create_At",
      dataIndex: "create_at",
      key: "create_at",
      render: renderDate
    },
  ];
  useEffect(() => {
    console.log(1);
    getListFood();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const navigate = useNavigate();
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
          <Card title={"Order"}>
            <Table
            tableLayout="fixed"
              loading={loading}
              dataSource={listFoods}
              columns={tableColumns}
              bordered
              onRow={(Food) => ({
                onClick: () => navigate(`../food/${Food.id}`),
              })}
              pagination={{
                pageSize: 10,
              }}
            />
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>Food Delivery Dashboard</Footer>
      </Layout>
    </Layout>
  );
};
export default ListFood;
