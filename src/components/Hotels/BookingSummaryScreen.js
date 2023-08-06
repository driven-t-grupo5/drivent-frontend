import { Typography, Button } from '@material-ui/core';
import Heading from './Heading.js';
import BookingSummaryCard from './BookingSummaryCard.js';
import { useContext } from 'react';
import BookingContext from '../../contexts/BookingContext.js';
import EditingBookingContext from '../../contexts/EditingBookingContext.js';

export default function BookingSummaryScreen() {
  const { booking } = useContext(BookingContext);
  const { setEditingBooking } = useContext(EditingBookingContext);

  const handleClick = () => {
    setEditingBooking(true);
  };

  return (
    <>
      <Heading />
      <Typography variant="h6" color="textSecondary">
        Você já escolheu seu quarto
      </Typography>
      <BookingSummaryCard booking={booking} />
      <Button variant="contained" onClick={handleClick}>
        Trocar Quarto
      </Button>
    </>
  );
}
