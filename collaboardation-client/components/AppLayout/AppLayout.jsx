import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import "./AppLayout.css"

const AppLayout = () => {
    return(
        <div className="app-layout">
            <Navbar />

            <div className="app-main">
                <SideBar />
                <div className="app-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AppLayout;