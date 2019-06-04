import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Fab, Theme, WithStyles, withStyles } from "@material-ui/core";
import {
  KnapsackParameters,
  KnapsackParametersValidation,
  defaultKnapsackParameters
} from "../params/KnapsackParams";

const styles = (theme: Theme) => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  field: {
    margin: theme.spacing(1)
  }
});

interface KnapsackCapacityFormProps extends WithStyles<typeof styles> {
  params: KnapsackParameters;
  onSubmit: (params: KnapsackParameters) => any;
}

const KnapsackParamsForm = (props: KnapsackCapacityFormProps) => (
  <Formik<KnapsackParameters>
    initialValues={defaultKnapsackParameters}
    validationSchema={KnapsackParametersValidation}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      props.onSubmit(values);
    }}
    render={() => (
      <Form className={props.classes.form}>
        <Field
          className={props.classes.field}
          name="capacity"
          label="capacity"
          variant="outlined"
          type="number"
          component={TextField}
        />
        <Fab type="submit" color="primary" variant="extended">
          Set capacity
        </Fab>
      </Form>
    )}
  />
);

export default withStyles(styles)(KnapsackParamsForm);
