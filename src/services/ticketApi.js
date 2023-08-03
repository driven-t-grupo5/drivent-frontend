import api from './api';

export async function genereteTicket(body, token) {
  const { data } = await api.post('/tickets', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return data;
}
  
