import React from "react";
import Header from "../layout/layout/Header-Index.jsx";
import Footer from "../layout/layout/Footer-Index.jsx";
import { Outlet } from "react-router-dom";
function LayoutWebs() {

    return (
        <React.Fragment>
            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
    )
}
export default LayoutWebs;