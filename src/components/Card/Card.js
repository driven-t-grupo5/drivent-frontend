import { useState } from 'react';
import styled from 'styled-components';

export const Card = ({ name, price, onClick }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledConteiner onClick={handleClick} selected={selected}>
      <StyledName>{name}</StyledName>
      <StyledPrice>{price}</StyledPrice>
    </StyledConteiner>
  );
};

const StyledConteiner = styled.div`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: solid 1px #cecece;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#FFFFFF')};
`;

const StyledName = styled.p`
  font-size: 16px;
  color: #454545;
  font-weight: 400;
`;

const StyledPrice = styled.p`
  font-size: 14px;
  color: #898989;
  font-weight: 400;
`;
