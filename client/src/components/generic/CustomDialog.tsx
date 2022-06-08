import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { DialogOptions } from '../../models/enums/dialogActions';

interface DialogProps {
  title: string;
  action?: DialogOptions;
  handleDialogClose: () => void;
  handleDialogConfirmation?: () => void;
  isDialogOpen: boolean;
}

const CustomDialog: React.FC<DialogProps> = ({
  handleDialogClose,
  handleDialogConfirmation,
  isDialogOpen,
  title,
  children,
  action
}) => {
  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {action === DialogOptions.Delete && (
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleDialogConfirmation}>
            Confirm
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
