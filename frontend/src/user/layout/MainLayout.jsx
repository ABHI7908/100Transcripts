import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 
const MainLayout = () => {
  return (
    <>
   
      <Navbar />     {/* ✅ HERE */}
       
      <Outlet /> 
      <Footer/>  
       {/* Pages load here */}
    </>
  );
};

export default MainLayout;