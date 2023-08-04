import { Card, CardContent, Typography, Grid, CardMedia, makeStyles, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles({
  hotelCard: {
    width: 196,
    backgroundColor: (props) => (props.hotelSelected ? '#FFEED2' : '#EBEBEB'),
  },
  media: {
    height: 100,
    marginInline: 16,
    marginTop: 16,
    borderRadius: 5,
  },
  availableRooms: {
    fontWeight: 700,
  },
});

export default function HotelCard({ hotel, hotelSelected, setSelectedHotelId, setSelectedRoomId }) {
  const classes = useStyles({ hotelSelected });

  const handleClick = () => {
    setSelectedHotelId(hotel.id);
    setSelectedRoomId(null);
  };

  return (
    <Grid item>
      <Card className={classes.hotelCard} hotelSelected={hotelSelected} onClick={handleClick}>
        <CardActionArea onClick={() => setSelectedHotelId(hotel.id)}>
          <CardMedia className={classes.media} image={hotel.image} />
          <CardContent>
            <Typography variant="h6">{hotel.name}</Typography>
            <Typography className={classes.availableRooms} variant="caption">
              Quartos disponíveis:
            </Typography>{' '}
            <Typography variant="caption">{hotel.availableRooms}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
