import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { DoUpdateTodo } from "../../api/DoUpdateTodo";

interface UserFormProps {
  initialValues: UserFormValues;
}

interface UserFormValues {
  id: number;
  username: string;
  password: string;
  email: string;
  admin: boolean;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Title is required"),
  password: Yup.string().required("Description is required"),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  admin: Yup.boolean().nullable(),
});
const TodoForm: React.FC<UserFormProps> = ({ initialValues }) => {
  const handleSubmit = async (values: UserFormValues) => {
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
      {(formikProps: FormikProps<UserFormValues>) => {
        useEffect(() => {
          formikProps.resetForm({ values: initialValues });
        }, [initialValues]);

        return (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="admin">Admin</label>
              <Field name="admin" type="checkbox" />
              <ErrorMessage name="admin" />
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
