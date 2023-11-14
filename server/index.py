from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    print ("Hello world")
    return {"Hello": "World"}