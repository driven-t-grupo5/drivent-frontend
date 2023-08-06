import * as bookingApi from '../../services/bookingApi.js';
import { useEffect, useState } from 'react';

export default function useBooking(token) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function action(token) {
    try {
      const data = await bookingApi.getBooking(token);
      setBooking(data);
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
    booking,
    bookingLoading: loading,
    bookingError: error,
  };
}
