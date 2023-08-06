import { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import useToken from '../../hooks/useToken.js';
import useRooms from '../../hooks/api/useRooms.js';
import Heading from './Heading.js';
import HotelsSection from './HotelsSection.js';
import RoomsSection from './RoomsSection.js';
import BookingContext from '../../contexts/BookingContext.js';
import EditingBookingContext from '../../contexts/EditingBookingContext.js';
import { postBooking, putBooking } from '../../services/bookingApi.js';
import { toast } from 'react-toastify';

export default function BookingEditingScreen({ hotels }) {
  const token = useToken();
  const { booking, setBooking } = useContext(BookingContext);
  const [selectedHotelId, setSelectedHotelId] = useState(booking ? booking.Room.hotelId : null);
  const [selectedRoomId, setSelectedRoomId] = useState(booking ? booking.roomId : null);
  const { selectedHotelWithRooms } = useRooms(token, selectedHotelId);
  const { setEditingBooking } = useContext(EditingBookingContext);

  const handleClick = async() => {
    const action = booking ? putBooking : postBooking;
    const baseArgs = [token, selectedRoomId];
    const args = booking ? [...baseArgs, booking.id] : baseArgs;

    try {
      const newBooking = await action(...args);
      setBooking(newBooking);
    } catch (err) {
      if (err.response.status === 403) {
        toast('Quarto não disponível');
        return;
      }
    } finally {
      setEditingBooking(false);
    }
  };

  return (
    <>
      <Heading />
      <HotelsSection
        hotels={hotels}
        selectedHotelId={selectedHotelId}
        setSelectedHotelId={setSelectedHotelId}
        setSelectedRoomId={setSelectedRoomId}
      />
      {selectedHotelWithRooms && (
        <RoomsSection
          rooms={selectedHotelWithRooms.Rooms}
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
        />
      )}
      {selectedRoomId !== null && (
        <Button variant="contained" onClick={handleClick}>
          Reservar Quarto
        </Button>
      )}
    </>
  );
}
