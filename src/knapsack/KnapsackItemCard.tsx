import React from "react";

import {
  Card,
  Typography,
  WithStyles,
  withStyles,
  Fab,
  Theme
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { KnapsackItem } from "../params/KnapsackItem";

const styles = (theme: Theme) => ({
  selected: {
    background: `${theme.palette.primary.dark} !important`,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  card: {
    background: theme.palette.primary.light,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  item: {
    marginRight: 5
  }
});

export interface KnapsackItemCardProps extends WithStyles<typeof styles> {
  index: number;
  item: KnapsackItem;
  deleteDisabled?: boolean;
  selected?: boolean;
  onDeleteItem?: (index: number) => any;
}

const renderDeleteButton = (props: KnapsackItemCardProps) => {
  if (props.onDeleteItem !== undefined) {
    return (
      <Fab
        onClick={() => {
          if (props.onDeleteItem) {
            props.onDeleteItem(props.index);
          }
        }}
        disabled={props.deleteDisabled}
        size="small"
        color="secondary"
      >
        <DeleteIcon />
      </Fab>
    );
  }
};

const KnapsackItemCard: React.FC<KnapsackItemCardProps> = props => {
  const numberOfDecimals = 2;
  return (
    <Card
      className={`${props.classes.card} ${
        props.selected ? props.classes.selected : ""
      }`}
    >
      <div>
        <Typography
          className={props.classes.item}
          variant="overline"
        >{`weight: ${props.item.weight.toFixed(numberOfDecimals)}`}</Typography>
        <Typography variant="overline">{`value: ${props.item.value.toFixed(
          numberOfDecimals
        )}`}</Typography>
      </div>
      {props.onDeleteItem && renderDeleteButton(props)}
    </Card>
  );
};

KnapsackItemCard.defaultProps = {
  deleteDisabled: false,
  selected: false
};

export default withStyles(styles)(KnapsackItemCard);
