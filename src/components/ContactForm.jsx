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

const ContactForm = ({ onNext }) => {
  const [initialValues, setInitialValues] = useState({
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  const [socials, setSocials] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSocials = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
      if (res.data.socials) {
        setInitialValues(res.data.socials);
        setSocials(res.data.socials);
      }
    } catch (err) {
      console.error("❌ Error al cargar redes sociales:", err);
      setError("Error al cargar las redes sociales. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Redes de Contacto</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          // Guardado manual desde el padre
          try {
            const res = await axios.put(`http://localhost:5000/api/profile/${profileId}/socials`, values);
            setSocials(res.data.socials);
            if (onNext) onNext(values);
          } catch (error) {
            console.error("❌ Error al guardar redes sociales:", error.response?.data || error.message);
            setError("Error al guardar redes sociales. Intenta nuevamente.");
          }
        }}
      >
        {(formik) => {
          window.handleContactNext = async () => {
            const isValid = await formik.validateForm();
            if (Object.keys(isValid).length === 0) {
              formik.handleSubmit();
            }
          };

          return (
            <Form className="space-y-4">
              {[
                { name: "linkedin", icon: <FaLinkedin className="text-blue-600" /> },
                { name: "github", icon: <FaGithub className="text-gray-800" /> },
                { name: "twitter", icon: <FaTwitter className="text-blue-400" /> },
                { name: "facebook", icon: <FaFacebook className="text-blue-800" /> },
                { name: "instagram", icon: <FaInstagram className="text-pink-600" /> },
              ].map(({ name, icon }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2 capitalize mb-1">
                    {icon} {name}
                  </label>
                  <Field
                    type="url"
                    name={name}
                    placeholder={`https://${name}.com/usuario`}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name={name}
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              ))}
            </Form>
          );
        }}
      </Formik>

      {socials && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Enlaces Guardados:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(socials).map(([key, value]) =>
              value ? (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {key === "linkedin" && <FaLinkedin className="text-blue-600" />}
                  {key === "github" && <FaGithub className="text-gray-800" />}
                  {key === "twitter" && <FaTwitter className="text-blue-400" />}
                  {key === "facebook" && <FaFacebook className="text-blue-800" />}
                  {key === "instagram" && <FaInstagram className="text-pink-600" />}
                  <span className="capitalize">{key}</span>
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
