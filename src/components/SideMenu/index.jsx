import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
const SideMenu = () => {
     const navigate = useNavigate()
     const onMenuClickItem = (menuItems) => {
          navigate(menuItems.key)
     }
     const menuItems= [
          {
               key:'/list-food',
               label:'List Food'
          },
          {
               key:'/order',
               label:'Order'
          },
          // {
          //      key:'/order-history',
          //      label:'Order history'
          // },
          {
               key:'/list-discount-code',
               label:'List Discount code'
          }
     ];
     return (
          <>
          <Menu items={menuItems} onClick ={onMenuClickItem}/>
          </>
     )
}
export default SideMenu;