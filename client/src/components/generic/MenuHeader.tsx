import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { DialogOptions } from "../../models/enums/dialogActions";
const useStyles = makeStyles({
    addCategory: {
        maxHeight:50
    },
    marginTop:{
        marginTop: '3rem'
    }
  });

  type Props = {
    headerText: string,
    buttonText?: string,
    showButton?: boolean,
    handleDialogOpen?: (dialogOptions: DialogOptions) => void;
  }
const MenuHeader: React.FC<Props> = ({showButton,buttonText,headerText,handleDialogOpen}) => {
    const classes = useStyles();

    return (
        <Grid item xs={9} container justify="space-between" direction="row" className={`${classes.marginTop} d-flex color-grey`}>
        <Typography component={Grid} gutterBottom variant="h3">
          {headerText}
        </Typography>
        {showButton && <Button component={Grid} variant="contained" color="primary" className={classes.addCategory} onClick={() => {
          if(handleDialogOpen) {
            handleDialogOpen(DialogOptions.Create);
          }
        }}>
          {buttonText}
        </Button>}
      </Grid>
    )
}
export default MenuHeader;