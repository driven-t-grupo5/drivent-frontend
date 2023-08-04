import { Box, Card, CardActionArea, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

function CapacityIcons({ capacity, guests, iconClassName }) {
  const availableBeds = capacity - guests;
  const bedStates = Array(capacity)
    .fill(true)
    .map((_, index) => index >= availableBeds);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {bedStates.map((isAvailable, index) =>
          !isAvailable ? (
            <BsPerson className={iconClassName} key={index} />
          ) : (
            <BsPersonFill className={iconClassName} key={index} />
          )
        )}
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  roomCard: {
    width: 190,
    borderRadius: 10,
    backgroundColor: (props) => (props.roomSelected ? '#FFEED2' : props.roomFull ? '#E9E9E9' : null),
    opacity: (props) => (props.roomFull ? '70%' : null),
  },
  cardContent: {
    padding: 10,
  },
  iconsBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default function RoomCard({ room, roomSelected, setSelectedRoomId }) {
  const roomFull = room.guests >= room.capacity;
  const classes = useStyles({ roomSelected, roomFull });

  const handleClick = () => {
    if (!roomSelected && room.guests < room.capacity) {
      setSelectedRoomId(room.id);
    }
  };

  return (
    <Grid item>
      <Card className={classes.roomCard} variant="outlined">
        <CardActionArea onClick={handleClick} disabled={roomFull}>
          <CardContent className={classes.cardContent}>
            <Box className={classes.iconsBox}>
              <Typography variant="h6">{room.name}</Typography>
              <CapacityIcons capacity={room.capacity} guests={room.guests} iconClassName={classes.icon} />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
