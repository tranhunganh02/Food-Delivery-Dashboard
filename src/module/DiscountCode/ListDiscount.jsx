import React, { useEffect, useState } from "react";
import { Card, Tag, Image, Button, Modal, Input, Space, Radio } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  doc,
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  setDoc
} from "firebase/firestore";
import Index from "../../components/DiscountCode/Index";
import { dbFireStore } from "../../config/firebase";
import { Layout, Pagination } from "antd";
import SideMenu from "../../components/SideMenu";
var { Sider, Content, Footer } = Layout;
const ListDiscount = () => {
  const [listData, setListData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [status, setStatus] = useState(1);
  const onChange = (e) => {
    setStatus(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleAddData(name, price, status);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function Refresh () {
    setName("");
    setPrice();
  }
  //get data
  const getData = async () => {
    const q = query(collection(dbFireStore, "discount"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data(),
      };
    });
    setListData(data);
  };
  //add data
  const handleAddData = async (name, price, status) => {
    try {
      await setDoc(doc(dbFireStore, "discount", name), {
        name: name,
        price: Number(price),
        status: status
      });
      Refresh()
      getData()
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id, status) => {
    const frankDocRef = doc(dbFireStore, "discount", `${id}`);
    try {
      await updateDoc(frankDocRef, {
        status: status
    });    
    setIsModalOpenSucess(true)
    setTimeout(()=>{
      setIsModalOpenSucess(false)
    }, 1400)
      getData()
    } catch (error) {
      console.log(error);
    }
  };
  // handle next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };

  // handle previous
  const handlePrevios = () => {
    if (page === 1) return page;
    setPage(page - 1);
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

  useEffect(() => {
    if (listData.length < 1) {
      getData();
    }
    const pagedatacount = Math.ceil(listData.length / 5);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 4;
      const skip = LIMIT * page; // 5 *2 = 10
      const dataskip = listData.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [page, listData]);
  const [isModalOpenSucess, setIsModalOpenSucess] = useState(false);
  return (
    <Layout>
      <Sider
        style={{ height: "100vh", backgroundColor: "#fff", width: 200 }}
        className="sidebar"
      >
        <Image
          preview={false}
          src="../../src/assets/Logo Delivery Food copy.png"
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <Modal
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Space direction="vertical" size="small">
              <Space.Compact>
                <Input type="text" placeholder="Enter name discount"   onChange={(e) => setName(e.target.value)}/>
                <Input type="number" placeholder="Enter price"  onChange={(e) => setPrice(e.target.value)}/>
              </Space.Compact>
              <Space.Compact>
                <Radio.Group onChange={onChange} value={status}>
                  <Radio value={0}>On</Radio>
                  <Radio value={1}>OFF</Radio>
                </Radio.Group>
              </Space.Compact>
            </Space>
          </Modal>
          <Modal  open={isModalOpenSucess}>
              <p>Change Success</p>
          </Modal>
          <Card title={"List Food"}>
            <button
              onClick={showModal}
              style={{
                position: "absolute",
                backgroundColor: "#ABC0C1",
                height: 38,
                width: 80,
                top: 10,
                right: 60,
                border: 0,
                borderRadius: 1,
              }}
            >
              Create
            </button>
            <div className="container-table">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-2">Name</div>
                  <div className="col col-3">Reduction amount</div>
                  <div className="col col-4">Status</div>
                  <div className="col col-5"></div>
                </li>
                {pageData.length > 0 ? (
                  pageData.map((item, index) => {
                    return (
                      <>
                        <li className="table-row" key={item.id}>
                          <div className="col col-2" data-label="Name">
                            {item.data.name}
                          </div>
                          <div className="col col-3" data-label="Price">
                            {" "}
                            {item.data.price}
                          </div>

                          <div className="col col-4" data-label="Category">
                            {item.data.status === 0 ? (
                              <Tag color={"green"} onClick={()=>{handleUpdate(item.id, 1)}}>On</Tag>
                            ) : (
                              <Tag color={"red"} onClick={()=>{handleUpdate(item.id, 0)}}>Off</Tag>
                            )}
                          </div>
                          <div className="col col-5" data-label="">
                            <Button
                              type="primary"
                              danger
                              id="action"
                              onClick={() => {
                                showDeleteConfirm(item.id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </li>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </ul>
            </div>
            <div className="pagination" style={{ marginLeft: 30 }}>
              <button onClick={handleNext}>&laquo;</button>
              {Array(pageCount)
                .fill(null)
                .map((ele, index) => {
                  return (
                    <>
                      <Button
                        // style={{
                        //   borderRadius: 50,
                        //   width: 50,
                        //   height: 50,
                        // }}
                        key={index}
                        className={page === index + 1 ? "active" : null}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    </>
                  );
                })}
              <button onClick={handlePrevios}>&raquo;</button>
            </div>
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>Food Delivery Dashboard</Footer>
      </Layout>
    </Layout>
  );
};
export default ListDiscount;
