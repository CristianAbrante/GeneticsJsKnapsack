import React from "react";

import { KnapsackItem } from "./App";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Fab, Theme, WithStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  field: {
    margin: theme.spacing(1)
  }
});

interface KnapsackItemFormProps extends WithStyles<typeof styles> {
  onSubmit: (item: KnapsackItem) => any;
  isDisabled: boolean;
}

const knapsackItemValidationSchema = yup.object().shape({
  weight: yup.number().min(0, "weight must be positive"),
  value: yup.number().min(0, "value must be positive")
});

const KnapsackItemForm = (props: KnapsackItemFormProps) => (
  <Formik<KnapsackItem>
    initialValues={{ weight: 0, value: 0 }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      props.onSubmit(values);
    }}
    validationSchema={knapsackItemValidationSchema}
    render={() => (
      <Form className={props.classes.form}>
        <Field
          className={props.classes.field}
          name="weight"
          label="weight"
          type="number"
          component={TextField}
          disabled={props.isDisabled}
          variant="outlined"
        />
        <Field
          className={props.classes.field}
          name="value"
          label="value"
          type="number"
          component={TextField}
          disabled={props.isDisabled}
          variant="outlined"
        />
        <Fab
          type="submit"
          color="primary"
          variant="extended"
          disabled={props.isDisabled}
        >
          Add Item
        </Fab>
      </Form>
    )}
  />
);

export default withStyles(styles)(KnapsackItemForm);
