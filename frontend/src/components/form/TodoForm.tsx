import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { DoUpdateTodo } from "../../api/DoUpdateTodo";

interface TodoFormProps {
  initialValues: TodoFormValues;
}

interface TodoFormValues {
  id: number;
  title: string;
  description: string;
  deadline: string;
  done: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  deadline: Yup.date().nullable(),
});
const TodoForm: React.FC<TodoFormProps> = ({ initialValues }) => {
  const handleSubmit = async (values: TodoFormValues) => {
    try {
      await DoUpdateTodo(values);
      alert("Change Success");
      setTimeout(() => {
        window.location.reload();
        }, 1000);
    } catch (error) {
      alert (error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps: FormikProps<TodoFormValues>) => {
        useEffect(() => {
          formikProps.resetForm({ values: initialValues });
        }, [initialValues]);

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

export default TodoForm;
