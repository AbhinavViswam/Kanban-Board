import {BrowserRouter, Route,Routes} from "react-router-dom"
import Board from "../components/Board"
import List from  "../components/List"
import Card from "../components/Card"

import React from 'react'

function AppRoute() {
  return (
   <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
   <Routes>
    <Route path="/" element={<Board/>}/>
    <Route path="/list" element={<List/>}/>
    <Route path="/card" element={<Card/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoute