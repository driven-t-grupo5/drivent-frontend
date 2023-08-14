import { Subtitle } from '../../../components/Subtitle/Subtitle';
import { Title } from '../../../components/Title/Title';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function Activities() {
  const user = JSON.parse(localStorage.getItem('userData'));
  const [clickDay, setClickDay] = useState({ day: '' });
  const [event, setEvent] = useState();
  const [date, setDate] = useState();
  const [formatDate, setFormatDate] = useState();
  const [activities, setActivities] = useState([]);
  const [payment, setPayment] = useState();
  const navigate = useNavigate();
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
    const promisse = axios.get(`${process.env.REACT_APP_API_BASE_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    promisse.then((res) => {
      setPayment(res.data);
      if(res.data.status === 'RESERVED') {
        alert('voce ainda nao fez seu pagamento');
        navigate('/dashboard/ticket');
      } else {
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
      }
    });
    promisse.catch((erro) => {
      alert('voce ainda nao fez seu pagamento');
      navigate('/dashboard/ticket');
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
  function subscribe(e, id) {
    e.preventDefault(); 
    const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/activities/${id}/enroll`, '', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    promise.then((res) => {
      setActivities([... activities, id]);
      alert('Inscrito com sucesso');
    });
    promise.catch((erro) => {
      alert(`${erro.response.data.message}`);
    });
  }
  return (
    <>
      {console.log(payment)}
      <Title title="Escolha de atividades" />
      {!payment ? <></> : (payment.ticketTypeId === 3) ? 
        <Subtitle subtitle="Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."/>
        :  <Subtitle subtitle="Primeiro, filtre pelo dia do evento:" />}
      {!payment ? <></> : (payment.ticketTypeId === 3) ? 
        <></>         : !formatDate ? <></> : formatDate.map((b) => <DayButton key={b.Data} clickDay={clickDay} day={b.Data} onClick={e => selectDay(b.Data)}>{b.Week}, {b.Day}</DayButton>) }
      
      <VenueArea event={event}>
        <table>
          <tr>
            <th>Auditório Principal</th>
            <th>Auditório Lateral</th>
            <th>Sala de Workshop</th>
          </tr>
          <tr>
            <td> {/* AUDITORIO PRINCIPAL */}
              {!event ? <></> : event.filter(e => e.venue.id === 1).map(e => <Activity key={e.id} id={e.id} px={Number((e.endDate[11]+e.endDate[12]+e.endDate[14]+e.endDate[15])-Number(e.startDate[11]+e.startDate[12]+e.startDate[14]+e.startDate[15]))/100*80} activities={activities} onClick={b => subscribe(b, e.id)}>
                <Info>
                  <h1>{e.name}</h1>
                  <p>{e.startDate[11] + e.startDate[12]}:{e.startDate[14] + e.startDate[15]} - {e.endDate[11] + e.endDate[12]}:{e.endDate[14] + e.endDate[15]}</p>
                </Info>
                <Icon capacity={e.availableTickets}>
                  <ion-icon name={e.availableTickets === 0 ? 'close-circle-outline' : 'log-in-outline'}></ion-icon>
                  <p>{e.availableTickets} vagas</p>
                </Icon>
              </Activity>)}
            </td>
            {/* AUDITORIO LATERAL */}
            <td>
              {!event ? <></> : event.filter(e => e.venue.id === 2).map(e => <Activity key={e.id} id={e.id} px={Number((e.endDate[11]+e.endDate[12]+e.endDate[14]+e.endDate[15])-Number(e.startDate[11]+e.startDate[12]+e.startDate[14]+e.startDate[15]))/100*80} activities={activities} onClick={b => subscribe(b, e.id)}>
                <Info>
                  <h1>{e.name}</h1>
                  <p>{e.startDate[11] + e.startDate[12]}:{e.startDate[14] + e.startDate[15]} - {e.endDate[11] + e.endDate[12]}:{e.endDate[14] + e.endDate[15]}</p>
                </Info>
                <Icon capacity={e.availableTickets}>
                  <ion-icon name={e.availableTickets === 0 ? 'close-circle-outline' : 'log-in-outline'}></ion-icon>
                  <p>{e.availableTickets} vagas</p>
                </Icon>
              </Activity>)}</td>
            {/* SALA DE WORKSHOP */}
            <td>
              {!event ? <></> : event.filter(e => e.venue.id === 3).map(e => <Activity key={e.id} id={e.id} px={Number((e.endDate[11]+e.endDate[12]+e.endDate[14]+e.endDate[15])-Number(e.startDate[11]+e.startDate[12]+e.startDate[14]+e.startDate[15]))/100*80} activities={activities} onClick={b => subscribe(b, e.id)}>
                <Info>
                  <h1>{e.name}</h1>
                  <p>{e.startDate[11] + e.startDate[12]}:{e.startDate[14] + e.startDate[15]} - {e.endDate[11] + e.endDate[12]}:{e.endDate[14] + e.endDate[15]}</p>
                </Info>
                <Icon capacity={e.availableTickets}>
                  <ion-icon  name={e.availableTickets === 0 ? 'close-circle-outline' : 'log-in-outline'}></ion-icon>
                  <p>{e.availableTickets} vagas</p>
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
  background-color: ${(props) => (props.activities.includes(props.id) ? '#D0FFDB' : '#F1F1F1')};
  pointer-events:${(props) => (props.activities.includes(props.id) ? 'none' : 'auto')};
  width: 265px;
  height:${(props) => props.px}px;
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
  margin-top: 10px;
  margin-bottom: 10px;
  border-left: 1px solid #CFCFCF;
  position: relative;
  ion-icon {
    width: 20px;
    color : ${(props) => (props.capacity === 0) ? '#CC6666' : '#078632'};
    position: absolute;
    top: 35%;
    margin-left: 18px;
  }
  p{
    color: ${(props) => (props.capacity === 0) ? '#CC6666' : '#078632'};
    font-size: 9px;
    position: absolute;
    top: 45%;
    width: 100px;
  }
`;
