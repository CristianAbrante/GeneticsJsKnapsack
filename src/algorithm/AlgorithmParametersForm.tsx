import React from "react";

import {
  AlgorithmParameters,
  getAlgorithmParametersValidation
} from "../params/AlgorithmParams";
import {
  Paper,
  Fab,
  Theme,
  WithStyles,
  withStyles,
  OutlinedInput,
  createStyles,
  Typography,
  Divider
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";

const styles = (theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(2)
    },
    formContainer: {
      maxWidth: 400,
      margin: "auto",
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    formItem: {
      margin: theme.spacing(1)
    }
  });

export interface AlgorithmParametersFormProps
  extends WithStyles<typeof styles> {
  numberOfItems: number;
  algorithmParams: AlgorithmParameters;
  onSubmit: (algorithmParams: AlgorithmParameters) => void;
}

const AlgorithmParametersForm = (props: AlgorithmParametersFormProps) => {
  return (
    <Paper>
      <div className={props.classes.title}>
        <Typography color="primary" variant="h5">
          Algorithm parameters
        </Typography>
      </div>
      <Divider />
      <Formik<AlgorithmParameters>
        validationSchema={getAlgorithmParametersValidation(props.numberOfItems)}
        initialValues={props.algorithmParams}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          props.onSubmit(values);
        }}
        render={({ values }) => (
          <Form className={props.classes.formContainer}>
            <Field
              className={props.classes.formItem}
              name="populationSize"
              label="Population size"
              variant="outlined"
              type="number"
              fullWidth
              component={TextField}
            />
            <Field
              className={props.classes.formItem}
              variant="outlined"
              name="crossoverType"
              component={Select}
              fullWidth
              input={
                <OutlinedInput
                  name="Select crossover method"
                  labelWidth={300}
                />
              }
              native
            >
              <option value="nPoints">N points crossover</option>
              <option value="onePoint">One point crossover</option>
              <option value="uniform">Unifrom crossover</option>
            </Field>
            {values.crossoverType === "nPoints" && (
              <Field
                className={props.classes.formItem}
                name="crossoverParams.numberOfCrossoverPoints"
                label="Number of crossover points"
                variant="outlined"
                type="number"
                fullWidth
                component={TextField}
              />
            )}
            {values.crossoverType === "uniform" && (
              <Field
                className={props.classes.formItem}
                name="crossoverParams.selectionThreshold"
                label="selection threshold"
                variant="outlined"
                type="number"
                fullWidth
                component={TextField}
              />
            )}
            <Field
              className={props.classes.formItem}
              variant="outlined"
              name="selectionType"
              component={Select}
              fullWidth
              input={
                <OutlinedInput name="Select mutation method" labelWidth={300} />
              }
              native
            >
              <option value="rouletteWheel">Roulette Wheel</option>
              <option value="stochastic">Stochastic universal sampling</option>
            </Field>
            <Field
              className={props.classes.formItem}
              variant="outlined"
              name="resamplingType"
              component={Select}
              fullWidth
              input={
                <OutlinedInput
                  name="Select resampling method"
                  labelWidth={300}
                />
              }
              native
            >
              <option value="ageBased">Age based resampling</option>
              <option value="fitnessBased">Fitness based resampling</option>
            </Field>
            <Field
              className={props.classes.formItem}
              name="mutation.mutationRate"
              label="Mutation rate"
              variant="outlined"
              type="number"
              fullWidth
              component={TextField}
            />
            <Field
              className={props.classes.formItem}
              name="numberOfGenerations"
              label="Number of generations"
              variant="outlined"
              type="number"
              fullWidth
              component={TextField}
            />
            <Fab variant="extended" color="primary" type="submit">
              set algorithm params
            </Fab>
          </Form>
        )}
      />
    </Paper>
  );
};

export default withStyles(styles)(AlgorithmParametersForm);
