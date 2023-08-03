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
});

export default function HotelCard({ hotel, hotelSelected, setSelectedHotelId }) {
  const classes = useStyles({ hotelSelected });

  return (
    <Grid item>
      <Card
        className={classes.hotelCard}
        hotelSelected={hotelSelected}
        onClick={() => {
          setSelectedHotelId(hotel.id);
        }}
      >
        <CardActionArea onClick={() => setSelectedHotelId(hotel.id)}>
          <CardMedia className={classes.media} image={hotel.image} />
          <CardContent>
            <Typography variant="h6">{hotel.name}</Typography>
            <Typography variant="body2">Capacidade:</Typography>
            <Typography variant="body2">{hotel.capacity}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
