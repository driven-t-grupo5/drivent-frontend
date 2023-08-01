import styled from 'styled-components';

export const Subtitle = ({ subtitle }) => {
  return (
    <>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </>
  );
};

const StyledSubtitle = styled.p`
  font-size: 20px;
  color: #8e8e8e;
  font-weight: 400;
  margin: 15px 0;
`;
