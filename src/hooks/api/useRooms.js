import * as hotelsApi from '../../services/hotelApi.js';
import { useEffect, useState } from 'react';

export default function useRooms(token, hotelId) {
  const [selectedHotelWithRooms, setSelectedHotelWithRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function action(token) {
    try {
      const data = await hotelsApi.getRooms(token, hotelId);
      setSelectedHotelWithRooms(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (hotelId !== null) {
      action(token);
    }
  }, [hotelId]);

  return {
    selectedHotelWithRooms,
    selectedHotelWithRoomsLoading: loading,
    selectedHotelWithRoomsError: error,
  };
}
