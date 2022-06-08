import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Table } from '../../models/interfaces/table';
import { Grid } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    marginTop: 30,
  },
  pos: {
    marginBottom: 30,
  },
  cardPosition: {
    position: 'relative',
    color: '#2699fb',
  },
  buttonPosition: {
    position: 'absolute',
    right: 15,
    bottom: 25,
    borderRadius: 50,
    backgroundColor: '#2699fb',
    padding: 5,
  },
  bold: {
    fontWeight: 'bold',
  }
});
type Props = {
  cardData: Table;
};
const TableCard: React.FC<Props> = ({ cardData }) => {
  const classes = useStyles();

  const fullName = (firstName:string,lastName:string) => {
      return [firstName,lastName].join(' ');
  }
  return (
    <Grid className={classes.root} item xs={12} sm={9} md={11} lg={9}>
      <Card className={classes.cardPosition}>
        <CardContent>
          <Typography gutterBottom className={classes.bold}>
            {cardData.name}
          </Typography>
          <Typography className={`${classes.pos} ${classes.bold}`}>
            Max capacity: {cardData.capacity}
          </Typography>
          <Typography>Waiter: {cardData.Order ? fullName(cardData.Order.User.firstName,cardData.Order.User.lastName) : "-"}</Typography>
          <Typography>Total: {cardData.Order ? cardData.Order.totalPayment : 0.00} BGN</Typography>
        </CardContent>
        <Link to={{
          pathname: `/tables/${cardData.id}`,
          state: {
            table:cardData
          }
        }} >
          <CardActions className={classes.buttonPosition}>
            <KeyboardArrowRightIcon fontSize="small" className="color-white" />
          </CardActions>
        </Link>
      </Card>
    </Grid>
  );
};

export default TableCard;
