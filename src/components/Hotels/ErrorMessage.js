import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export default function ErrorMessage({ statusCode }) {
  return (
    <ErrorContainer>
      {statusCode === 402 ? (
        <>
          <Typography variant="h6" color="textSecondary" align="center">
            Sua modalidade de ingresso não inclui hospedagem
          </Typography>
          <Typography variant="h6" color="textSecondary" align="center">
            Prossiga para a escolha de atividades
          </Typography>
        </>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          Você precisa ter o pagamento confirmado antes de fazer a escolha da hospedagem
        </Typography>
      )}
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
