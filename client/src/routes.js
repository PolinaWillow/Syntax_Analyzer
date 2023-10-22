import React from "react"
import {HomePage} from '../src/pages/HomePage'
import {FormPage} from '../src/pages/FormPage'
import {ResultPage} from '../src/pages/ResultPage'
import { Route, Routes, Navigate } from "react-router-dom"

export const useRoutes = () =>{
    return(
        <Routes>
            <Route path="/pages/HomePage" exact element={<HomePage/>}/>
            <Route path="/pages/FormPage" exact element={<FormPage/>}/>
            <Route path="/pages/ResultPage" exact element={<ResultPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />}/>             
        </Routes>
    );
}