import { Card, CardActionArea, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  roomCard: {
    width: 190,
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
});

export default function RoomCard({ room, roomSelected, setSelectedRoomId }) {
  const classes = useStyles({ roomSelected });

  const handleClick = () => {
    if (!roomSelected && room.guests < room.capacity) {
      setSelectedRoomId(room.id);
    }
  };

  return (
    <Grid item>
      <Card className={classes.roomCard} variant="outlined" roomSelected={roomSelected} onClick={handleClick}>
        <CardActionArea onClick={handleClick}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">{room.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
