import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    tableMl: {
      marginLeft: 'auto',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      '& .MuiCircularProgress-root': {
        height:'26px !important',
        '& svg': {
          height:'26px !important',
          margin: 'auto'
        }
      },
    },
  }));