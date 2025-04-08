import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const profileId = "67f2005a56202f2256f17212";

const validationSchema = Yup.object({
  linkedin: Yup.string().url("URL inválida"),
  github: Yup.string().url("URL inválida"),
  twitter: Yup.string().url("URL inválida"),
  facebook: Yup.string().url("URL inválida"),
  instagram: Yup.string().url("URL inválida"),
});

const ContactForm = () => {
  const [initialValues, setInitialValues] = useState({
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  const [socials, setSocials] = useState(null);

  const fetchSocials = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
      if (res.data.socials) {
        setInitialValues(res.data.socials);
        setSocials(res.data.socials);
      }
    } catch (err) {
      console.error("❌ Error al cargar redes sociales:", err);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/profile/${profileId}/socials`, values);
      setSocials(res.data.socials);
    } catch (error) {
      console.error("❌ Error al guardar redes sociales:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Redes de Contacto</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {[
              { name: "linkedin", icon: <FaLinkedin /> },
              { name: "github", icon: <FaGithub /> },
              { name: "twitter", icon: <FaTwitter /> },
              { name: "facebook", icon: <FaFacebook /> },
              { name: "instagram", icon: <FaInstagram /> },
            ].map(({ name, icon }) => (
              <div key={name}>
                <label className="flex items-center gap-2 capitalize">
                  {icon} {name}
                </label>
                <Field
                  type="url"
                  name={name}
                  placeholder={`https://${name}.com/usuario`}
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar Redes Sociales
            </button>
          </Form>
        )}
      </Formik>

      {socials && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Enlaces Guardados:</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(socials).map(([key, value]) =>
              value ? (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline capitalize"
                >
                  {key}
                </a>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
