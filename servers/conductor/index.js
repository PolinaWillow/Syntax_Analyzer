require('dotenv').config() //Подключение dotenv для плучения доступа к переменным окружения
const express = require('express')//Получение Express
const cors = require('cors')
const fileUpload = require('express-fileupload')






const PORT = process.env.PORT||5000; //Полчуение значения порта
const app = express(); //Объект представляющий приложениеы
//Конвейер обраотки запросов
app.use(cors({
      credentials: true,
      origin: ["http://localhost:3000"],
      optionsSuccessStatus: 200
    })
);
//app.use(express.json({extended: true}))
//app.use(express.static(path.resolve(__dirname,'static/img'))) //Доступ к статическим файлам c картинками
//app.use(express.static(path.resolve(__dirname,'static/pdf')))//Доступ к статическим файлам c pdf
//app.use(express.static('public'))
//app.use(fileUpload({}))
//app.use('/api', require('./routes/routes.js'))

//Обработка ошибки
//app.use(errorHandler)

//app.get('/', (req, res)=>{res.status(200).json({message: 'WORKING'})})

//Старт сервера
const startApp = async()=>{
    try {
        //await sequelize.authenticate()//Подключение к БД
        //await sequelize.sync() //Сверка состояния БД со схемой данных
        app.listen(PORT, ()=>console.log(`Server start on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startApp()
