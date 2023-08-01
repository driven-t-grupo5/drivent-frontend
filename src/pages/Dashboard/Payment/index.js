import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { Title } from '../../../components/Title/Title';
import { Subtitle } from '../../../components/Subtitle/Subtitle';

const objCard = [
  { name: 'Presencial', price: 'R$250,00' },
  { name: 'Online', price: 'R$100,00' },
];

export default function Payment() {
  return (
    <>
      <Title title="Ingresso e pagamento" />
      <Subtitle subtitle="Primeiro, escolha sua modalidade de ingresso"/>
      <StyledCard>
        {objCard.map((item, index) => (
          <Card key={index} name={item.name} price={item.price} />
        ))}
      </StyledCard>
    </>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
