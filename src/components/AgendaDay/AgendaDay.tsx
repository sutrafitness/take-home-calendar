import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import * as dateFns from "date-fns";
import AgendaItem from "../AgendaItem/AgendaItem";
import { useAppContext } from "../..";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
  });

interface Props extends WithStyles<typeof styles> {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, onClose } = props;

  const dateTitle = agendaStatus.date
    ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";

  const appContext = useAppContext();
  let todaysEvents = [];
  if (agendaStatus.isOpen) {
    const { events } = appContext;

    const eventDayUTC = dateFns.format(agendaStatus.date, "yyyyMMdd");

    todaysEvents = events[eventDayUTC];

    todaysEvents.sort((eventA, eventB) => {
      return dateFns.compareAsc(
        dateFns.parseISO(eventA.date),
        dateFns.parseISO(eventB.date)
      );
    });
  }

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        <Typography variant="h6">Agenda</Typography>
        {/* Display Agenda Items Here */}
        {/* TODO: This should get the same events that were passed to the day container and list them in correct time order for each event/reminder */}
        {todaysEvents.map((event, i) => (
          <AgendaItem key={i} event={event} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);
