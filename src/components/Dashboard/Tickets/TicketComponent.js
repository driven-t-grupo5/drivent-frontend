import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Card } from '../../Card/Card';
import { Title } from '../../Title/Title';
import { Subtitle } from '../../Subtitle/Subtitle';
import { HotelConfirmation } from '../../HotelConfirmation/HotelConfirmation';
import  Payment  from '../Payments/PaymentComponent';
import useTicketType from '../../../hooks/api/useTicket';

const objCard = [
  { name: 'Presencial', price: 250 },
  { name: 'Online', price: 100 },
];

const objHospedagem = [
  { name: 'Sem Hotel', price: 0 },
  { name: 'Com Hotel', price: 350 },
];
export default function TicketComponent({ ticket, ticketType, ticketExists }) {
  console.log ('TICKET', ticket, 'TICKET TYPE', ticketType, 'TICKET eXIST', ticketExists);
  const [userTicket, setUserTicket] = useState({ ticketStatus: '', ticketValue: '',  includesHotel: false, isRemote: false });
  const [ticketModality, setTicketModality] = useState(null);
  const [showHotel, setShowHotel] = useState(null); 
  const [callPayment, setCallPayment] = useState(false); 
  useEffect(() => {
    if(ticket !== null) {
      setPay();
    }
    return;
  }, [ticket]);

  const setPay = async() => {
    setCallPayment(true);
  };
  const totalPrice = () => {
    let price = objCard.find((item) => item.name === ticketModality).price;
    if (showHotel) {
      price += objHospedagem.find((item) => item.name === showHotel).price;
    }

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };
  
  return (
    <>
      {(!callPayment)  ? 
        ( <>
          <Title title="Ingresso e pagamento" />
          <Subtitle subtitle="Primeiro, escolha sua modalidade de ingresso" />
          <StyledCard >
            {objCard.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                price={`R$${item.price},00`}
                selectedName={ticketModality}
                setSelectedName={setTicketModality}
                setUserTicket = {setUserTicket}
                userTicket= { userTicket }
              />
            ))}
          </StyledCard>

          {ticketModality === 'Presencial' && (
            
            <>
            
              <Subtitle subtitle="Ótimo! Agora escolha sua modalidade de hospedagem" />
              <StyledCard>
                {objHospedagem.map((item, index) => (
                  <Card
                    key={index}
                    name={item.name}
                    price={`R$${item.price},00`}
                    selectedName={showHotel}
                    setSelectedName={setShowHotel}
                    setUserTicket = {setUserTicket}
                  />
                ))}
              </StyledCard>
            </>
          )}

          {(ticketModality === 'Online' || showHotel) && (
            <>
              <HotelConfirmation
                subtitle={`Fechado! O total ficou em ${totalPrice()}. Agora é só confirmar`}
                button="RESERVAR INGRESSO"
                userTicket = { userTicket }
                ticketType = { ticketType } 
                setCallPayment = { setCallPayment }
              />
            </>
          )}
        </>
        )

        :

        (<Payment userTicket={userTicket} ticket={ticket} ticketType = {ticketType}/>)
      
      }
    </> 
  );
}
const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

