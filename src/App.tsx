import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./style.css";
import { useDispatch } from "react-redux";
import { getRole, getUserName, login } from "./store/userSlice";
import { AdminRoute, PrivateRoute, PublicRoute } from "./routes/CustomRoutes";
import ProductListPage from "./pages/admin/productList/ProductListPage";
import ProductDetailPage from "./pages/admin/productDetail/ProductDetailPage";
import {
  DASHBOARD,
  HOME,
  LOGIN,
  PRODUCT_DETAILS,
  PRODUCT_LIST,
  REGISTER,
  SELECTED_PRODUCT_DETAILS,
  USER_PRODUCT_DETAILS,
} from "./routes/routes";
import UserProductList from "./pages/user/productList/UserProductList";
import UserProductDetails from "./pages/user/productDetails/UserProductDetails";

function App() {
  const dispatch = useDispatch();
  const loginStatusValue = sessionStorage.getItem("loginStatus");
  const userRole = sessionStorage.getItem("role");
  const userName = sessionStorage.getItem("name");
  if (loginStatusValue !== null) {
    dispatch(login(JSON.parse(loginStatusValue)));
  }
  if (userRole !== null) {
    dispatch(getRole(userRole));
  }
  if (userName !== null) {
    dispatch(getUserName(userName));
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={HOME} element={<UserProductList />} />
          <Route
            path={LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={REGISTER}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path={DASHBOARD}
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={PRODUCT_LIST}
            element={
              <PrivateRoute>
                <AdminRoute>
                  <ProductListPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={PRODUCT_DETAILS}
            element={
              <PrivateRoute>
                <AdminRoute>
                  <ProductDetailPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path={SELECTED_PRODUCT_DETAILS}
            element={
              <PrivateRoute>
                <AdminRoute>
                  <ProductDetailPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route path={USER_PRODUCT_DETAILS} element={<UserProductDetails />} />
          <Route path="*" element={<UserProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
