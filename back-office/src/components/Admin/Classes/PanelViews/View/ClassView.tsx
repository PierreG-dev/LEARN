import React, { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/index.ts";
import iconGenerator from "../../../../../utilities/iconGenerator.tsx";
import { User } from "../../../../../types/index.ts";
import moment from "moment";
import UsersTable from "../../../../../utilities/UsersTable/index.tsx";

const ClassView: React.FC = () => {
  const { classId, schoolId } = useParams();
  const [codeCopyAnimation, setCodeCopyAnimation] = useState<boolean>(false);

  // --- Ecole selectionnée
  const selectedSchool = useSelector((state: RootState) =>
    state.data.schools?.find((schoolItem) => schoolItem._id === schoolId)
  );

  // --- Classe sélectionnée
  const selectedClass = selectedSchool?.classes.find(
    (classItem) => classItem._id === classId
  );

  // --- Fonction qui copie le code d'inscription lorsque l'on clique sur le tag
  const handleSignupCodeCopy = useCallback(
    async (e: React.MouseEvent<HTMLHeadingElement>) => {
      // Cast de e.target pour récupérer le content
      const codeTag = e.target as HTMLHeadingElement;
      // Si le tag est vide on ne copie pas
      if (!codeTag.textContent) return;

      // On tente la copie | on catch l'erreur
      try {
        await navigator.clipboard.writeText(codeTag.textContent);
        setCodeCopyAnimation(true);
        setTimeout(() => setCodeCopyAnimation(false), 1000);
      } catch (err) {
        console.error("La copie du code a échouée");
      }
    },
    []
  );

  return (
    <section id="dashboard">
      <div id="row">
        <div>
          <h2 id="class_name">
            {iconGenerator(selectedClass?.icon)} Classe{" "}
            <span>{selectedClass?.name}</span>
          </h2>
        </div>

        <div>
          <h3
            id="signup_code_tag"
            onClick={handleSignupCodeCopy}
            className={codeCopyAnimation ? "copied" : ""}
          >
            {selectedClass?.signupCode}
          </h3>
          <h3 id="students_amount">
            {selectedClass?.registeredStudentsAmount} /{" "}
            {selectedClass?.studentsAmount} étudiants
          </h3>
        </div>
      </div>
      <hr className="learn-separator w-100" />
      <div className="table-container">
        <UsersTable
          users={selectedClass?.users}
          avatar
          name
          roles
          status
          timestamp
          actions
        />
      </div>
    </section>
  );
};

export default ClassView;
