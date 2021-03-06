import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import Footer from "./footer";
import Header from "./header";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import UserContext from "./context";
import axios from 'axios';
import Habitocheck from "./habitocheck";


function calculaProgresso(hbtshoje, setProgress){
  let total = hbtshoje.length;
  let filtrado = hbtshoje.filter((habit) => habit.done === true);
  let porcentagem = ((filtrado.length/total)*100);
  setProgress(porcentagem);
}

export default function Hoje() {

  const hoje = dayjs().locale('pt-br').format('dddd, DD/MM'); 
  const hojearrumado =  hoje[0].toUpperCase() + hoje.substring([1]);
  const {user, progress, setProgress} = useContext(UserContext);
  const [hbtshoje, setHbtshoje] = React.useState([]);

  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }
  calculaProgresso(hbtshoje, setProgress);

  function atualizahabitos(){
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    axios.get(URL, config)
        .then( result => {
      setHbtshoje(result.data);
      calculaProgresso(hbtshoje, setProgress);
  });
  }
  
  useEffect(() => {
    atualizahabitos();
  }, []);
  
    return(
      <>
      <Header/>
      <Container>
        <Menusuperior>  
          <h1>
            {hojearrumado}
          </h1>
          <p className={(progress > 0)? "recorde":""}>
            {(progress === 0)? "Nenhum hábito concluído ainda" : progress.toFixed(0) + "% dos hábitos concluídos"}
          </p>
        </Menusuperior>
        <EspacoHabitos>
          {(hbtshoje.length !== 0)&& hbtshoje.map((habit, index)=> <Habitocheck key = {index} nome={habit.name} id = {habit.id}
          feito = {habit.done} sequencia = {habit.currentSequence} recorde = {habit.highestSequence} atualiza = {atualizahabitos}/>)}
        </EspacoHabitos>
      </Container>
      <Footer/>
      </>
    );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 1000px;
  background: #E5E5E5;
`;

const EspacoHabitos = styled.div`
  padding-bottom: 120px;
  padding-top: 28px;
  h3 {
    width: 338px;
    height: 74px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    margin-top: 29px;
    margin-left: 19px;
  }
`;

const Menusuperior = styled.div`
  h1 {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    padding-top: 98px;
    padding-left: 17px;
  }
  p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px; 
    color: #BABABA;
    padding-left: 17px;
  }
  .recorde {
    color: #8FC549;
  }
`;
