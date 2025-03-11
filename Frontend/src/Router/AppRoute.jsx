import {BrowserRouter, Route,Routes} from "react-router-dom"
import Board from "../Components/Board"
import List from  "../Components/List"

import React from 'react'
function AppRoute() {
  return (
   <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
   <Routes>
    <Route path="/" element={<Board/>}/>
    <Route path="/list" element={<List/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoute