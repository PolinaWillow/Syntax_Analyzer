from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json as js
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import ParseText as PT

from rnnmorph.predictor import RNNMorphPredictor #Подключение нейронки
#Установка языка
predictor = RNNMorphPredictor(language="ru")


#Модель для входных данных
class Item(BaseModel):
    text: str
    #file: str | None = None #Исправить на соответствующий тип данных
    typeAnalyze: str
    #partial: [] Разобраться с типом данных для массива
    word: str #| None = None

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    print ("Hello world")
    return {"Hello": "World"}

@app.head('/')
@app.post('/start_analyze')
async def create_item(item: Item):
    print(item)
    words = PT.ParseText(item.text)
    analysed_words = predictor.predict(words)
    
    print(words)
    print(analysed_words)
    result = []
    for i in range(0,len(analysed_words)):
        print(i, {words[i]: analysed_words[i].pos})
        result.append({words[i]: analysed_words[i].pos})


    #Добавить обработчик для анализа, запись в бд и отправку файла с результатами анализа
    return {"message": result}