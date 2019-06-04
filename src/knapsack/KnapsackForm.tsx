import React from "react";

import { KnapsackItem } from "../params/KnapsackItem";
import {
  Paper,
  Divider,
  Theme,
  WithStyles,
  withStyles,
  Typography
} from "@material-ui/core";
import KnapsackItemsList from "./KnapsackItemsList";
import KnapsackItemForm from "./KnapsackItemForm";
import KnapsackParamsForm from "./KnapsackParamsForm";
import { KnapsackParameters } from "../params/KnapsackParams";

const styles = (theme: Theme) => ({
  title: {
    padding: theme.spacing(2)
  },
  formContainer: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between"
  }
});

export interface KnapsackFormProps {
  items: KnapsackItem[];
  knapsackParams: KnapsackParameters;
  deleteDisabled?: boolean;
  addDisabled?: boolean;
  onAddItem: (item: KnapsackItem) => void;
  onDeleteItem: (index: number) => void;
  onKnapsackParamsChange: (knapsackParams: KnapsackParameters) => void;
}

interface Props extends KnapsackFormProps, WithStyles<typeof styles> {}

const KnapsackForm: React.FC<Props> = props => (
  <Paper>
    <div className={props.classes.title}>
      <Typography color="primary" variant="h5">
        Knapsack Values
      </Typography>
    </div>
    <Divider />
    <KnapsackItemsList
      items={props.items}
      onDeleteItem={props.onDeleteItem}
      deleteDisabled={props.deleteDisabled}
    />
    <Divider />
    <div className={props.classes.formContainer}>
      <KnapsackItemForm
        onSubmit={props.onAddItem}
        addDisabled={props.addDisabled}
      />
      <KnapsackParamsForm
        params={props.knapsackParams}
        onSubmit={props.onKnapsackParamsChange}
      />
    </div>
  </Paper>
);

KnapsackForm.defaultProps = {
  deleteDisabled: false,
  addDisabled: false
};

export default withStyles(styles)(KnapsackForm);
