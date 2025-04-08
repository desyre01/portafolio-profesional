import React, { useEffect, useState } from "react";
import { TourProvider, useTour } from "@reactour/tour";
import axios from "axios";

const steps = [
  {
    selector: ".personal-info-step",
    content: "Aquí ingresás tus datos personales, como nombre, correo y profesión.",
  },
  {
    selector: ".education-step",
    content: "En esta sección añadís tu formación académica.",
  },
  {
    selector: ".experience-step",
    content: "Aquí podés agregar tu experiencia laboral previa.",
  },
  {
    selector: ".projects-step",
    content: "Agregá proyectos en los que has trabajado.",
  },
  {
    selector: ".skills-step",
    content: "Indicá tus habilidades técnicas y blandas.",
  },
  {
    selector: ".languages-step",
    content: "Agregá los idiomas que manejás y tu nivel.",
  },
  {
    selector: ".references-step",
    content: "Podés incluir testimonios o referencias de colegas.",
  },
  {
    selector: ".contact-step",
    content: "Añadí tus redes sociales para que puedan contactarte.",
  },
];

const InnerTour = ({ profileId }) => {
  const { setIsOpen, isOpen, setCurrentStep } = useTour();

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenTutorial");

    if (!seen && profileId) {
      setTimeout(() => {
        setIsOpen(true);
        setCurrentStep(0);
      }, 1000);
    }
  }, [profileId, setIsOpen, setCurrentStep]);

  const handleClose = async () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenTutorial", "true");

    if (profileId) {
      try {
        await axios.put(`http://localhost:5000/api/profile/${profileId}/tutorial`, {
          hasSeenTutorial: true,
        });
      } catch (err) {
        console.error("❌ Error al guardar estado del tutorial:", err);
      }
    }
  };

  return null; 
};

const TutorialTour = ({ profileId }) => {
  return (
    <TourProvider
      steps={steps}
      onClickClose={() => {
        localStorage.setItem("hasSeenTutorial", "true");
      }}
      afterClose={() => {
        localStorage.setItem("hasSeenTutorial", "true");
        axios.put(`http://localhost:5000/api/profile/${profileId}/tutorial`, {
          hasSeenTutorial: true,
        }).catch((err) => console.error("❌ Error actualizando tutorial:", err));
      }}
      styles={{
        maskWrapper: (base) => ({ ...base, zIndex: 9999 }),
        popover: (base) => ({
          ...base,
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "350px",
        }),
      }}
    >
      <InnerTour profileId={profileId} />
    </TourProvider>
  );
};

export default TutorialTour;
