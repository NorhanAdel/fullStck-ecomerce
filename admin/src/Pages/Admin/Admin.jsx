import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddProduct, ListProduct, Sidebar } from '../../Components'
import "./Admin.css"
 
export const  Admin = ()=> {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="addproduct" element={<AddProduct/>} />
        <Route path="listproduct" element={<ListProduct/>} />
      </Routes>
    </div>
  );
}
