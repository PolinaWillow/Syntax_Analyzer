from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json as js

import pymorphy2

import adverbials_analyzer #Подключение функции нахождения обстоятельств
import definitions_analyzer #Подключение функции нахождения обстоятельств

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

    #Разделение предложения
    morph = pymorphy2.MorphAnalyzer()
    parsed_sentence = []
    words = item.text.split()
    for word in words:
        parsed_word = morph.parse(word)[0]
        parsed_sentence.append(parsed_word)
    
    #Нахождение обстоятельств (принимает на вход массив слов, возвращает массив ключей членов предложения)
    analyzed_sentence_adverbials=adverbials_analyzer.find_adverbials(parsed_sentence)

    #Нахождение обстоятельств (принимает на вход массив слов, возвращает массив ключей членов предложения)
    analyzed_sentence_definitions=definitions_analyzer.find_definitions(parsed_sentence)

    #Формирование общего массива ключей
    analyzed_sentence=[]
    for i in range(len(parsed_sentence)):
        analyzed_sentence.append(None)
        
        if(analyzed_sentence_adverbials[i] is not None):
            analyzed_sentence[i]=analyzed_sentence_adverbials[i]
        if(analyzed_sentence_definitions[i] is not None):
            analyzed_sentence[i]=analyzed_sentence_definitions[i]
        
    result = []
    for i in range(0,len(parsed_sentence)):
        print(i, {words[i]: analyzed_sentence[i]})
        result.append({words[i]: analyzed_sentence[i]})

    return result