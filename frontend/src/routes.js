import { BrowserRouter, Routes, Route } from "react-router-dom";

import urls from "./urls.json";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Home from "./containers/Home";
import Blob from "./containers/Blob";
import Cart from "./containers/Cart";
import Payment from "./containers/Payment";
import Orders from "./containers/Orders";
import Contact from "./containers/Contact";
import Privacy from "./containers/Privacy";
import Terms from "./containers/Terms";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={urls.home.path} element={<Home />} />
        <Route path={urls.blob.path} element={<Blob />} />
        <Route path={urls.cart.path} element={<Cart />} />
        <Route path={urls.payment.path} element={<Payment />} />
        <Route path={urls.orders.path} element={<Orders />} />
        <Route path={urls.contact.path} element={<Contact />} />
        <Route path={urls.privacy.path} element={<Privacy />} />
        <Route path={urls.terms.path} element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
