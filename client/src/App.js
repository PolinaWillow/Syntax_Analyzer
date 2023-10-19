import React from "react";
import {Navbar} from "../src/components/navbar";
import { Button } from "./components/button";
import { Backward } from "./components/backward";

function App() {
  const onClickFunction = ()=>{
    
  }
  return (
    <div>
      <Navbar/>
      <Button size="sm" text="Анализировать" onClick={onClickFunction}/>
      <Backward link={onClickFunction}/>
      <h1>Статистический анализ</h1>
      <h2>Статистический анализ</h2>
      <h3>Статистический анализ</h3>
      <p>Анализатор позволяет сделать полный синтаксический разбор предложения, найти определенные члены предложения, а так же выделить предложения, в которых выбранным членом предложения является определенное слово</p>
      <input type="text"></input>
      <hr/>
      <input type="checkbox" id="checkbox1"></input>
      <label htmlFor="checkbox1">Подлежащее</label>
      <br/><br/>
      <input type="radio" id="radio1"></input>
      <label htmlFor="radio1">Полный анализ</label>
      <br/>
    </div>
  );
}

export default App;
