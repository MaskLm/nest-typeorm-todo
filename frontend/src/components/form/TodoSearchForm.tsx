import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";

interface TodoFormProps {
  initialValues: TodoFormValues;
  onFormSubmit: (todo: TodoFormValues) => void;
  searching: (searching: boolean) => void;
}

interface TodoFormValues {
  title: string;
  description: string;
  deadline: string;
  done: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().nullable(),
  description: Yup.string().nullable(),
  deadline: Yup.date().nullable(),
});
const TodoSearchForm: React.FC<TodoFormProps> = (props) => {
  const handleSubmit = async (values: TodoFormValues) => {
    try {
      props.onFormSubmit(values);
      props.searching(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        deadline: "",
        done: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps: FormikProps<TodoFormValues>) => {
        useEffect(() => {
          formikProps.resetForm({});
        }, []);

        return (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" />
              <ErrorMessage name="title" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" as="textarea" />
              <ErrorMessage name="description" />
            </div>
            <div>
              <label htmlFor="deadline">Deadline</label>
              <Field name="deadline" type="datetime-local" />
              <ErrorMessage name="deadline" />
            </div>
            <div>
              <label htmlFor="done">Done</label>
              <Field name="done" type="checkbox" />
              <ErrorMessage name="done" />
            </div>
            <button type="submit" disabled={formikProps.isSubmitting}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TodoSearchForm;
