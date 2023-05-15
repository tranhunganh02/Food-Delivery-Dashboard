
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
 import Auth from './module/Auth'
 import Home from "./module/Home/index";
 import Order from "./module/Order";
 import OrderDetail from "./module/DetailsOrder";
 import ListFood from "./module/Food/ListFood";
 import ListDiscount from "./module/DiscountCode/ListDiscount"
 import DetailFood from "./module/Food/Update";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='login' element={<Auth />} index></Route>
          <Route path='list-food' element={<ListFood />} index></Route>
          <Route path='food/:id' element={<DetailFood />} index></Route> 
          <Route path='order' element={<Order />} index></Route>
          <Route path='order/:id' element={<OrderDetail />} index></Route> 
          <Route path='list-discount-code' element={<ListDiscount />} index></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
