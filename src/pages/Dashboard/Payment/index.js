import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Card } from '../../../components/Card/Card';
import { Title } from '../../../components/Title/Title';
import { Subtitle } from '../../../components/Subtitle/Subtitle';

const objCard = [
  { name: 'Presencial', price: 'R$250,00' },
  { name: 'Online', price: 'R$100,00' },
];

const objHospedagem = [
  { name: 'Sem Hotel', price: 'R$0,00' },
  { name: 'Com Hotel', price: 'R$350,00' },
];

const HospedagemOptions = () => {
  return (
    <>
      <Subtitle subtitle="Ótimo! Agora escolha sua modalidade de hospedagem" />
      <StyledCard>
        {objHospedagem.map((item, index) => (
          <Card key={index} name={item.name} price={item.price} />
        ))}
      </StyledCard>
    </>
  );
};

export default function Payment() {
  const [showHospedagem, setShowHospedagem] = useState(false);

  const handlePresencialClick = () => {
    setShowHospedagem((prev) => !prev);
  };

  const handleOnlineClick = () => {
    // setShowHospedagem((prev) => !prev);
    // TODO - puxar as opcoes de online
  };

  const [creditCard, setCreditCard] = useState({ number: '•••• •••• •••• ••••', name: 'YOUR NAME HERE', valid: '••/••', cvc: '' });
  
  const [info, setInfo] = useState({ type: '', hotel: '', total: '' });
  const [confirmPayment, setConfirmPayment] = useState('none');
  function paymentFinalization() {
    setConfirmPayment('flex');
  }
  
  return (
    <>
      <Title title="Ingresso e pagamento" />
      <Subtitle subtitle="Primeiro, escolha sua modalidade de ingresso" />
      <StyledCard>
        {objCard.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            price={item.price}
            onClick={item.name === 'Presencial' ? handlePresencialClick : handleOnlineClick}
          />
        ))}
      </StyledCard>

      {showHospedagem && <HospedagemOptions />}
      {/*aqui é o payment*/}
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <PaymentSubtitle>Ingresso escolhido</PaymentSubtitle>
      <Ticket>
        <TicketInfo>
          <p>{info.type} + {info.hotel}</p>
          <p>R$ {info.total}</p>
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
            {console.log(creditCard)}
            <input placeholder='Card Number'  onChange={e => setCreditCard({ ...creditCard, number: e.target.value })}></input>
            <p>E.g.:49...,51...,36...,37...</p>
            <input placeholder='Name'  onChange={e => setCreditCard({ ...creditCard, name: e.target.value })} ></input>
            <div>
              <input placeholder='Valid Thru'  onChange={e => setCreditCard({ ...creditCard, valid: e.target.value })}  ></input>
              <input placeholder='CVC'   onChange={e => setCreditCard({ ...creditCard, cvc: e.target.value })}></input>
            </div>
          </Data>
        </Container>

      </Main>
      <Button confirmPayment={confirmPayment} onClick={paymentFinalization}>FINALIZAR PAGAMENTO</Button>
      <PaymentSucess confirmPayment={confirmPayment}>
        <ion-icon name="checkmark-circle"></ion-icon>
        <PaymentText>
          <p>Pagamento confirmado!</p>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </PaymentText>
      </PaymentSucess>
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const PaymentSubtitle = styled.div`
  color: #8E8E8E;
  font-size: 20px;
  font-weight: 400;
`;

const Ticket = styled.div`
  background-color: #FFEED2;
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
  };
  p:nth-child(2){
    color: #898989;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  };
`;

const Button = styled.button`
  display:${props => (props.confirmPayment==='flex') ? 'none' : 'inline'};
  border: none;
  margin-top: 10px;
  width: 182px;
  height: 37px;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px 0px #00000040;
  :hover{
    cursor: pointer;
  }
`;

const PaymentSucess = styled.div`
  margin-top:20px;
  color: #454545;
  display: ${props => props.confirmPayment};
  flex-wrap: wrap;
  ion-icon{
    color: #36b853;
    width: 44px;
    height: 44px;
  };
`;

const PaymentText = styled.div`
  margin-left: 5px;
  p:nth-child(1){
    margin-top: 5px;
    font-weight: 700;
    font-size: 16px;
  };
  p:nth-child(2){
    font-weight: 400;
    font-size: 16px;
  };
`;
const Main = styled.div`
  p{
    font-size:20px;
    color:#8E8E8E;
  }
`;

const Container = styled.div`
  height:225px;
  width:706;
  margin-top:20px;
  display:${props => (props.confirmPayment==='flex') ? 'none' : 'flex'};
`;

const CreditCard = styled.div`
  height:86%;
  width:40%;
  background-color:#929292;
  margin-right:20px;
  border-radius:20px;
  padding:18px;
  position:relative;
  img{
    height:30%;
    width:20%;
    margin-bottom:20px;
  }
  p:last-child{
  font-size:15px;
  margin-left:5px;
  margin-bottom:0px;
  letter-spacing:2px;
  }
  p{
    color:#ffffff;
    font-size:24px;
    letter-spacing:2px;
    margin-bottom:30px;
  }
  div{
    display:flex;
    p{
      font-size:16px;
      letter-spacing:0px;
      
      margin-right:34px;
    }
    div{
      display:flex;
      flex-direction:column;
      position:absolute;
      bottom:34px;
      right:18px;
      p{
        margin-top:0px;
        margin-bottom:0px;
        font-size:12px;
      }
    }
  }
`;

const Data = styled.div`
  height:100%;
  width:58%;
  display:flex;
  flex-direction:column;
  p{
    margin-top:4px;
    font-size:14px;
    margin-bottom:24px;
  }
  input{
    height:40px;
    border-radius:6px;
    margin-bottom:28px;
    font-size:20px;
    padding: 6px;
    color:black;
    border: 1px solid #b3b4b4;
  }
  input:first-child{
    margin-bottom:0px;
  }
  input:focus{
    border: 1px solid black;
    outline:0;
  }
  input::placeholder{
    font-size:20px;
    color:#b3b4b4;
  }
  div{
    display:flex;
    input:first-child{
      width:400px;
    }
    input:last-child{
      margin-left:20px;
      width:100px;
    }
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
