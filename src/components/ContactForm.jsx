import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const validationSchema = Yup.object({
  linkedin: Yup.string().url("URL inválida"),
  github: Yup.string().url("URL inválida"),
  twitter: Yup.string().url("URL inválida"),
  facebook: Yup.string().url("URL inválida"),
  instagram: Yup.string().url("URL inválida"),
});

const ContactForm = ({ onNext, initialData }) => {
  const initialValues = {
    linkedin: initialData?.socials?.linkedin || "",
    github: initialData?.socials?.github || "",
    twitter: initialData?.socials?.twitter || "",
    facebook: initialData?.socials?.facebook || "",
    instagram: initialData?.socials?.instagram || "",
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Redes de Contacto</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const completeData = {
            // Mantenemos todos los datos anteriores (name, profession, email, phone, location, education, etc.)
            ...initialData,
            // Actualizamos solo el objeto socials
            socials: {
              linkedin: values.linkedin,
              github: values.github,
              twitter: values.twitter,
              facebook: values.facebook,
              instagram: values.instagram
            }
          };

          onNext(completeData); // ✅ Ahora sí mandamos todo el portafolio completo
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {[
              { name: "linkedin", icon: <FaLinkedin className="text-blue-600" /> },
              { name: "github", icon: <FaGithub className="text-gray-800" /> },
              { name: "twitter", icon: <FaTwitter className="text-blue-400" /> },
              { name: "facebook", icon: <FaFacebook className="text-blue-800" /> },
              { name: "instagram", icon: <FaInstagram className="text-pink-600" /> },
            ].map(({ name, icon }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2 capitalize mb-1">
                  {icon} {name}
                </label>
                <Field
                  type="url"
                  name={name}
                  placeholder={`https://${name}.com/usuario`}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                />
                <ErrorMessage
                  name={name}
                  component="p"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            ))}

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
              >
                {isSubmitting ? "Guardando..." : "Guardar y Finalizar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
