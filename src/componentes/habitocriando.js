import React from "react";
import axios from 'axios';
import styled from 'styled-components';
import { Navigate, useNavigate, Link } from "react-router-dom";
import BotaoDia from "./botaodia";

export default function Habitocriando(props) {
    
  const [texthbt, setTexthbt] = React.useState("");
  const [arr, setArr] = React.useState([]);
  const semana = ["D", "S", "T", "Q", "Q", "S", "S"]
  
  function jogapraCima(){
      props.cancelou();
  }
  function montarobj(){
    let obj = {
      name: texthbt,
      days: arr
    }
    setTexthbt("");
    console.log(obj);
  }
  function montaArr(num){
    setArr([...arr, num]);
  }
  function filtraArr(num){
    let arrfiltrada = arr.filter(cada => cada !== num);
    setArr(arrfiltrada);
  }
    return(
        <>
        <Caixabranca>
            <input placeholder="  nome do hábito" value={texthbt} onChange={e => setTexthbt(e.target.value)} />
            <Dias>
                {semana.map((day, index)=> <BotaoDia key = {index} dia = {day} index = {index} recebenum = {montaArr} tiranum = {filtraArr}/>)}
            </Dias>
            <Cancelasalva>
                <h2 onClick={jogapraCima}>
                    cancelar
                </h2>
                <button onClick={montarobj}>
                    <h3>
                        Salvar
                    </h3>
                </button>
            </Cancelasalva>
        </Caixabranca>
        </>
    );
}

const Caixabranca = styled.div`
  min-width: 340px;
  height: 180px;
  background: #FFFFFF;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 18px;
  margin-left: 18px;
  

  input {
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px; 
    margin-top: 19px;
    margin-left: 18px;
  }
`;

const Dias = styled.div`
  margin-top: 8px;
  margin-left: 18px;

  .clicado {
    background: #CFCFCF;

    h1 {
      color: #FFFFFF;
    }
  }
  button {
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;  
    margin-right: 4px;
    
    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;         
    }
  }
`;
const Cancelasalva = styled.div`
  display:flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 29px;
  
  h2 {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    color: #52B6FF;
    margin-left: 148px;
  }
  
  button {
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    margin-right: 16px;
    margin-bottom: 15px;
  }
`;