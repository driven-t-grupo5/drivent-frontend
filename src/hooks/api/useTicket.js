import useToken from '../useToken';
import useAsync from '../useAsync';
import * as ticketApi from '../../services/ticketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketType,
    loading: tickeTypeLoading,
    error: ticketTypeError,
    act: getticketType
  } = useAsync(() => ticketApi.getTickeTypes(token));

  return {
    ticketType,
    tickeTypeLoading,
    ticketTypeError,
    getticketType
  };
};

export function insertTicket(body) {
  const token = useToken();
  const {
    data: ticket,
    loading: ticketeLoading,
    error: ticketError,
    act: generateTicket
  } = useAsync(() => ticketApi.generateTicket(body, token));

  return {
    ticket,
    ticketeLoading,
    ticketError,
    generateTicket
  };
};

