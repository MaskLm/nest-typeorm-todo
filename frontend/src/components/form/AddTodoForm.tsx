import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DoAddTodo } from "../../api/DoAddTodo";
import { useNavigate } from "react-router-dom";

export const AddTodoForm: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      deadline: Yup.date().nullable(),
    }),
    onSubmit: async (values) => {
      try {
        await DoAddTodo(values);
        alert("添加成功");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title ? <div>{formik.errors.title}</div> : null}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description ? <div>{formik.errors.description}</div> : null}
      </div>
      <div>
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          name="deadline"
          type="datetime-local"
          onChange={formik.handleChange}
          value={formik.values.deadline}
        />
        {formik.errors.deadline ? <div>{formik.errors.deadline}</div> : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
