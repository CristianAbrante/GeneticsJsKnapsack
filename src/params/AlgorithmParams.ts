import * as yup from "yup";

export const DEFAULT_POPULATION_SIZE = 25;
export const DEFAULT_SELECTION_THRESHOLD = 0.5;
export const DEFAULT_MUTATION_RATE = 0.5;
export const DEFAULT_NUMBER_OF_CROSSOVER_POINTS = 1;
export const DEFAULT_NUMBER_OF_GENERATIONS = 50;
export const POPULATION_SIZE_BOUNDS = {
  min: 5,
  max: 25
};

export const getAlgorithmParametersValidation = (itemsSize: number) =>
  yup.object().shape({
    populationSize: yup
      .number()
      .integer()
      .min(
        POPULATION_SIZE_BOUNDS.min,
        `population size must be at least ${POPULATION_SIZE_BOUNDS.min}`
      )
      .max(
        POPULATION_SIZE_BOUNDS.max,
        `population size must lower than ${POPULATION_SIZE_BOUNDS.max}`
      ),
    crossoverType: yup
      .string()
      .matches(/onePoint|nPoints|uniform/, "invalid crossover type"),
    selectionType: yup
      .string()
      .matches(/rouletteWheel|stochastic/, "invalid selection type"),
    resamplingType: yup
      .string()
      .matches(/ageBased|fitnessBased/, "invalid resampling type"),
    crossoverParams: yup.object({
      numberOfCrossoverPoints: yup
        .number()
        .min(1, "at least one crossover point is needed")
        .max(itemsSize, "too many crossover points"),
      selectonThreshold: yup
        .number()
        .min(0.0, "must be greater than zero")
        .max(1.0, "must be lower than one")
    }),
    mutation: yup.object().shape({
      mutationRate: yup
        .number()
        .min(0.0, "must be greater than zero")
        .max(1.0, "must be lower than one")
    }),
    numberOfGenerations: yup
      .number()
      .integer()
      .min(0, "invalid number of generations")
  });

export interface AlgorithmParameters {
  populationSize: number;
  crossoverType: "nPoints" | "onePoint" | "uniform";
  selectionType: "rouletteWheel" | "stochastic";
  resamplingType: "ageBased" | "fitnessBased";
  crossoverParams: {
    numberOfCrossoverPoints: number;
    selectionThreshold: number;
  };
  mutation: {
    mutationRate: number;
  };
  numberOfGenerations: number;
}

export const defaultAlgorithmParameters: AlgorithmParameters = {
  populationSize: DEFAULT_POPULATION_SIZE,
  crossoverType: "onePoint",
  selectionType: "rouletteWheel",
  resamplingType: "fitnessBased",
  crossoverParams: {
    numberOfCrossoverPoints: DEFAULT_NUMBER_OF_CROSSOVER_POINTS,
    selectionThreshold: DEFAULT_SELECTION_THRESHOLD
  },
  mutation: {
    mutationRate: DEFAULT_MUTATION_RATE
  },
  numberOfGenerations: DEFAULT_NUMBER_OF_GENERATIONS
};
