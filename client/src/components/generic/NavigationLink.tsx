import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

type Props = {
    name: string,
    icon: any;
}
const NavigationLink: React.FC<Props> = (props) => {
    return (
        <ListItem button component={Link} to={`/${props.name.toLowerCase()}`}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>
    );
};

export default NavigationLink