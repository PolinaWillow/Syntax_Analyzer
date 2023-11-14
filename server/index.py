from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

#Модель для входных данных
class Item(BaseModel):
    text: str
    file: str | None = None #Исправить на соответствующий тип данных
    typeAnalyzer: str
    #partial: [] Разобраться с типом данных для массива
    word: str | None = None

app = FastAPI()

@app.get("/")
def read_root():
    print ("Hello world")
    return {"Hello": "World"}

@app.post("/start_analyze")
def create_item(item: Item):
    print(item)
    #Добавить обработчик для анализа, запись в бд и отправку файла с результатами анализа
    return {"message": "Analyze"}