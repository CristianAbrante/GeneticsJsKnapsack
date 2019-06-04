import React from "react";
import { Paper, Fab, Theme, WithStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
    "& *": {
      margin: theme.spacing(1)
    }
  }
});

export interface AlgorithmExecutionButtonsProps
  extends WithStyles<typeof styles> {
  onRunClick: () => void;
  nextGenerationDisabled: boolean;
  onNextGenerationClick: () => void;
}

const AlgorithmExecutionButtons = (props: AlgorithmExecutionButtonsProps) => {
  return (
    <Paper className={props.classes.container}>
      <Fab variant="extended" color="primary" onClick={props.onRunClick}>
        {props.nextGenerationDisabled ? "stop algorithm" : "run algorithm"}
      </Fab>
      <Fab
        onClick={props.onNextGenerationClick}
        variant="extended"
        color="primary"
        disabled={props.nextGenerationDisabled}
      >
        next generation
      </Fab>
    </Paper>
  );
};

export default withStyles(styles)(AlgorithmExecutionButtons);
