import React from "react";
import { BinaryIndividual } from "genetics-js";
import Population from "genetics-js/lib/lib/population/Population";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  WithStyles,
  withStyles,
  Theme
} from "@material-ui/core";
import "./PopulationRenderer.css";

const styles = (theme: Theme) => ({
  title: {
    padding: theme.spacing(1)
  },
  container: {
    width: "100%",
    margin: theme.spacing(1)
  },
  listStyles: {
    display: "flex"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    border: `1px solid ${theme.palette.divider}`
  }
});

export interface PopulationProps extends WithStyles<typeof styles> {
  population: Population<BinaryIndividual, boolean>;
}

const PopulationRenderer = (props: PopulationProps) => {
  return (
    <Paper className={props.classes.container}>
      <Typography color="primary" className={props.classes.title} variant="h5">
        Population
      </Typography>
      <Divider />
      <div>
        <List className="population-list" dense>
          {props.population.getPopulationItems().map((item, key) => (
            <ListItem key={key}>
              <ListItemText
                className={props.classes.item}
                primary={item.individual.toString()}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(PopulationRenderer);
