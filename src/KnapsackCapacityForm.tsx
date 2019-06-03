import React from "react";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import { TextField } from "formik-material-ui";
import { Fab, Theme, WithStyles, withStyles } from "@material-ui/core";
import * as yup from "yup";

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
  capacity: number;
  onSubmit: (capacity: number) => any;
}

const capacityValidationSchema = yup.object().shape({
  capacity: yup.number().min(0, "capacity must be positive")
});

const KnapsackCapacityForm = (props: KnapsackCapacityFormProps) => (
  <Formik<{ capacity: number }>
    initialValues={{ capacity: props.capacity }}
    validationSchema={capacityValidationSchema}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      props.onSubmit(values.capacity);
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

export default withStyles(styles)(KnapsackCapacityForm);
