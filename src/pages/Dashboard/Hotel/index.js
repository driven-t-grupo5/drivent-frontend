import useHotels from '../../../hooks/api/useHotels.js';
import useToken from '../../../hooks/useToken.js';
import ErrorMessage from '../../../components/Hotels/ErrorMessage.js';
import Heading from '../../../components/Hotels/Heading.js';
import { BookingProvider } from '../../../contexts/BookingContext.js';
import { EditingBookingProvider } from '../../../contexts/EditingBookingContext.js';
import HotelScreen from '../../../components/Hotels/HotelScreen.js';

export default function Hotel() {
  const token = useToken();
  const { hotels, hotelsError } = useHotels(token);

  if (hotelsError) {
    return (
      <>
        <Heading />
        <ErrorMessage statusCode={hotelsError.status} />
      </>
    );
  }

  return (
    <BookingProvider>
      <EditingBookingProvider>
        <HotelScreen hotels={hotels} />
      </EditingBookingProvider>
    </BookingProvider>
  );
}
