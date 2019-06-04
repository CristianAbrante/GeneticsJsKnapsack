import React from "react";

import { KnapsackItem } from "./params/KnapsackItem";
import EvolutionaryAlgorithm from "genetics-js/lib/lib/algorithms/EvolutionaryAlgorithm";
import {
  BinaryIndividual,
  OnePointCrossoverParams,
  BitwiseMutationParams
} from "genetics-js";
import { BinaryGeneratorParams } from "genetics-js/lib/lib/generator/binary/BinaryGenerator";
import { FitnessProportionalSelectionParams } from "genetics-js/lib/lib/selection/base/FitnessProportionalSelection";

export interface AlgorithmResultProps {
  items: KnapsackItem[];
  algorithm: EvolutionaryAlgorithm<
    BinaryIndividual,
    boolean,
    BinaryGeneratorParams,
    FitnessProportionalSelectionParams<BinaryIndividual, boolean>,
    OnePointCrossoverParams<BinaryIndividual, boolean>,
    BitwiseMutationParams
  >;
}

const getItem = (props: AlgorithmResultProps) => {
  let item = props.algorithm.population.getFittestIndividualItem();
  return item ? item.individual.toString() : "no individual";
};

const AlgorithmResult = (props: AlgorithmResultProps) => {
  return (
    <div>
      <div>{props.algorithm.population.populationStatistics.averageAge}</div>
      <div>
        {props.algorithm.population.populationStatistics.averageFitness}
      </div>
      <div>{props.algorithm.population.populationStatistics.fitnessSum}</div>
      {props.algorithm.population.getPopulationItems().map((item, key) => (
        <div key={key}>{item.individual.toString()}</div>
      ))}
      <div style={{ background: "red" }}>{getItem(props)}</div>
    </div>
  );
};

export default AlgorithmResult;
