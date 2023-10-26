import React from "react";
import {Navbar} from '../components/navbar.js';
import {Button} from '../components/button.js';
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    return(
        <>
        <Navbar></Navbar>
        <div align="center">
            <div>
            <h1>Синтаксический анализатор</h1>
            <p>
                Анализатор позволяет сделать полный синтаксический разбор предложения, найти определенные члены предложения, а так же выделить предложения, в которых выбранным членом предложения является определенное слово
            </p>
            </div>
            <Button onClick={() => navigate('/FormPage')} size="lg" text="Анализировать"/> 
            <footer>
            <div align="left">
                &nbsp;2023 - Бригада
            </div>
            </footer>
        </div>
        </>
    )
}