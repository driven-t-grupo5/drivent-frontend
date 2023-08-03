import api from './api';

export async function pay(body, token) {
  const { data } = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
