import styled from 'styled-components';
import { Title } from '../../../components/Title/Title.js';
import useHotels from '../../../hooks/api/useHotels.js';
import useToken from '../../../hooks/useToken.js';

function ErrorMessage({ statusCode }) {
  return (
    <>
      <ErrorContainer>
        {statusCode === 402 ? (
          <>
            <p>Sua modalidade de ingresso não inclui hospedagem</p>
            <p>Prossiga para a escolha de atividades</p>
          </>
        ) : (
          <p>Você precisa ter o pagamento confirmado antes de fazer a escolha da hospedagem</p>
        )}
      </ErrorContainer>
    </>
  );
}

export default function Hotel() {
  const token = useToken();
  const { hotels, hotelsLoading, hotelsError } = useHotels(token);

  return (
    <>
      <Title title="Escolha de hotel e quarto" />
      {hotelsError ? <ErrorMessage statusCode={hotelsError.status} /> : <></>}
    </>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 1.5;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #8e8e8e;
`;
