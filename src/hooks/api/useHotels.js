import * as hotelsApi from '../../services/hotelApi.js';
import { useEffect, useState } from 'react';

export default function useHotels(token) {
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function action(token) {
    try {
      const data = await hotelsApi.getHotels(token);
      setHotels(data);
    } catch (err) {
      setError(err.response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    action(token);
  }, []);

  return {
    hotels,
    hotelsLoading: loading,
    hotelsError: error,
  };
}
