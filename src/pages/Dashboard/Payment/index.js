import TicketComponent from '../../../components/Dashboard/Payments/TicketComponent'; 
import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState } from 'react';
import { Subtitle } from '../../../components/Subtitle/Subtitle';
import styled from 'styled-components';

export default function payment() {
  const { enrollment } = useEnrollment();

  return(
    <>
      {enrollment ? 

        ( <TicketComponent/>) 

        : 

        (<WarnningArea>
          <Subtitle subtitle={'Primeiro , faça a sua inscrição'}/>
        </WarnningArea>)}
    </>
  ); 
};

const WarnningArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 1.5;
  color: #8e8e8e;

`;
