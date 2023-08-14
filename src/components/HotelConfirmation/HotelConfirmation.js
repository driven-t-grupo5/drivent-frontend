import styled from 'styled-components';
import { Subtitle } from '../Subtitle/Subtitle';
import api from '../../services/api';

export const HotelConfirmation = ({ subtitle, button, userTicket, setCallPayment, ticketType, setCreatedTicket }) => {
  const setReserve = async() => {
    const selectedTicket = ticketType.find((type) => 
      type.isRemote === userTicket.isRemote && type.includesHotel === userTicket.includesHotel
    );
    console.log('SELECTED TICKET', selectedTicket);
    const lsObj = JSON.parse(localStorage.getItem('userData')); 
    const body ={ userId: lsObj.user.id, ticketTypeId: selectedTicket.id };
    const { data } = await api.post('/tickets', body, {
      headers: {
        Authorization: `Bearer ${lsObj.token}`,
      },
    });
    if (data) {
      setCreatedTicket(data);
      setCallPayment(true);
    }
  };
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
