import TicketComponent from '../../../components/Dashboard/Tickets/TicketComponent'; 
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketType from '../../../hooks/api/useTicket';
import { Subtitle } from '../../../components/Subtitle/Subtitle';
import styled from 'styled-components';

export default function payment() {
  const { enrollment } = useEnrollment();
  const { ticketType } = useTicketType();

  return(
    <>
      {enrollment ? 

        ( <TicketComponent ticketType = { ticketType }/>) 

        : 

        (<WarnningArea>
          <Subtitle subtitle={'Primeiro , faça a sua inscrição'}/>
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
