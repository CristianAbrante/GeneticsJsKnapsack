import React from "react";

import {
  KnapsackItem,
  KnapsackItemValidation,
  DefaultKnapsackItem
} from "../params/KnapsackItem";
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
  addDisabled?: boolean;
  onSubmit: (item: KnapsackItem) => any;
}

const KnapsackItemForm: React.FC<KnapsackItemFormProps> = props => (
  <Formik<KnapsackItem>
    initialValues={DefaultKnapsackItem}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      props.onSubmit(values);
    }}
    validationSchema={KnapsackItemValidation}
    render={() => (
      <Form className={props.classes.form}>
        <Field
          className={props.classes.field}
          name="weight"
          label="weight"
          type="number"
          component={TextField}
          disabled={props.addDisabled}
          variant="outlined"
        />
        <Field
          className={props.classes.field}
          name="value"
          label="value"
          type="number"
          component={TextField}
          disabled={props.addDisabled}
          variant="outlined"
        />
        <Fab
          type="submit"
          color="primary"
          variant="extended"
          disabled={props.addDisabled}
        >
          Add Item
        </Fab>
      </Form>
    )}
  />
);

KnapsackItemForm.defaultProps = {
  addDisabled: false
};

export default withStyles(styles)(KnapsackItemForm);
