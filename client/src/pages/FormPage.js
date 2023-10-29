import React, {useState, useEffect} from "react";
import {Navbar} from '../components/navbar.js'
import {Button} from '../components/button.js'
import {Backward} from '../components/backward.js'
import {useNavigate} from "react-router-dom";

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const FormPage = () => {
    const navigate = useNavigate();

    const {loading, request, error, clearError} = useHttp()

    //Отслеживание ошибок
    const message = useMessage()
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const [form, setForm] = useState({
        text:"", file: "", typeAnalyze: "", partial: "", keyWord: ""
    })

    const ChangeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})

        console.log(form)
    }

    const SendForm = async()=>{
        try {
            const data = await request('Наш сервер', 'POST', {...form})
            console.log('Data', data) 
        } catch (error) {

        }
    }

    return(
        <>
        <Navbar></Navbar>
        <div className="main-space" align="center">
            <form encType="multipart/form-data" action="" method="POST">
                <div className="side" align="left">
                    <h3>Введите текст для анализа</h3>
                    <textarea name="text" onChange={ChangeHandler}></textarea>
                    <div>
                        <label htmlFor="text_file" className="file-input-label">Загрузить исходный файл</label>
                        <input id="text_file" type="file" name="file" onChange={ChangeHandler}/>
                    </div>
                </div>

                <div className="side" align="right">
                    <div className="settings-div" align="left">
                        <h3>Настройки</h3>
                        <div className='settings-par'>
                            <input type="radio" value={"full_analysis"} name="typeAnalyze" onChange={ChangeHandler}/>
                            <label htmlFor="typeAnalyze" className="settings-label" >Полный анализ</label>
                        </div>
                        <div className='settings-par'>
                            <input type="radio" value={"partial_analysis"} name="typeAnalyze" onChange={ChangeHandler}/>
                            <label htmlFor="typeAnalyze" className="settings-label">Анализ по членам предложениям</label>
                        </div>
                        <div className="settings-choice">
                            <div className="settings-choice-inline">
                            <div className='settings-choice-part settings-par'>
                                <input type="checkbox" value={"subject"} name="partial" onChange={ChangeHandler}/>
                                <label className="settings-label">Подлежащее</label>
                            </div>
                            <div className='settings-choice-part settings-par'>
                                <input type="checkbox" value={"predicate"} name="partial" onChange={ChangeHandler}/>
                                <label className="settings-label">Сказуемое</label>
                            </div>
                            </div>
                            <div className="settings-choice-inline">
                                <div className='settings-choice-part settings-par'>
                                    <input type="checkbox" value={"predicate"} name="partial" onChange={ChangeHandler}/>
                                    <label className="settings-label">Дополнение</label>
                                </div>
                            </div>
                        </div>
                        <div className='settings-par'>
                            <input type="radio" value={"word_analysis"} name="typeAnalyze" onChange={ChangeHandler}/>
                            <label className="settings-label">Анализ по слову:</label>
                        </div>
                        <input className="input-word" name="word"/>
                        <div align="center">
                            <div className="button-submit">
                                <Button onClick={SendForm} size="sm" text="Анализировать"/> 
                            </div>
                        </div>
                    </div>
                </div>

            </form>
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