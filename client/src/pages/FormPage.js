import React, {useState, useEffect} from "react";
import {Navbar} from '../components/navbar.js'
import {Button} from '../components/button.js'
import {Backward} from '../components/backward.js'
import {useNavigate} from "react-router-dom";

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

import axios from 'axios'

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
        text:"", /*file: "", */typeAnalyze: "", /*partial: [],*/ word: ""
    })

    const settingsRadio = [
        {type: "radio", name: "typeAnalyze", value: "full_analysis", valueRu: "Полный анализ"},
        {type: "radio", name: "typeAnalyze", value: "partial_analysis", valueRu: "Определить отдельные члены предложения"},
        {type: "radio", name: "typeAnalyze", value: "word_analysis", valueRu: "Анализ по слову"},
    ]

    const settingsCheckbox = [
        {type: "checkbox", name: "partial", value: "subject", valueRu: "Подлежащее"},
        {type: "checkbox", name: "partial", value: "predicate", valueRu: "Сказуемое"},
        {type: "checkbox", name: "partial", value: "addition", valueRu: "Дополнение"},
    ]

    const [settingsPartialVisible, setSettingsPartialVisible] = useState(false)
    const [settingsWordVisible, setSettingsWordVisible] = useState(false)

    const ChangeHandler = event =>{
        if(event.target.name === "partial"){
            //Добавление настроек checkbox
            let partialMas = form.partial
            //Если элемент выбрали, то добавляем в массив иначе удаляем из массива
            if(event.target.checked) partialMas.push(event.target.value)
            else {
                let index = partialMas.indexOf(event.target.value)
                partialMas.splice(index, 1)
            }
            setForm({...form, [event.target.name]:partialMas})
            setForm({...form, word:""})

        }else {
            setForm({...form, [event.target.name]:event.target.value})
            /*if(event.target.value==="full_analysis"){
                setForm({...form, word:""})
                setForm({...form, partial:[]})
            }else if(event.target.value==="partial_analysis")setForm({...form, word:""})
            else if(event.target.value==="word_analysis")setForm({...form, partial:[]})*/
            //setForm({...form, [event.target.name]:event.target.value})
        }
        
        //Изменение состояния отвидимости поднастроек
        if (event.target.value === "partial_analysis"){
            setSettingsPartialVisible(true)
            setSettingsWordVisible(false)
        }
        else if (event.target.value === "word_analysis"){
            setSettingsPartialVisible(false)
            setSettingsWordVisible(true)
        }else if(event.target.value === "full_analysis"){
            setSettingsPartialVisible(false)
            setSettingsWordVisible(false)
        }
    }



    const SendForm = async()=>{
        try {
            console.log(form)

            const customHeaders = {
                'content-type': 'application/json',
              };
            const url = 'http://localhost:8500/start_analyze'
            axios.post(url, {...form}, customHeaders)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            //const data = await request('http://127.0.0.1:8500/start_analyze', 'POST', {...form})
            //console.log('Data', data) 
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
                        {
                            settingsRadio.map((elem, index)=>
                                <>
                                    <div className='settings-par' key={index}>
                                        <input type="radio" value={elem.value} name={elem.name} onChange={ChangeHandler}/>
                                        <label htmlFor={elem.type} className="settings-label">{elem.valueRu}</label>
                                    </div>
                                    {(settingsPartialVisible && (elem.value==="partial_analysis") )&&
                                        <div className="settings-choice">
                                            {
                                                settingsCheckbox.map((elem, index)=>
                                                    <div className='settings-choice-part settings-par'>
                                                        <input type="checkbox" value={elem.value} name={elem.name} onChange={ChangeHandler}/>
                                                        <label className="settings-label">{elem.valueRu}</label>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    }
                                    {(settingsWordVisible && (elem.value==="word_analysis") )&&
                                        <input className="input-word" name="word" placeholder="Введите анализируемое слово" onChange={ChangeHandler}/>
                                    }
                                </>
                                
                            )
                        }
                        
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