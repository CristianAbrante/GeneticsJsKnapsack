import React from "react";
import { KnapsackParameters } from "../params/KnapsackParams";
import { AlgorithmParameters } from "../params/AlgorithmParams";
import { KnapsackItem, NUMBER_OF_DEFAULT_ITEMS } from "../params/KnapsackItem";
import EvolutionaryAlgorithm, {
  EvolutionaryAlgorithmParams
} from "genetics-js/lib/lib/algorithms/EvolutionaryAlgorithm";
import {
  BinaryIndividual,
  BitwiseMutationParams,
  OnePointCrossover,
  BitwiseMutation,
  NPointsCrossover,
  UniformCrossover
} from "genetics-js";
import BinaryGenerator, {
  BinaryGeneratorParams
} from "genetics-js/lib/lib/generator/binary/BinaryGenerator";
import FitnessProportionalSelection, {
  FitnessProportionalSelectionParams
} from "genetics-js/lib/lib/selection/base/FitnessProportionalSelection";
import Generator from "genetics-js/lib/lib/generator/utils/Generator";
import StochasticUniversalSampling from "genetics-js/lib/lib/selection/implementation/StochasticUniversalSamplingSe";
import RouletteWheel from "genetics-js/lib/lib/selection/implementation/RouletteWheel";
import FitnessBased from "genetics-js/lib/lib/selection/replacement/FitnessBased";
import AgeBased from "genetics-js/lib/lib/selection/replacement/AgeBased";
import MaxGenerations from "genetics-js/lib/lib/termination/MaxGenerations";
import FitnessFunction from "genetics-js/lib/lib/fitness/FitnessFunction";
import Population from "genetics-js/lib/lib/population/Population";
import AlgorithmStatistics from "./AlgorithmStatistics";
import PopulationRenderer from "./PopulationRenderer";
import { Theme, WithStyles, withStyles } from "@material-ui/core";
import FittestIndividual from "./FittestIndividual";
import AlgorithmExecutionButtons from "./AlgorithmExecutionButtons";
import { nativeMath } from "random-js";

const styles = (theme: Theme) => ({
  infoContainer: {
    display: "flex",
    justifyContent: "space-around"
  }
});

export interface AlgorithmExecutionProps extends WithStyles<typeof styles> {
  knapsackParams: KnapsackParameters;
  algorithmParams: AlgorithmParameters;
  items: KnapsackItem[];
}

interface State {
  algorithmIsRunning: boolean;
  algorithm: EvolutionaryAlgorithm<
    BinaryIndividual,
    boolean,
    BinaryGeneratorParams,
    any,
    any,
    BitwiseMutationParams
  >;
}

class AlgorithmExecution extends React.Component<
  AlgorithmExecutionProps,
  State
> {
  timer: any;
  algorithm: EvolutionaryAlgorithm<
    BinaryIndividual,
    boolean,
    BinaryGeneratorParams,
    any,
    any,
    BitwiseMutationParams
  >;

  constructor(props: AlgorithmExecutionProps) {
    super(props);
    const params = this.constructParams(props);
    this.algorithm = new EvolutionaryAlgorithm<
      BinaryIndividual,
      boolean,
      BinaryGeneratorParams,
      any,
      any,
      BitwiseMutationParams
    >(params);
    this.state = {
      algorithmIsRunning: false,
      algorithm: new EvolutionaryAlgorithm<
        BinaryIndividual,
        boolean,
        BinaryGeneratorParams,
        any,
        any,
        BitwiseMutationParams
      >(params)
    };
  }

  fitnessFunction: FitnessFunction<BinaryIndividual, boolean> = individual => {
    let weight = 0.0;
    let value = 0.0;
    individual.forEach((gene, index) => {
      if (gene) {
        const item = this.props.items[index!];
        weight += item.weight;
        value += item.value;
      }
    });
    if (weight <= this.props.knapsackParams.capacity) {
      return value;
    } else {
      return 0.0;
    }
  };

  constructParams = (props: AlgorithmExecutionProps) => {
    const { populationSize } = props.algorithmParams;

    let crossover: any;
    let crossoverParams: any;
    const {
      numberOfCrossoverPoints,
      selectionThreshold
    } = props.algorithmParams.crossoverParams;
    switch (props.algorithmParams.crossoverType) {
      case "onePoint": {
        crossover = new OnePointCrossover();
        crossoverParams = {
          engine: nativeMath,
          individualConstructor: BinaryIndividual
        };
        break;
      }
      case "nPoints": {
        crossover = new NPointsCrossover();
        crossoverParams = {
          engine: nativeMath,
          individualConstructor: BinaryIndividual,
          numberOfCrossoverPoints
        };
        break;
      }
      case "uniform": {
        crossover = new UniformCrossover();
        crossoverParams = {
          engine: nativeMath,
          individualConstructor: BinaryIndividual,
          selectionThreshold
        };
        break;
      }
    }
    const params: EvolutionaryAlgorithmParams<
      BinaryIndividual,
      boolean,
      BinaryGeneratorParams,
      FitnessProportionalSelectionParams<BinaryIndividual, boolean>,
      any,
      BitwiseMutationParams
    > = {
      populationSize,
      generator: new BinaryGenerator(),
      generatorParams: {
        chance: 0.3,
        engine: nativeMath,
        length: props.items.length
      },
      selection: new FitnessProportionalSelection(),
      selectionParams: {
        engine: nativeMath,
        selectionCount: populationSize,
        subSelection:
          props.algorithmParams.selectionType === "rouletteWheel"
            ? new RouletteWheel()
            : new StochasticUniversalSampling()
      },
      crossover,
      crossoverParams,
      mutation: new BitwiseMutation(),
      mutationParams: {
        engine: nativeMath,
        mutationRate: props.algorithmParams.mutation.mutationRate
      },
      replacement:
        props.algorithmParams.resamplingType === "fitnessBased"
          ? new FitnessBased()
          : new AgeBased(),
      replacementParams: {
        selectionCount: populationSize
      },
      fitnessFunction: this.fitnessFunction,
      terminationCondition: new MaxGenerations(
        props.algorithmParams.numberOfGenerations
      )
    };
    return params;
  };

  getItem = (population: Population<BinaryIndividual, boolean>) => {
    let item = population.getFittestIndividualItem();
    return item ? item.individual.toString() : "no individual";
  };

  nextGeneration = () => {
    this.algorithm.nextGeneration();
    this.setState({ algorithm: this.algorithm });
  };

  onRunClick = () => {
    if (this.state.algorithmIsRunning) {
      clearInterval(this.timer);
      this.setState({ algorithmIsRunning: false });
    } else {
      this.timer = setInterval(this.nextGeneration, 50);
      this.setState({ algorithmIsRunning: true });
    }
  };

  render() {
    const { population } = this.state.algorithm;
    return (
      <div>
        <div className={this.props.classes.infoContainer}>
          <AlgorithmStatistics algorithm={this.state.algorithm} />
          <PopulationRenderer population={population} />
        </div>
        <FittestIndividual
          items={this.props.items}
          fittestIndividual={population.getFittestIndividualItem()!.individual}
        />
        <div>
          <AlgorithmExecutionButtons
            onRunClick={this.onRunClick}
            onNextGenerationClick={this.nextGeneration}
            nextGenerationDisabled={this.state.algorithmIsRunning}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AlgorithmExecution);
