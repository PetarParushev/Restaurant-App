import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    logout: {
      marginLeft: 'auto',
    },
    drawer: {
      width: 250,
      backgroundColor: '#2699fb',
      height: '100%',
    },
    toolbar: {
      minHeight: 64,
      backgroundColor: '#3f51b5',
      display: 'flex',
      alignItems: 'center',
    },
    backButton: {
      paddingLeft: theme.spacing(3),
      width: 30,
      height: 30,
      cursor: 'pointer',
    },
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