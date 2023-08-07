import TicketComponent from '../../../components/Dashboard/Tickets/TicketComponent'; 
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketType, { useGetTicket }  from '../../../hooks/api/useTicket';
import { Subtitle } from '../../../components/Subtitle/Subtitle';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function Ticket() {
  const [callPayment, setCallPayment] = useState(false);
  const { enrollment } = useEnrollment();
  const { ticketType } = useTicketType();
  const { ticket } = useGetTicket(); 

  useEffect(() => {
    if(ticket) {
      console.log('ticket', ticket);
      setPay();
    }
    return;
  }, [ticket]);
  const setPay = async() => {
    setCallPayment(true);
  };
  return(
    <>
      {enrollment ? 

        ( <TicketComponent ticket = { ticket } ticketType = { ticketType } callPayment= {callPayment } setCallPayment={setCallPayment} />) 

        : 

        (<WarnningArea>
          <Subtitle subtitle={'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'}/>
        </WarnningArea>)}
    </>
  ); 
};

const WarnningArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 1.5;
  color: #8e8e8e;

`;
