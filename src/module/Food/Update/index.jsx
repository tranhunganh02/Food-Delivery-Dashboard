import { PlusOutlined } from '@ant-design/icons';
import {

  Form,
  Input,
  InputNumber,
  Select,
  Image
} from 'antd';
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import { Layout } from "antd";
var { Sider, Content, Footer } = Layout;
export default function index() {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileListl;
  };
  const { id } = useParams();
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "#fff" }}>
      <Image
           preview={false}
           src='../../src/assets/Logo Delivery Food copy.png'
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
      <Form
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        style={{
          maxWidth: 550,
          marginTop:150
        }}
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Category">
          <Select>
            <Select.Option value="Breakfast">Breakfast</Select.Option>
            <Select.Option value="Milk Tea">Milk Tea</Select.Option>
            <Select.Option value="Dinner">Dinner</Select.Option>
            <Select.Option value="Dinner">Dinner</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber />
        </Form.Item>
      </Form>
        </Content>
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
