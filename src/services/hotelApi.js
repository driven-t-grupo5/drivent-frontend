import api from './api.js';

export async function getHotels(token) {
  const { data } = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getRooms(token, hotelId) {
  const { data } = await api.get(`/hotel/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
