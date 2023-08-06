import styled from 'styled-components';
import { useState } from 'react';
import { Card } from '../../../components/Card/Card';
import { Title } from '../../../components/Title/Title';
import { Subtitle } from '../../../components/Subtitle/Subtitle';
import { HotelConfirmation } from '../../../components/HotelConfirmation/HotelConfirmation';
import  Payment  from './PaymentComponent';

const objCard = [
  { name: 'Presencial', price: 250 },
  { name: 'Online', price: 100 },
];

const objHospedagem = [
  { name: 'Sem Hotel', price: 0 },
  { name: 'Com Hotel', price: 350 },
];

export default function TicketComponent(ticketType) {
  const [userTicket, setUserTicket] = useState({ ticketStatus: '',  includesHotel: false, isRemote: false, totalValue: '' });
  const [info, setInfo] = useState({ type: '', hotel: '', total: '' });
  const [ticketModality, setTicketModality] = useState(null);
  const [showHotel, setShowHotel] = useState(null);
  const [callPayment, setCallPayment] = useState(false);

  const totalPrice = () => {
    let price = objCard.find((item) => item.name === ticketModality).price;
    if (showHotel) {
      price += objHospedagem.find((item) => item.name === showHotel).price;
    }

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    return value;
  };
  
  return (
    <>
      {!callPayment ?
    
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
                setUserTicket = { setUserTicket }
                userTicket = {userTicket}
                setCallPayment = {setCallPayment}
              />
            </>
          )}
        </>
        )

        :

        (<Payment userTicket={userTicket}/>)
      
      }
    </> 
  );
}
const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

