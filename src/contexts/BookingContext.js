import { createContext } from 'react';
import useBooking from '../hooks/api/useBooking.js';
import useToken from '../hooks/useToken.js';

const BookingContext = createContext();
export default BookingContext;

export function BookingProvider({ children }) {
  const token = useToken();
  const { booking, setBooking, bookingError } = useBooking(token);

  return <BookingContext.Provider value={{ booking, setBooking, bookingError }}>{children}</BookingContext.Provider>;
}
