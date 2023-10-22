import React from "react";
import {Navbar} from '../components/navbar.js'
import {Button} from '../components/button.js'
import {Backward} from '../components/backward.js'
import {useNavigate} from "react-router-dom";

export const FormPage = () => {
    const navigate = useNavigate();

    return(
        <>
        <Navbar></Navbar>
        <div class="main-space" align="center">
            <form enctype="multipart/form-data" action="" method="POST">
            <div class="side" align="left">
                <label class='settings-block-label'>Введите текст для анализа</label>
                <textarea name="text"></textarea>
                <div>
                <label class="file-input-label" for="text_file">Загрузить исходный файл</label>
                <input id="text_file" type="file" name="text_file"/>
                </div>
            </div>

            <div class="side" align="right">
                <div class="settings-div" align="left">
                <label class='settings-block-label'>Настройки</label>
                <div class='settings-par'>
                    <input type="radio" name="full_analysis"/>
                    <label class="settings-label">Полный анализ</label>
                </div>
                <div class='settings-par'>
                    <input type="radio" name="partial_analysis"/>
                    <label class="settings-label">Анализ по членам предложениям</label>
                </div>
                <div class="settings-choice">
                    <div class="settings-choice-inline">
                    <div class='settings-choice-part settings-par'>
                        <input type="checkbox" name="partial_subject"/>
                        <label class="settings-label">Подлежащее</label>
                    </div>
                    <div class='settings-choice-part settings-par'>
                        <input type="checkbox" name="partial_predicate"/>
                        <label class="settings-label">Сказуемое</label>
                    </div>
                    </div>
                    <div class="settings-choice-inline">
                        <div class='settings-choice-part settings-par'>
                            <input type="checkbox" name="partial_object"/>
                            <label class="settings-label">Дополнение</label>
                        </div>
                    </div>
                </div>
                <div class='settings-par'>
                    <input type="radio" name="word_analysis"/>
                    <label class="settings-label">Анализ по слову:</label>
                </div>
                <input class="input-word" name="word"/>
                <div align="center">
                    <div class="button-submit">
                    <Button onClick={() => navigate('/pages/ResultPage')} size="sm" text="Анализировать"/> 
                    </div>
                </div>
                </div>
            </div>

            </form>
        </div>

        <Backward link={() => navigate('/pages/HomePage')}/>

        <footer>
            <div align="left">
            &nbsp;2023 - Бригада
            </div>
        </footer>
        </>
    )
}