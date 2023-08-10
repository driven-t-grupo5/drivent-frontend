import { Subtitle } from '../../../components/Subtitle/Subtitle';
import { Title } from '../../../components/Title/Title';
import styled from 'styled-components';

export default function Activities() {
  const array = ['Sexta, 22/10', 'Sábado, 23/10', 'Domingo, 24/10'];
  return (
    <>
      <Title title="Escolha de atividades" />
      <Subtitle subtitle="Primeiro, filtre pelo dia do evento:" />
      {array.map((b) => <DayButton>{b}</DayButton>)}
      <VenueArea>
        <table>
          <tr>
            <th>Auditório Principal</th>
            <th>Auditório Lateral</th>
            <th>Sala de Workshop</th>
          </tr>
          <tr>
            <td>
              <Activity>
                <Info>
                  <h1>Minecraft: montando o PC ideal</h1>
                  <p>09:00 - 10:00</p>
                </Info>
                <Icon>
                  <ion-icon name="log-in-outline"></ion-icon>
                  <p>27 vagas</p>
                </Icon>
              </Activity>
              <Activity>
                <Info>
                  <h1>LoL: montando o PC ideal</h1>
                  <p>10:00 - 11:00</p>
                </Info>
                <Icon>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>27 vagas</p>
                </Icon>
              </Activity>
            </td>
            <td><Activity>
              <Info>
                <h1>LoL: montando o PC ideal</h1>
                <p>10:00 - 11:00</p>
              </Info>
              <Icon>
                <ion-icon name="close-circle-outline"></ion-icon>
                <p>27 vagas</p>
              </Icon>
            </Activity></td>
            <td><Activity>
              <Info>
                <h1>LoL: montando o PC ideal</h1>
                <p>10:00 - 11:00</p>
              </Info>
              <Icon>
                <ion-icon name="close-circle-outline"></ion-icon>
                <p>27 vagas</p>
              </Icon>
            </Activity></td>
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
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  :hover {
    cursor: pointer;
  }
`;

const VenueArea = styled.div`
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
    color: #078632;
    position: absolute;
    top: 15px;
    left: 18px;
  }
  ion-icon {
    width: 20px;
    color: #078632;
    position: absolute;
    top: 15px;
    left: 18px;
  }
  p{
    color: #078632;
    font-size: 9px;
    margin-top: 35px;
  }
`;
