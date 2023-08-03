import useHotels from '../../../hooks/api/useHotels.js';
import useToken from '../../../hooks/useToken.js';
import ErrorMessage from '../../../components/Hotels/ErrorMessage.js';
import HotelsSection from '../../../components/Hotels/HotelsSection.js';
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import useRooms from '../../../hooks/api/useRooms.js';

function Heading() {
  return (
    <Typography variant="h4" component="h1">
      Escolha de hotel e quarto
    </Typography>
  );
}

export default function Hotel() {
  const token = useToken();
  const { hotels, hotelsError } = useHotels(token);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const { rooms, roomsError } = useRooms(token, selectedHotelId);

  if (hotelsError) {
    return (
      <>
        <Heading />
        <ErrorMessage statusCode={hotelsError.status} />
      </>
    );
  }

  return (
    <>
      <Heading />
      <HotelsSection hotels={hotels} selectedHotelId={selectedHotelId} setSelectedHotelId={setSelectedHotelId} />
    </>
  );
}
