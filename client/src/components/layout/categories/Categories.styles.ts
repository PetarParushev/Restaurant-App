import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& .MuiTreeItem-iconContainer': {
        marginRight: '5% !important',
        '& svg': {
          fontSize: '50px !important',
          zIndex:2,
          color: '#2699fb'
        }
      },
      '& .MuiTreeItem-label,.MuiTreeItem-label:hover': {
        backgroundColor: '#fff !important',
        paddingLeft: '1.5rem !important'
      }
    },
    addCategory: {
      maxHeight: 50,
    },
    content: {
      flexDirection: 'row-reverse',
      border: '1px solid #707070',
      marginTop: '1rem',
      paddingBottom: 5,
      paddingTop: 5,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));