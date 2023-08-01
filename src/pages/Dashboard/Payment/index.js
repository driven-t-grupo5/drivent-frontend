import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { Title } from '../../../components/Title/Title';
import { Subtitle } from '../../../components/Subtitle/Subtitle';
import { useState } from 'react';

const objCard = [
  { name: 'Presencial', price: 'R$250,00' },
  { name: 'Online', price: 'R$100,00' },
];

const objHospedagem = [
  { name: 'Sem Hotel', price: 'R$0,00' },
  { name: 'Com Hotel', price: 'R$350,00' },
];

export default function Payment() {
  // const [selected, setSelected] = useState(false);

  return (
    <>
      <Title title="Ingresso e pagamento" />
      <Subtitle subtitle="Primeiro, escolha sua modalidade de ingresso" />
      <StyledCard>
        {objCard.map((item, index) => (
          <Card key={index} name={item.name} price={item.price} />
        ))}
      </StyledCard>

      <Subtitle subtitle="Ótimo! Agora escolha sua modalidade de hospedagem" />
      <StyledCard>
        {objHospedagem.map((item, index) => (
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
