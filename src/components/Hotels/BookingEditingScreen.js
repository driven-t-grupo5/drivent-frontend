import { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import useToken from '../../hooks/useToken.js';
import useRooms from '../../hooks/api/useRooms.js';
import Heading from './Heading.js';
import HotelsSection from './HotelsSection.js';
import RoomsSection from './RoomsSection.js';
import BookingContext from '../../contexts/BookingContext.js';
import EditingBookingContext from '../../contexts/EditingBookingContext.js';

export default function BookingEditingScreen({ hotels }) {
  const token = useToken();
  const { booking } = useContext(BookingContext);
  const [selectedHotelId, setSelectedHotelId] = useState(booking ? booking.Room.hotelId : null);
  const [selectedRoomId, setSelectedRoomId] = useState(booking ? booking.roomId : null);
  const { selectedHotelWithRooms } = useRooms(token, selectedHotelId);
  const { setEditingBooking } = useContext(EditingBookingContext);

  const handleClick = () => {
    setEditingBooking(false);
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
