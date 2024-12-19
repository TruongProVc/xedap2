import React from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Slidebar from "../../Component/Slidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ALlProduct from "./AllProducts";
import AboutUs from "./AboutUs";
import HomePage from "./HomePage";
import ProductDetail from "./ProductDetail";
import { Navigate } from "react-router-dom";
const Home =()=>{
    return(
        <div>
        <BrowserRouter>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/productdetails/:id" element={<ProductDetail />} />
                    <Route path="/AllItem" element={<ALlProduct />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    </div>
    
    )
}
export default Home;