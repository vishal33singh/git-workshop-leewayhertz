import React from "react";
import Sidebar from "../../modules/sidebar";
import Header from "../../modules/header/header";

export default function CommonHeaderSidebar({ children }) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
