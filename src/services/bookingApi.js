import api from './api.js';

export async function getBooking(token) {
  const { data } = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function postBooking(token, roomId) {
  const { data } = await api.post(
    '/booking',
    { roomId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function putBooking(token, roomId, bookingId) {
  const { data } = await api.put(
    `/booking/${bookingId}`,
    { roomId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
