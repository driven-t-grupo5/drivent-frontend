import * as paymentApi from '../../services/paymentApi.js';
import { useEffect, useState } from 'react';

export default function usePayment(body, token) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function action(token) {
    try {
      const data = await paymentApi.pay(body, token);
      setPayment(data);
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
    payment,
    paymentLoading: loading,
    paymentError: error,
  };
}
