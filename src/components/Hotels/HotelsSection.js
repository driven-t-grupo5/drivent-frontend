import { Typography, Grid, makeStyles } from '@material-ui/core';
import HotelCard from './HotelCard.js';

const useStyles = makeStyles({
  hotelsContainer: {
    marginTop: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'start',
  },
});

export default function HotelsSection({ hotels, selectedHotelId, setSelectedHotelId }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" color="textSecondary">
        Primeiro, escolha seu hotel
      </Typography>
      <Grid className={classes.hotelsContainer} container spacing={2}>
        {hotels &&
          hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              hotelSelected={hotel.id === selectedHotelId}
              setSelectedHotelId={setSelectedHotelId}
            />
          ))}
      </Grid>
    </>
  );
}