import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/index.ts';
import iconGenerator from '../../../../utilities/iconGenerator.tsx';
import { User } from '../../../../types/index.ts';
import moment from 'moment';

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
        setTimeout(() => setCodeCopyAnimation(false), 1500);
      } catch (err) {
        console.error('La copie du code a échouée');
      }
    },
    []
  );

  const avatarPicker = useCallback(
    (user: User) => <img src={`${user.avatarUrl}`} alt={user.login} />,
    []
  );

  const rolePicker = useCallback((user: User) => {
    if (user.roles?.includes('admin')) return 'Administrateur';
    else if (user.roles?.includes('teacher')) return 'Enseignant';
    else if (user.roles?.includes('delegate')) return 'Délégué';
    else if (user.roles?.includes('student')) return 'Étudiant';
  }, []);

  // ---
  const statusPicker = useCallback((user: User) => {
    if (!user) return;

    return moment(user.lastActivity).fromNow();
  }, []);

  const signupDatePicker = useCallback((user: User) => {
    return (
      <>
        {new Date(user.timestamp).toLocaleDateString('fr')}
        <br />
        <em className="learn-note">{moment(user.timestamp).fromNow()}</em>
      </>
    );
  }, []);

  console.log(selectedClass);

  return (
    <section id="dashboard">
      <div id="row">
        <div>
          <h2 id="class_name">
            {iconGenerator(selectedClass?.icon)} Classe{' '}
            <span>{selectedClass?.name}</span>
          </h2>
        </div>

        <div>
          <h3 id="signup_code_tag" onClick={handleSignupCodeCopy}>
            {selectedClass?.signupCode}
          </h3>
          <h3 id="students_amount">
            {selectedClass?.registeredStudentsAmount} /{' '}
            {selectedClass?.studentsAmount} étudiants
          </h3>
        </div>
      </div>
      <hr className="learn-separator w-100" />
      <div className="table-container">
        <table id="students_table">
          <thead>
            <tr>
              <th className="avatar">Avatar</th>
              <th className="name">Nom</th>
              <th className="role">Rôles</th>
              <th className="status">Statut</th>
              <th className="signup">Date d'inscription</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedClass?.users?.length > 0 ? (
              selectedClass?.users?.map((user) => (
                <>
                  <tr key={user._id}>
                    <td className="avatar">{avatarPicker(user)}</td>
                    <td className="name">
                      {user.login}
                      <br />
                      {user.username}
                    </td>
                    <td className="role">{rolePicker(user)}</td>
                    <td className="status">{statusPicker(user)}</td>
                    <td className="signup">{signupDatePicker(user)}</td>
                    <td className="actions">
                      <div className="row">
                        <Link to={`/users/${user._id}`}>
                          {iconGenerator('AiFillEye')}
                        </Link>
                      </div>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <em className="learn-note">La classe est vide</em>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ClassView;
