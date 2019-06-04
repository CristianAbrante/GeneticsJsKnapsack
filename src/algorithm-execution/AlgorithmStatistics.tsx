import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
  WithStyles,
  withStyles,
  Theme
} from "@material-ui/core";
import EvolutionaryAlgorithm from "genetics-js/lib/lib/algorithms/EvolutionaryAlgorithm";
import { BinaryIndividual, BitwiseMutationParams } from "genetics-js";
import { BinaryGeneratorParams } from "genetics-js/lib/lib/generator/binary/BinaryGenerator";

const styles = (theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  },
  container: {
    width: "100%",
    margin: theme.spacing(1)
  }
});

export interface AlgorithmStatisticsProps extends WithStyles<typeof styles> {
  algorithm: EvolutionaryAlgorithm<
    BinaryIndividual,
    boolean,
    BinaryGeneratorParams,
    any,
    any,
    BitwiseMutationParams
  >;
}

const AlgorithmStatistics = (props: AlgorithmStatisticsProps) => {
  const { population } = props.algorithm;
  const {
    averageAge,
    averageFitness,
    fittestIndividualIndex
  } = population.populationStatistics;
  return (
    <Paper className={props.classes.container}>
      <Typography color="primary" className={props.classes.title} variant="h5">
        Statistics
      </Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Statistical item</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Number of generations</TableCell>
            <TableCell>{props.algorithm.generations}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Average age</TableCell>
            <TableCell>{averageAge}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Average fitness</TableCell>
            <TableCell>{averageFitness}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fittest individual index</TableCell>
            <TableCell>{fittestIndividualIndex}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(AlgorithmStatistics);
