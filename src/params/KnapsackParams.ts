import * as yup from "yup";

export const DEFAULT_CAPACITY = 20.0;

export const KnapsackParametersValidation = yup.object().shape({
  capacity: yup.number().min(0, "capacity must be positive")
});

export interface KnapsackParameters {
  capacity: number;
}

export const defaultKnapsackParameters: KnapsackParameters = {
  capacity: DEFAULT_CAPACITY
};
