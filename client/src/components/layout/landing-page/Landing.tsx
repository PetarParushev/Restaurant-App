import { useAuth0 } from '@auth0/auth0-react';
import { Container, FormControl, Grid, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import './Landing.css';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
    },
  }));
const LandingPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const [labelWidth, setLabelWidth] = useState(0);
  const labelRef = useRef<HTMLLabelElement>(null);

  // useEffect(() => {
  //   setLabelWidth(labelRef?.current?.offsetWidth);
  // }, []);
  const classes = useStyles();
  return (
    <Container className="h-100">
      <Grid container direction="row" justify="center" alignItems="center" className="h-100">
        <Grid item xs={3}>
          asdafdafafaf
        </Grid>
        <Grid item xs={9}>
        <FormControl className={classes.formControl} variant="outlined">
        <InputLabel ref={labelRef} htmlFor="component-outlined">
          Name
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          labelWidth={labelWidth}
        />
      </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;

//   {/* <Button color="inherit" onClick={() => loginWithRedirect()}>
//     Login
//   </Button> */}
