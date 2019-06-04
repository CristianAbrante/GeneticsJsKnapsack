import * as yup from "yup";
import Generator from "genetics-js/lib/lib/generator/utils/Generator";
import { NumericRange } from "genetics-js";
import { DEFAULT_CAPACITY } from "./KnapsackParams";

export const NUMBER_OF_DEFAULT_ITEMS = 7;
export const DEFAULT_MAX_VALUE = 100.0;
export const DEFAULT_WEIGHT = 0.0;
export const DEFAULT_VALUE = 0.0;
export const NUMBER_OF_ITEMS_BOUNDS = {
  min: 1,
  max: 10
};

export const DefaultKnapsackItem: KnapsackItem = {
  value: DEFAULT_VALUE,
  weight: DEFAULT_WEIGHT
};

export const KnapsackItemValidation = yup.object().shape({
  weight: yup
    .number()
    .min(0.0, "weight must be positive")
    .default(DEFAULT_WEIGHT),
  value: yup
    .number()
    .min(0.0, "value must be positive")
    .default(DEFAULT_VALUE)
});

export interface KnapsackItem {
  value: number;
  weight: number;
}

export const getRandomItems = (): KnapsackItem[] => {
  // const randomItems: KnapsackItem[] = [];
  // for (let i = 0; i < NUMBER_OF_DEFAULT_ITEMS; i++) {
  //   randomItems.push({
  //     value: Generator.generateFloating(
  //       new NumericRange(0.0, DEFAULT_MAX_VALUE)
  //     ),
  //     weight: Generator.generateFloating(
  //       new NumericRange(0.0, DEFAULT_CAPACITY)
  //     )
  //   });
  // }
  // return randomItems;

  return [
    {
      value: 12.0,
      weight: 4.0
    },
    {
      value: 10.0,
      weight: 6.0
    },
    {
      value: 8.0,
      weight: 5.0
    },
    {
      value: 11.0,
      weight: 7.0
    },
    {
      value: 14.0,
      weight: 3.0
    },
    {
      value: 7.0,
      weight: 1.0
    },
    {
      value: 9.0,
      weight: 6.0
    }
  ];
};
