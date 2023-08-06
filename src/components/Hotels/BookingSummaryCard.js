import { Card, CardContent, Typography, CardMedia, makeStyles, CardActionArea } from '@material-ui/core';
import useRooms from '../../hooks/api/useRooms.js';
import useToken from '../../hooks/useToken.js';

function roomType(capacity) {
  const roomTypes = { 1: 'Single', 2: 'Double', 3: 'Triple' };
  return roomTypes[capacity];
}

function peopleInRoom(selectedRoom) {
  const otherGuests = selectedRoom.guests - 1;
  return otherGuests === 0 ? 'Você' : `Você e mais ${otherGuests}`;
}

const useStyles = makeStyles({
  hotelCard: {
    width: 196,
    backgroundColor: '#FFEED2',
  },
  media: {
    height: 100,
    marginInline: 16,
    marginTop: 16,
    borderRadius: 5,
  },
  hotelSpec: {
    fontWeight: 700,
  },
});

export default function BookingSummaryCard({ booking }) {
  const token = useToken();
  const { selectedHotelWithRooms } = useRooms(token, booking.Room.hotelId);
  const selectedRoom = selectedHotelWithRooms?.Rooms.find((room) => room.id === booking.roomId);
  const classes = useStyles();

  if (!selectedHotelWithRooms || !selectedRoom) {
    return <></>;
  }

  return (
    <Card className={classes.hotelCard} style={{ marginBlock: 16 }}>
      <CardActionArea>
        <CardMedia className={classes.media} image={selectedHotelWithRooms.image} />
        <CardContent>
          <Typography variant="h6">{selectedHotelWithRooms.name}</Typography>
          <Typography className={classes.hotelSpec} variant="caption">
            Quarto reservado:
          </Typography>
          <br />
          <Typography variant="caption">{`${selectedRoom.name} (${roomType(selectedRoom.capacity)})`}</Typography>
          <br />
          <Typography className={classes.hotelSpec} variant="caption">
            Pessoas no seu quarto:
          </Typography>{' '}
          <Typography variant="caption">{peopleInRoom(selectedRoom)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
