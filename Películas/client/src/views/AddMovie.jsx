import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SubMenu from "../components/SubMenu";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';
import { useContext } from "react";


const AddMovie = () => {
  const navigate = useNavigate();
    // Obtener el contexto del usuario
    const { user } = useContext(UserContext);

  const initialValues = {
    title: "",
    createdBy: "",
    rating: "",
    initialReview: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { title, createdBy, rating, initialReview } = values;

      // Crear el objeto de película con la estructura adecuada
      const movieData = {
        title,
        reviews: [{
          reviewerName:  user.firstName,
          rating,
          reviewText: initialReview
        }]
      };

      const res = await axios.post("http://localhost:8000/api/movie", movieData);
      console.log(res.data.movie);
      console.log(res);
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "¡Genial!",
        text: "¡Has agregado una nueva película!",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Error al agregar una nueva película",
      });
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título de la película es requerido"),
   
    rating: Yup.number()
      .min(0, "La puntuación mínima es 0")
      .max(10, "La puntuación máxima es 10")
      .required("La puntuación es requerida"),
    initialReview: Yup.string().max(500, "La longitud máxima de la reseña es de 500 caracteres"),
  });

  return (
    <div style={{
      backgroundImage: "linear-gradient(90deg, rgba(192,192,192,0.1), rgba(255,255,255,0.1))",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}>
      <h1 style={{ color: "white", textAlign: "center", padding: "20px 0", margin: 0 }}>Agrega pelicula</h1>
      <SubMenu>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-4">
              <div className="mb-3">
                <label className="form-label">Título de la película: </label>
                <Field
                  type="text"
                  className="form-control"
                  name="title"
                  
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Creado por: </label>
                <Field
                  type="text"
                  className="form-control"
                  name="createdBy"
                  value={`${user.firstName}`} // Concatenar el nombre y apellido del usuario
                />
                <ErrorMessage name="createdBy" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Puntuación: </label>
                <Field
                  type="number"
                  className="form-control"
                  name="rating"
                />
                <ErrorMessage name="rating" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Reseña inicial: </label>
                <Field
                  as="textarea"
                  className="form-control"
                  name="initialReview"
                />
                <ErrorMessage name="initialReview" component="div" className="text-danger" />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Enviar
                </button>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </SubMenu>
    </div>
  );
};

export default AddMovie;
