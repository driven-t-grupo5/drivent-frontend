import { Card, CardContent, Typography, Grid, CardMedia, makeStyles, CardActionArea } from '@material-ui/core';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function joinTypes(types) {
  if (types.length === 1) {
    return capitalize(types[0]);
  }

  if (types.length === 2) {
    return `${capitalize(types[0])} e ${types[1]}`;
  }

  if (types.length === 3) {
    return `${capitalize(types[0])}, ${types[1]} e ${types[2]}`;
  }
}

function roomTypes(availableTypes) {
  const possibleTypes = { 1: 'single', 2: 'double', 3: 'triple' };
  const types = availableTypes.map((capacity) => possibleTypes[capacity]);
  return joinTypes(types);
}

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
  hotelSpec: {
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
            <Typography className={classes.hotelSpec} variant="caption">
              Tipos de acomodação:
            </Typography>
            <br />
            <Typography variant="caption">{roomTypes(hotel.availableTypes)}</Typography>
            <br />
            <Typography className={classes.hotelSpec} variant="caption">
              Quartos disponíveis:
            </Typography>{' '}
            <Typography variant="caption">{hotel.availableRooms}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
