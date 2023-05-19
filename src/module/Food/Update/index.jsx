import { PlusOutlined } from '@ant-design/icons';
import {

  Form,
  Input,
  InputNumber,
  Select,
  Image,
  Button
} from 'antd';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import { Layout } from "antd";
import { getInformationFood, updateFood } from '../../../config/firebase';
import { useNavigate } from "react-router-dom";
var { Sider, Content, Footer } = Layout;
export default function index() {
  const navigate =useNavigate()
  const { id } = useParams();
  const [listFoods, setListFoods] = useState({});
  const [name, setName] = useState()
  const [category, setCategory] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState()
  async function update() {
    updateFood(id, name, price, category, navigate)
  }

  async function getData(){
    const a = await getInformationFood(id)
    setName(a.name)
    setCategory(a.selectedCategory)
    setPrice(a.price)
    setImage(a.image)
  }
  useEffect(() => {
  getData()
  }, []);

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
          <Input
          value={name}
          onChange={(e) => setName(e.target.value)}

          />
        </Form.Item>
        <Form.Item label="Category">
          <Select value={category} onSelect={(value)=>{
            setCategory(value)
          }} >
            <Select.Option value="Breakfast" >Breakfast</Select.Option>
            <Select.Option value="Milk Tea">Milk Tea</Select.Option>
            <Select.Option value="Smoothies/Juices">Smoothies/Juice</Select.Option>
            <Select.Option value="Noodles">Noodles</Select.Option>
            <Select.Option value="Dinner">Dinner</Select.Option>
            <Select.Option value="Lunch">Lunch</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber value={price} 
           onChange={(e) => setPrice(e)}
          />
        </Form.Item >
       <Form.Item label="Image">
       <img src={`${image}`} alt="" />
       </Form.Item>
      </Form>
      <div style={{textAlign:'center', marginLeft:50}}>
      <Button title='Update' onClick={()=>{
        update()
      }}>Update</Button>
      </div>
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
