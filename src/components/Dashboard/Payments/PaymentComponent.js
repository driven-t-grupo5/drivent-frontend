import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useGetTicket } from '../../../hooks/api/useTicket';

export default function Payment(ticketType) {
  const { ticket } = useGetTicket();
  const [creditCard, setCreditCard] = useState({
    number: '•••• •••• •••• ••••',
    name: 'YOUR NAME HERE',
    valid: '••/••',
    cvc: '',
  });
  const [confirmPayment, setConfirmPayment] = useState('none');
  var cartoes = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})/,
    Mastercard: /^5[1-5][0-9]{14}/,
    Amex: /^3[47][0-9]{13}/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}/,
  };
    
  function testarCC(nr, cartoes) {
    for (var cartao in cartoes) if (nr.match(cartoes[cartao])) return cartao;
    return false;
  }

  function paymentFinalization(e) {
    e.preventDefault();
    const data = {
      ticketId: ticket.id,
      cardData: {
        issuer: testarCC(creditCard.number, cartoes),
        number: creditCard.number,
        name: creditCard.name,
        expirationDate: creditCard.valid,
        cvv: creditCard.cvc,
      },
    };
    const user = JSON.parse(localStorage.getItem('userData'));
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/payments/process`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    promise.then((res) => {
      setConfirmPayment('flex');
      alert('Pagamento concluido com sucesso');
    });
    promise.catch((erro) => {
      alert(`${erro.response.status} ${erro.response.statusText}`);
    });
  }
  return (
    <>

      <StyledTypography  variant="h4">Ingresso e pagamento</StyledTypography>
      <PaymentSubtitle>Ingresso escolhido</PaymentSubtitle>
      <Ticket>
        <TicketInfo>
          <p>
            {!ticketType.isRemote  ? 'Remoto' : 'Presencial'}
                    
                    +  
                  
            {ticketType.includesHotel ? 'Com Hotel' : 'Sem Hotel'}
          </p>
          <p>
            {
              !ticketType.isRemote ? 'R$100,00' :
                ticketType.includesHotel && !ticketType.isRemote ? 'R$600,00' :
                  !ticketType.includesHotel && !ticketType.isRemote && 'R$250,00'
            }
          </p>
        </TicketInfo>
      </Ticket>
      <Main>
        <p>Pagamento</p>
        <Container confirmPayment={confirmPayment}>
          <CreditCard>
            <img src="https://img.freepik.com/icones-gratis/cartao-de-credito_318-534836.jpg" />
            <p>{creditCard.number}</p>
            <div>
              <p>{creditCard.name}</p>
              <div>
                <p>valid thru</p>
                <p>{creditCard.valid}</p>
              </div>
            </div>
          </CreditCard>
          <Data>
            <form onSubmit={(e) => paymentFinalization(e)}>
              <input
                placeholder="Card Number"
                required
                onChange={(e) => setCreditCard({ ...creditCard, number: e.target.value })}
              ></input>
              <p>E.g.:49...,51...,36...,37...</p>
              <input
                placeholder="Name"
                required
                onChange={(e) => setCreditCard({ ...creditCard, name: e.target.value })}
              ></input>
              <div>
                <input
                  placeholder="Valid Thru"
                  required
                  onChange={(e) => setCreditCard({ ...creditCard, valid: e.target.value })}
                ></input>
                <input
                  placeholder="CVC"
                  required
                  onChange={(e) => setCreditCard({ ...creditCard, cvc: e.target.value })}
                ></input>
              </div>
              <PayButton confirmPayment={confirmPayment} type="submit">
                FINALIZAR PAGAMENTO
              </PayButton>
            </form>
          </Data>
        </Container>
      </Main>
      <PaymentSucess confirmPayment={confirmPayment}>
        <ion-icon name="checkmark-circle"></ion-icon>
        <PaymentText>
          <p>Pagamento confirmado!</p>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </PaymentText>
      </PaymentSucess>
    </>
  );
}

const PayButton = styled.button`
  display: ${(props) => (props.confirmPayment === 'flex' ? 'none' : 'inline')};
  border: none;
  width: 182px;
  height: 37px;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  :hover {
    cursor: pointer;
  }
  position: absolute;
  left: 35px;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const PaymentSubtitle = styled.div`
  color: #8e8e8e;
  font-size: 20px;
  font-weight: 400;
`;

const Ticket = styled.div`
  background-color: #ffeed2;
  width: 290px;
  height: 108px;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const TicketInfo = styled.div`
  p:nth-child(1) {
    color: #454545;
    font-size: 16px;
  }
  p:nth-child(2) {
    color: #898989;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  }
`;

const Button = styled.button`
  display: ${(props) => (props.confirmPayment === 'flex' ? 'none' : 'inline')};
  border: none;
  width: 182px;
  height: 37px;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  :hover {
    cursor: pointer;
  }
  position: absolute;
  left: 35px;
`;

const PaymentSucess = styled.div`
  margin-top: 5px;
  color: #454545;
  display: ${(props) => props.confirmPayment};
  flex-wrap: wrap;
  ion-icon {
    color: #36b853;
    width: 44px;
    height: 44px;
  }
`;

const PaymentText = styled.div`
  margin-left: 5px;
  p:nth-child(1) {
    margin-top: 5px;
    font-weight: 700;
    font-size: 16px;
  }
  p:nth-child(2) {
    font-weight: 400;
    font-size: 16px;
  }
`;
const Main = styled.div`
  padding-bottom: 30px;
  p {
    font-size: 20px;
    color: #8e8e8e;
  }
`;

const Container = styled.div`
  height: 225px;
  width: 706;
  margin-top: 20px;
  display: ${(props) => (props.confirmPayment === 'flex' ? 'none' : 'flex')};
`;

const CreditCard = styled.div`
  height: 86%;
  width: 40%;
  background-color: #929292;
  margin-right: 20px;
  border-radius: 20px;
  padding: 18px;
  position: relative;
  img {
    height: 30%;
    width: 20%;
    margin-bottom: 20px;
  }
  p:last-child {
    font-size: 15px;
    margin-left: 5px;
    margin-bottom: 0px;
    letter-spacing: 2px;
  }
  p {
    color: #ffffff;
    font-size: 24px;
    letter-spacing: 2px;
    margin-bottom: 30px;
  }
  div {
    display: flex;
    p {
      font-size: 16px;
      letter-spacing: 0px;

      margin-right: 34px;
    }
    div {
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 34px;
      right: 18px;
      p {
        margin-top: 0px;
        margin-bottom: 0px;
        font-size: 12px;
      }
    }
  }
`;

const Data = styled.div`
  height: 100%;
  width: 58%;
  display: flex;
  flex-direction: column;
  form {
    width: 100%;
  }
  p {
    margin-top: 4px;
    font-size: 14px;
    margin-bottom: 24px;
  }
  input {
    height: 40px;
    border-radius: 6px;
    margin-bottom: 28px;
    font-size: 20px;
    padding: 6px;
    color: black;
    border: 1px solid #b3b4b4;
  }
  input:first-child {
    margin-bottom: 0px;
    width: 100%;
  }
  input:nth-child(3) {
    width: 100%;
  }
  input:focus {
    border: 1px solid black;
    outline: 0;
  }
  input::placeholder {
    font-size: 20px;
    color: #b3b4b4;
  }
  div {
    display: flex;
    input:first-child {
      width: 400px;
    }
    input:last-child {
      margin-left: 20px;
      width: 100px;
    }
  }
`;
