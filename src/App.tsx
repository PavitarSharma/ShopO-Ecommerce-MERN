import { Route, Routes } from "react-router-dom";
import {
  AuthLayout,
  ForgotPassword,
  Login,
  ResetPassword,
  SignUp,
} from "./pages/auth";
import {
  BestSelling,
  Events,
  Faq,
  Home,
  Products,
  Profile,
  RootLayout,
} from "./pages/root";
import ProductViewModal from "./components/Modals/ProductViewModal";
import {
  Coupons,
  CreateEvent,
  Dashboard,
  EditShop,
  Messages,
  Orders,
  Refunds,
  Settings,
  VendorEvents,
  VendorLayout,
  VendorProducts,
  VendorProfile,
  WithdrawMoney,
} from "./pages/vendor";
import CreateProduct from "./pages/vendor/CreateProduct";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <ProductViewModal />
      <Routes>
        <Route path="/">
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="best-selling" element={<BestSelling />} />
            <Route path="products" element={<Products />} />
            <Route path="events" element={<Events />} />
            <Route path="faqs" element={<Faq />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<VendorProducts />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="events" element={<VendorEvents />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="withdraw-money" element={<WithdrawMoney />} />
              <Route path="messages" element={<Messages />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="refunds" element={<Refunds />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/edit" element={<EditShop />} />
          </Route>
        </Route>
      </Routes>
      <Toaster toastOptions={{ position: "top-center", duration: 3000 }} />
    </div>
  );
};

export default App;
