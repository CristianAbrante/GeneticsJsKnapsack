import React from "react";
import { KnapsackItem } from "../params/KnapsackItem";
import { BinaryIndividual } from "genetics-js";
import {
  Paper,
  Theme,
  WithStyles,
  withStyles,
  Typography,
  Divider
} from "@material-ui/core";
import KnapsackItemsList from "../knapsack/KnapsackItemsList";
import { knapsackCalculator } from "../utils/knapsackCalculator";

const styles = (theme: Theme) => ({
  individualContainer: {
    paddingTop: theme.spacing(2)
  },
  individual: {
    display: "flex",
    justifyContent: "center"
  },
  individualGene: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2)
  },
  individualInfoContainer: {
    display: "flex",
    justifyContent: "center",
    "& *": {
      margin: theme.spacing(1)
    }
  }
});

export interface FittestIndividualProps extends WithStyles<typeof styles> {
  items: KnapsackItem[];
  fittestIndividual: BinaryIndividual;
}

const FittestIndividual = (props: FittestIndividualProps) => {
  const fittest = knapsackCalculator(props.fittestIndividual, props.items);
  return (
    <Paper>
      <div className={props.classes.individualContainer}>
        <div className={props.classes.individual}>
          {props.fittestIndividual.genotype.map((gene, index) => (
            <div className={props.classes.individualGene} key={index}>
              {gene ? "1" : "0"}
            </div>
          ))}
        </div>
        <div className={props.classes.individualInfoContainer}>
          <Typography variant="h6">{`Weight: ${fittest.weight.toFixed(
            4
          )}`}</Typography>
          <Typography variant="h6">{`Value: ${fittest.value.toFixed(
            4
          )}`}</Typography>
        </div>
      </div>
      <Divider />
      <div>
        <KnapsackItemsList
          individual={props.fittestIndividual}
          items={props.items}
        />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(FittestIndividual);
