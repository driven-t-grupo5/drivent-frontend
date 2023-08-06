import { useContext } from 'react';
import BookingContext from '../../contexts/BookingContext.js';
import EditingBookingContext from '../../contexts/EditingBookingContext.js';
import BookingEditingScreen from './BookingEditingScreen.js';
import BookingSummaryScreen from './BookingSummaryScreen.js';

export default function HotelScreen({ hotels }) {
  const { booking } = useContext(BookingContext);
  const { editingBooking } = useContext(EditingBookingContext);

  return <>{!booking || editingBooking ? <BookingEditingScreen hotels={hotels} /> : <BookingSummaryScreen />}</>;
}
