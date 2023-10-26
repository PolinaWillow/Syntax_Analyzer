import React from "react"
import {HomePage} from '../src/pages/HomePage'
import {FormPage} from '../src/pages/FormPage'
import {ResultPage} from '../src/pages/ResultPage'
import { Route, Routes, Navigate } from "react-router-dom"

export const useRoutes = () =>{
    return(
        <Routes>
            <Route path="/" exact element={<HomePage/>}/>
            <Route path="/FormPage" exact element={<FormPage/>}/>
            <Route path="/ResultPage" exact element={<ResultPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />}/>             
        </Routes>
    );
}