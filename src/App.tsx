import React from "react";

import {
  WithStyles,
  withStyles,
  Theme,
  Paper,
  Fab,
  Typography,
  createMuiTheme,
  CssBaseline
} from "@material-ui/core";
import "./App.css";

import {
  KnapsackParameters,
  defaultKnapsackParameters
} from "./params/KnapsackParams";

import {
  KnapsackItem,
  getRandomItems,
  NUMBER_OF_ITEMS_BOUNDS
} from "./params/KnapsackItem";

import {
  AlgorithmParameters,
  defaultAlgorithmParameters
} from "./params/AlgorithmParams";

import KnapsackForm from "./knapsack/KnapsackForm";
import AlgorithmParametersForm from "./algorithm/AlgorithmParametersForm";
import AlgorithmExecution from "./algorithm-execution/AlgorithmExecution";
import Logo from "./images/logo-letters.png";
import { ThemeProvider } from "@material-ui/styles";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#356759",
      light: "#F2F5DF",
      dark: "#38966F"
    },
    secondary: {
      main: "#F15324"
    },
    background: {
      default: "#DEF3E5",
      paper: "#FEFBE6"
    },
    divider: "#38966F"
  }
});

const styles = (theme: Theme) => ({
  logoContainer: {
    margin: "auto"
  },
  logo: {
    display: "block",
    margin: "auto",
    width: 300
  },
  logoTitle: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  container: {
    maxWidth: 1000,
    margin: "auto"
  },
  knapsackFormContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(3)
  },
  actionButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
    padding: theme.spacing(1)
  }
});

interface State {
  knapsackParams: KnapsackParameters;
  items: KnapsackItem[];
  algorithmParams: AlgorithmParameters;
  algorithmIsExecuting: boolean;
}

class App extends React.Component<WithStyles<typeof styles>, State> {
  getDefaultState = () => ({
    knapsackParams: defaultKnapsackParameters,
    items: getRandomItems(),
    algorithmParams: defaultAlgorithmParameters,
    algorithmIsExecuting: false
  });

  state = this.getDefaultState();

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

  onKnapsackParamsChange = (knapsackParams: KnapsackParameters) =>
    this.setState({ knapsackParams });

  isAddItemDisabled = () =>
    this.state.items.length >= NUMBER_OF_ITEMS_BOUNDS.max;

  isDeleteItemDisabled = () =>
    this.state.items.length <= NUMBER_OF_ITEMS_BOUNDS.min;

  onAlgorithmParamsChange = (algorithmParams: AlgorithmParameters) => {
    console.log(algorithmParams);
    this.setState({ algorithmParams });
  };

  onExecuteAlgorithmPlay = () => {
    const { algorithmIsExecuting } = this.state;
    if (algorithmIsExecuting) {
      this.setState(state => this.getDefaultState());
    } else {
      this.setState({ algorithmIsExecuting: true });
    }
  };

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <div className={this.props.classes.container}>
          <Paper className={this.props.classes.title}>
            <div className={this.props.classes.logoContainer}>
              <img
                className={this.props.classes.logo}
                src={Logo}
                alt="geneticsjs"
              />
            </div>
            <div className={this.props.classes.logoTitle}>
              <Typography variant="h6" color="primary">
                Knapsack problem simulator with genetic algorithms
              </Typography>
            </div>
          </Paper>
          {!this.state.algorithmIsExecuting && (
            <React.Fragment>
              <KnapsackForm
                items={this.state.items}
                knapsackParams={this.state.knapsackParams}
                addDisabled={this.isAddItemDisabled()}
                deleteDisabled={this.isDeleteItemDisabled()}
                onAddItem={this.onAddKnapsackItem}
                onDeleteItem={this.onDeleteKnapsackItem}
                onKnapsackParamsChange={this.onKnapsackParamsChange}
              />
              <AlgorithmParametersForm
                numberOfItems={this.state.items.length}
                algorithmParams={this.state.algorithmParams}
                onSubmit={this.onAlgorithmParamsChange}
              />
            </React.Fragment>
          )}
          {this.state.algorithmIsExecuting && (
            <AlgorithmExecution
              knapsackParams={this.state.knapsackParams}
              algorithmParams={this.state.algorithmParams}
              items={this.state.items}
            />
          )}
          <Paper className={this.props.classes.actionButtonContainer}>
            <Fab
              variant="extended"
              color={this.state.algorithmIsExecuting ? "secondary" : "primary"}
              onClick={this.onExecuteAlgorithmPlay}
            >
              {this.state.algorithmIsExecuting ? "Reset" : "execute algorithm"}
            </Fab>
          </Paper>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
