import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert:React.FC<AlertProps> = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default Alert