import styled from 'styled-components';
import { Subtitle } from '../Subtitle/Subtitle';

export const HotelConfirmation = ({ subtitle, button, setUserTicket, userTicket, setCallPayment }) => {
  function setReserve() {
    console.log('button value', button);
    if(button ==='RESERVAR INGRESSO') {
      setUserTicket( { ...userTicket, ticketStatus: 'RESERVED' } );
    }  

    setCallPayment(true);
  }

  return (
    <>
      <Subtitle subtitle={subtitle} />
      <StyledButton onClick={() => {setReserve();}}>{button}</StyledButton>
    </>
  );
};

const StyledButton = styled.button`
  border: none;
  margin: 10px 0;
  width: 185px;
  height: 40px;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  :hover {
    cursor: pointer;
  }
`;
