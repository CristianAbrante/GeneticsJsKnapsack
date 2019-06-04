import { BinaryIndividual } from "genetics-js";
import { KnapsackItem } from "../params/KnapsackItem";

export function knapsackCalculator(
  individual: BinaryIndividual,
  items: KnapsackItem[]
) {
  let value = 0.0;
  let weight = 0.0;
  individual.forEach((gene, index) => {
    if (gene) {
      const item = items[index!];
      value += item.value;
      weight += item.weight;
    }
  });
  return { value, weight };
}
