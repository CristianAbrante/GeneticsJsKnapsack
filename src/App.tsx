import React from "react";

import {
  Paper,
  WithStyles,
  withStyles,
  Typography,
  Divider
} from "@material-ui/core";
import "./App.css";
import KnapsackItemForm from "./KnapsackItemForm";
import KnapsackItemCard from "./KnapsackItemCard";
import Generator from "genetics-js/lib/lib/generator/utils/Generator";
import { NumericRange } from "genetics-js/lib/lib/individual/numeric/base";

const styles = {
  title: {
    margin: 10
  },
  container: {
    maxWidth: 1000,
    margin: "auto"
  }
};

export interface KnapsackItem {
  value: number;
  weight: number;
}

interface State {
  maxWeight: number;
  items: KnapsackItem[];
}

class App extends React.Component<WithStyles<typeof styles>, State> {
  readonly MAX_ITEMS = 15;
  readonly NUMBER_OF_INITIAL_ITEMS = 14;
  readonly INITIAL_CAPACITY = 20.0;
  readonly INITIAL_MAX_VALUE = 100;

  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      maxWeight: this.INITIAL_CAPACITY,
      items: this.createRandomItems()
    };
  }

  createRandomItems = (): KnapsackItem[] => {
    const randomItems: KnapsackItem[] = [];
    for (let i = 0; i < this.NUMBER_OF_INITIAL_ITEMS; i++) {
      randomItems.push({
        value: Generator.generateFloating(
          new NumericRange(0.0, this.INITIAL_MAX_VALUE)
        ),
        weight: Generator.generateFloating(
          new NumericRange(0.0, this.INITIAL_CAPACITY)
        )
      });
    }
    return randomItems;
  };

  onAddKnapsackItem = (item: KnapsackItem) => {
    this.setState(state => {
      const items = state.items.concat(item);
      return { items };
    });
  };

  onDeleteKnapsackItem = (index: number) => {
    this.setState(state => {
      const items = state.items.filter((_, itemsIndex) => index !== itemsIndex);
      return { items };
    });
  };

  isItemDisabled = () => this.state.items.length >= this.MAX_ITEMS;

  render() {
    return (
      <div className={this.props.classes.container}>
        <Paper>
          <Typography className={this.props.classes.title} variant="h6">
            Knapsack Items
          </Typography>
          <Divider />
          <div className="items-container">
            {this.state.items.map((item, key) => (
              <KnapsackItemCard
                key={key}
                index={key}
                item={item}
                onDeleteItem={this.onDeleteKnapsackItem}
              />
            ))}
          </div>
        </Paper>
        <Paper>
          <KnapsackItemForm
            onSubmit={this.onAddKnapsackItem}
            isDisabled={this.isItemDisabled()}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
