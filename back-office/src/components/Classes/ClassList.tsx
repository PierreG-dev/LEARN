import React, { useCallback, useMemo } from "react";
import { Class, School } from "../../types/types";
import {
  AiFillEdit,
  AiOutlineArrowRight,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {
  schools: School[];
};

const ClassList: React.FC<Props> = ({ schools }) => {
  const schoolsAmount = useMemo(() => schools.length, [schools]);
  const clasesAMount = useMemo(
    () =>
      schools.reduce(
        (accumulator, school) => accumulator + school.classes.length,
        0
      ),
    [schools]
  );

  const displayClasses = useCallback((school: School) => {
    const classElements = school.classes.map(
      (classItem: Class, key: number) => (
        <li key={key} className="class-list-item">
          <h3>{classItem.name}</h3>
          <p
            title={`${classItem.registeredStudentsAmount} inscrits / ${classItem.studentsAmount} prévus`}
          >
            {classItem.registeredStudentsAmount} / {classItem.studentsAmount}
          </p>
          <div>
            <button className="disable">
              <AiOutlinePoweroff />
            </button>
            <Link to={`/classes/${classItem._id}/edit`}>
              <button className="edit">
                <AiFillEdit />
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/classes/${classItem._id}/accesses`}>
              <button className="access">
                <BsShieldLock />
              </button>
            </Link>
            <Link to={`/classes/${classItem._id}`}>
              <button className="view">
                <AiOutlineArrowRight />
              </button>
            </Link>
          </div>
        </li>
      )
    );

    return classElements;
  }, []);

  const displaySchools = useCallback(() => {
    return (
      <ul id="schools_list">
        {schools?.map((school: School, key: number) => (
          <li key={key} className="school-list-item">
            <h2>{school.name}</h2>
            <em>{school.description}</em>
            <ul className="classes_list">{displayClasses(school)}</ul>
          </li>
        ))}
      </ul>
    );
  }, [displayClasses, schools]);

  return (
    <div id="list">
      <h1>Groupes</h1>
      <em>Gestion des Ecoles, classes et utilisateurs indépendants</em>
      <hr />
      <div id="content">
        <p>
          {schoolsAmount} école{schoolsAmount > 1 && "s"} et {clasesAMount}{" "}
          classe
          {clasesAMount > 1 && "s"} trouvées
        </p>

        {displaySchools()}
      </div>
    </div>
  );
};

export default ClassList;
