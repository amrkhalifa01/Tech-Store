import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Category from "./components/Products/Category/Category";
import Motherboard from "./components/Products/Motherboard/Motherboard";
import Processors from "./components/Products/Processors/Processors";
import Memory from "./components/Products/Memory/Memory";
import GraphicCards from "./components/Products/GraphicCards/GraphicCards";
import Case from "./components/Products/Case/Case";
import PowerSupply from "./components/Products/PowerSupply/PowerSupply";
import LiquidCooling from "./components/Products/LiquidCooling/LiquidCooling";
import AirCooling from "./components/Products/AirCooling/AirCooling";
import SolidStateDrives from "./components/Products/SolidStateDrives/SolidStateDrives";
import HardDrives from "./components/Products/HardDrives/HardDrives";
import GamingMonitors from "./components/Products/GamingMonitors/GamingMonitors";
import GamingChairs from "./components/Products/GamingChairs/GamingChairs";
import Mouse from "./components/Products/Mouse/Mouse";
import MousePad from "./components/Products/MousePad/MousePad";
import Keyboard from "./components/Products/Keyboard/Keyboard";
import GamingHeadset from "./components/Products/GamingHeadset/GamingHeadset";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CheckoutForm from "./components/Checkout/CheckoutForm/CheckoutForm";
import Confirmation from "./components/Confirmation/Confirmation";
import ProtectedConfirmation from "./components/ProtectedConfirmation/ProtectedConfirmation";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Search from "./components/Search/Search";
import ProtectedCheckout from "./components/ProtectedCheckout/ProtectedCheckout";
import Rejected from "./components/Rejected/Rejected";

function App() {
  return (
    <>
      <ScrollToTop>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="register" element={<Register></Register>}></Route>
          <Route path="category" element={<Category></Category>}>
            <Route path="/category" element={<Motherboard></Motherboard>}></Route>
            <Route path="motherboard" element={<Motherboard></Motherboard>}></Route>
            <Route path="processor" element={<Processors></Processors>}></Route>
            <Route path="memory" element={<Memory></Memory>}></Route>
            <Route path="graphic-card" element={<GraphicCards></GraphicCards>}></Route>
            <Route path="case" element={<Case></Case>}></Route>
            <Route path="power-supply" element={<PowerSupply></PowerSupply>}></Route>
            <Route path="liquid-cooling" element={<LiquidCooling></LiquidCooling>}></Route>
            <Route path="air-cooling" element={<AirCooling></AirCooling>}></Route>
            <Route path="solid-state-drive" element={<SolidStateDrives></SolidStateDrives>}></Route>
            <Route path="hard-drive" element={<HardDrives></HardDrives>}></Route>
            <Route path="gaming-monitor" element={<GamingMonitors></GamingMonitors>}></Route>
            <Route path="gaming-chair" element={<GamingChairs></GamingChairs>}></Route>
            <Route path="mouse" element={<Mouse></Mouse>}></Route>
            <Route path="mouse-pad" element={<MousePad></MousePad>}></Route>
            <Route path="keyboard" element={<Keyboard></Keyboard>}></Route>
            <Route path="gaming-headset" element={<GamingHeadset></GamingHeadset>}></Route>
          </Route>
          <Route path="product" element={<ProductDetails></ProductDetails>}></Route>
          <Route path="search" element={<Search></Search>}></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
          <Route
            path="checkout"
            element={
              <ProtectedCheckout>
                <CheckoutForm></CheckoutForm>
              </ProtectedCheckout>
            }></Route>
          <Route
            path="confirmation"
            element={
              <ProtectedConfirmation>
                <Confirmation></Confirmation>
              </ProtectedConfirmation>
            }></Route>
          <Route path="rejected" element={<Rejected></Rejected>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        <Footer></Footer>
      </ScrollToTop>
    </>
  );
}

export default App;
