import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";
import axios from "axios";

const TutorialTour = ({ profileId }) => {
  const [run, setRun] = useState(false);
  const [steps] = useState([
    {
      target: ".create-portfolio-container",
      content: "Aquí podés crear tu portafolio ingresando tu información personal.",
    },
    {
      target: ".navbar",
      content: "Este es el menú de navegación para moverte entre secciones.",
    },
    {
      target: ".profile-list",
      content: "Aquí podés ver todos los perfiles creados en la aplicación.",
    },
    {
      target: ".create-button",
      content: "Este botón te lleva al formulario para comenzar tu portafolio.",
    },
  ]);

  useEffect(() => {
    const checkTutorial = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${profileId}`);
        if (!res.data.hasSeenTutorial) {
          setRun(true);
        }
      } catch (err) {
        console.error("Error al verificar tutorial:", err);
      }
    };

    checkTutorial();
  }, [profileId]);

  const handleTourEnd = async () => {
    setRun(false);
    try {
      await axios.put(`http://localhost:5000/api/profile/${profileId}/tutorial`, {
        hasSeenTutorial: true,
      });
    } catch (err) {
      console.error("Error al guardar estado del tutorial:", err);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={(data) => {
        if (data.status === "finished" || data.status === "skipped") {
          handleTourEnd();
        }
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default TutorialTour;
