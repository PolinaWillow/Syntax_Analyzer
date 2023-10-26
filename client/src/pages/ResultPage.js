import React from "react";
import {Navbar} from '../components/navbar.js'
import {Button} from '../components/button.js'
import {Backward} from '../components/backward.js'
import {useNavigate} from "react-router-dom";

export const ResultPage = () => {
    const navigate = useNavigate();

    return(
        <>
        <Navbar></Navbar>

        <div class="main-space" align="center">

          <div class="side" align="left">
            <label>Результаты анализа текста</label>
            <div>
              
            </div>
          </div>

          <div class="side" align="right">
            <div class="settings-div" align="left">
              <label>Статистика по проведенному анализу</label>

              <div class="result-div">
                <div class="result-line">
                  Подлежащих - 
                </div>
                <div class="result-line">
                  Сказуемых - 
                </div>
                <div class="result-line">
                  Обстоятельство - 
                </div>
                <div class="result-line">
                  Слов - 
                </div>
                <div class="result-line">
                  Символов - 
                </div>
              </div>

              <div align="center">
                <div class="button-submit">
                <Button size="sm" text="Скачать"/> 
                </div>
              </div>
            </div>
          </div>

        </div>

        <Backward link={() => navigate('/')}/>

        <footer>
            <div align="left">
            &nbsp;2023 - Бригада
            </div>
        </footer>

        </>
    )
}