import React from "react";

import {
  Card,
  Typography,
  WithStyles,
  withStyles,
  Fab
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { KnapsackItem } from "./App";

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    margin: 15
  },
  item: {
    marginRight: 5
  }
};

export interface KnapsackItemCardProps extends WithStyles<typeof styles> {
  index: number;
  item: KnapsackItem;
  onDeleteItem: (index: number) => any;
}

const KnapsackItemCard = (props: KnapsackItemCardProps) => {
  const numberOfDecimals = 2;
  return (
    <Card className={props.classes.card}>
      <div>
        <Typography
          className={props.classes.item}
          variant="overline"
        >{`weight: ${props.item.weight.toFixed(numberOfDecimals)}`}</Typography>
        <Typography variant="overline">{`value: ${props.item.value.toFixed(
          numberOfDecimals
        )}`}</Typography>
      </div>
      <Fab
        onClick={() => props.onDeleteItem(props.index)}
        size="small"
        color="secondary"
      >
        <DeleteIcon />
      </Fab>
    </Card>
  );
};
export default withStyles(styles)(KnapsackItemCard);
