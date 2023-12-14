const Router = require('express')
const router = new Router()
const request = require('request');
const path = require('path')
const htmlPdf = require('html-pdf');
const fs = require('fs')
const pdfTemplate = require('../documents/index')

const {Text_Input, Text_Results} = require('../models/models')

router.post('/sendData', [], async (req, res) => {
    console.log('Body: ' + req.body)
    try{
        const {fileName, text, typeAnalyzer, partial, word} = req.body
        //Порверка валидности входных данных
        if(!text||!typeAnalyzer) return res.status(500).json({message: "Не все поля заполнены"})
        //Добавление новых данныъ в БД
        const text_Input = await Text_Input.create({input_text: text, 
                                                    file_name: "", 
                                                    type_analyzer: typeAnalyzer, 
                                                    partial_analyzer: partial, 
                                                    word_analyzer: word
                                                })
        
        //Запрос к Анализатору
        if(text_Input){
            request.post({
                    url: `http://127.0.0.1:8500/start_analyze`,
                    json: true,
                    body: {
                        text: text,
                        typeAnalyze: typeAnalyzer,
                        word: word
                    },
                },(err, response, body) => {
                    console.log(body)
                    if (err) return res.status(500).json({ message: 'Ошибка отправления на анализ'})

                    //Запись результата в файл
                    //Генерация имени файл
                    const today = new Date();
                    let foolFileName = path.resolve(__dirname,'..','static', fileName)
                    console.log(foolFileName)
                    //Создание pdf файла
                    const options = { format: 'A4'};
                    htmlPdf.create(pdfTemplate(body),options).toFile(foolFileName,(err)=>{
                        if (err) {
                            return res.status(500).json({ message: 'Ошибка создания файла'})
                        }
                        return res.status(201).json(Promise.resolve())
                    })   
                    //return res.status(201).json(body)
                }
            );
        }

        //return res.status(201).json({message:`Новый текст добавлен и проанализирован ${resAnalyse}`})
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }
})



module.exports = router