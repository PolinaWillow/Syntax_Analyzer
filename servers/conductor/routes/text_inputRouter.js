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
        const {fileName, text, typeAnalyze, partial, word} = req.body
        //Порверка валидности входных данных
        if(!text||!typeAnalyze) return res.status(500).json({message: "Не все поля заполнены"})
        //Добавление новых данныъ в БД
        const text_Input = await Text_Input.create({input_text: text, 
                                                    file_name: "", 
                                                    type_analyzer: typeAnalyze, 
                                                    partial_analyzer: partial, 
                                                    word_analyzer: word
                                                })
        
        //Запрос к Анализатору
        console.log(text_Input)
        if(text_Input){
            await request.post({
                    url: `http://127.0.0.1:8500/start_analyze`,
                    json: true,
                    body: {
                        text: text,
                        typeAnalyze: typeAnalyze,
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
                    })   
                    //return res.status(201).json(body)
                }
            );
        }

        //Добавление результатов в БД
        const text_Results = await Text_Results.create({result_file_name: fileName, 
                                                        statistic_file_name: "Заглушка", 
                                                        textInputId: text_Input.dataValues.id, 
                                                    })
        if(text_Results) return res.status(201).json({ message: 'Анализ успешно завершен'})
        else return res.status(500).json({ message: 'Ошибка добавления рузультатов в БД'})

    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/getFileRes/:fileName',async (req,res)=>{
    console.log(req.params.fileName)
    let foolFileName = path.resolve(__dirname,'..','static',req.params.fileName)
    console.log('1111111 - '+foolFileName)
    res.sendFile(foolFileName)
})

router.delete('/deleteFileRes/:fileName',async (req,res)=>{
    let foolFileName = path.resolve(__dirname,'..','static',req.params.fileName)
    fs. unlink(foolFileName, (err) => {
        if (err) Promise.reject();
    });        
})



module.exports = router