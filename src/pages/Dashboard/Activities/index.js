import { Subtitle } from '../../../components/Subtitle/Subtitle';
import { Title } from '../../../components/Title/Title';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function Activities() {
  const user = JSON.parse(localStorage.getItem('userData'));
  const [clickDay, setClickDay] = useState({ day: '' });
  const [event, setEvent] = useState();
  const [date, setDate] = useState();
  const [formatDate, setFormatDate] = useState();
  function selectDay(d) {
    setClickDay({ day: d });
    const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/activities/${d}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    promise.then((res) => {
      setEvent(res.data);
    });
    promise.catch((erro) => {
      alert(`${erro.response.status} ${erro.response.statusText}`);
    });
  }
  
  useEffect(() => {
    const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/activities/dates`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    promise.then((res) => {
      setDate(res.data.dates);
      dateFormat(res.data.dates);
    });
    promise.catch((erro) => {
      alert(`${erro.response.status} ${erro.response.statusText}`);
    });
    return;
  }, []);
  function dateFormat(dat) {
    const days = [];
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    for(let i =0; i<dat.length; i++) {
      const date = dayjs(dat[i]).format('DD/MM');
      const dia = new Date (dat[i]);
      const semana = dia.getDay();
      days.push({ Week: daysOfWeek[semana], Day: date, Data: dat[i] });
    }
    setFormatDate(days);
  }
  return (
    <>
      <Title title="Escolha de atividades" />
      <Subtitle subtitle="Primeiro, filtre pelo dia do evento:" />
      {!formatDate ? <></> : formatDate.map((b) => <DayButton clickDay={clickDay} day={b.Data} onClick={e => selectDay(b.Data)}>{b.Week}, {b.Day}</DayButton>)}
      <VenueArea event={event}>
        <table>
          <tr>
            <th>Auditório Principal</th>
            <th>Auditório Lateral</th>
            <th>Sala de Workshop</th>
          </tr>
          <tr>
            <td> {/* AUDITORIO PRINCIPAL */}
              {!event ? <></> : event.filter(e => e.venue.id === 1).map(e => <Activity>
                <Info>
                  <h1>{e.name}</h1>
                  <p>{e.startDate[11] + e.startDate[12]}:{e.startDate[14] + e.startDate[15]} - {e.endDate[11] + e.endDate[12]}:{e.endDate[14] + e.endDate[15]}</p>
                </Info>
                <Icon capacity={e.capacity}>
                  <ion-icon name={e.capacity === 0 ? 'close-circle-outline' : 'log-in-outline'}></ion-icon>
                  <p>{e.capacity} vagas</p>
                </Icon>
              </Activity>)}
            </td>
            {/* AUDITORIO LATERAL */}
            <td>
              {!event ? <></> : event.filter(e => e.venue.id === 2).map(e => <Activity>
                <Info>
                  <h1>{e.name}</h1>
                  <p>{e.startDate[11] + e.startDate[12]}:{e.startDate[14] + e.startDate[15]} - {e.endDate[11] + e.endDate[12]}:{e.endDate[14] + e.endDate[15]}</p>
                </Info>
                <Icon capacity={e.capacity}>
                  <ion-icon name={e.capacity === 0 ? 'close-circle-outline' : 'log-in-outline'}></ion-icon>
                  <p>{e.capacity} vagas</p>
                </Icon>
              </Activity>)}</td>
            {/* SALA DE WORKSHOP */}
            <td>
              {!event ? <></> : event.filter(e => e.venue.id === 3).map(e => <Activity>
                <Info>
                  <h1>{e.name}</h1>
                  <p>{e.startDate[11] + e.startDate[12]}:{e.startDate[14] + e.startDate[15]} - {e.endDate[11] + e.endDate[12]}:{e.endDate[14] + e.endDate[15]}</p>
                </Info>
                <Icon capacity={e.capacity}>
                  <ion-icon  name={e.capacity === 0 ? 'close-circle-outline' : 'log-in-outline'}></ion-icon>
                  <p>{e.capacity} vagas</p>
                </Icon>
              </Activity>)}</td>
          </tr>
        </table>

      </VenueArea>
    </>
  );
}

const DayButton = styled.button`
  /*display: ${(props) => (props.confirmPayment === 'flex' ? 'none' : 'inline')};*/
  border: none;
  width: 182px;
  height: 37px;
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 10px;
  color: #000000;
  font-size: 14px;
  background-color: ${(props) => (props.day === props.clickDay.day) ? '#FFD37D' : '#E0E0E0'};
  box-shadow: 0px 2px 10px 0px #00000040;
  :hover {
    cursor: pointer;
  }
`;

const VenueArea = styled.div`
  display: ${(props) => (!props.event ? 'none' : 'block')};
  margin-top: 30px;
  width: 864px;
  table {
    width: 864px;
  }
  td{
    border: 1px solid #D7D7D7;
    height: 330px;
    width: 288px;
  }
  th{
    color: #7B7B7B;
    font-size: 17px;
    font-weight: 400;
    padding-bottom: 10px;
  }
`;

const Activity = styled.div`
  background-color: #F1F1F1;
  width: 265px;
  height: 79px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
  display: flex;
  h1{
    color: #343434;
    font-size: 12px;
    font-weight: 700;
    margin-left: 10px;
    padding-top: 10px;
  }
  p{
    color: #343434;
    font-size: 12px;
    font-weight: 400;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const Info = styled.div`
  width: 200px;
`;

const Icon = styled.div`
  margin-left: 10px;
  height: 60px;
  margin-top: 10px;
  border-left: 1px solid #CFCFCF;
  position: relative;
  ion-icon {
    width: 20px;
    color : ${(props) => (props.capacity === 0) ? '#CC6666' : '#078632'};
    position: absolute;
    top: 15px;
    left: 18px;
  }
  p{
    color: ${(props) => (props.capacity === 0) ? '#CC6666' : '#078632'};
    font-size: 9px;
    margin-top: 35px;
  }
`;
