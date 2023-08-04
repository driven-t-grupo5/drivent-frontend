import { Grid, Typography, makeStyles } from '@material-ui/core';
import RoomCard from './RoomCard.js';

const useStyles = makeStyles({
  roomsGrid: {
    marginTop: 10,
  },
});

export default function RoomsSection({ rooms, selectedRoomId, setSelectedRoomId }) {
  const classes = useStyles();
  console.log(rooms);
  return (
    <>
      <Typography variant="h6" color="textSecondary">
        Ótima pedida! Agora escolha seu quarto
      </Typography>
      <Grid className={classes.roomsGrid} container spacing={2}>
        {rooms &&
          rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              roomSelected={room.id === selectedRoomId}
              setSelectedRoomId={setSelectedRoomId}
            />
          ))}
      </Grid>
    </>
  );
}
