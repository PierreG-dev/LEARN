import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Class as _Class, School as _School } from "../../types";
import { IoIosSchool } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import useIcon from "../../utilities/iconGenerator";

type Props = {
  schools: _School[];
};

const ClassList: React.FC<Props> = ({ schools }) => {
  const { schoolId, classId } = useParams();

  // const schoolsAmount = useMemo(() => schools.length, [schools]);
  // const clasesAMount = useMemo(
  //   () =>
  //     schools.reduce(
  //       (accumulator, school) => accumulator + school.classes.length,
  //       0
  //     ),
  //   [schools]
  // );

  const displayClasses = useCallback(() => {
    const school = schools.find((schoolItem) => schoolId === schoolItem._id);
    const classElements = (
      <ul id="classes_list">
        {school?.classes && school.classes.length !== 0 ? (
          school.classes.map((classItem: _Class, key: number) => (
            <Link to={`/classes/${schoolId}/${classItem._id}`}>
              <Class
                key={key}
                className={`class-list-item ${
                  classId
                    ? classId === classItem._id
                      ? "selected"
                      : "not-selected"
                    : ""
                }`}
              >
                <div style={{ animationDelay: `${0.7 + 0.2 * key}s` }}>
                  {" "}
                  <h3>{classItem.name}</h3>
                </div>
              </Class>
            </Link>
          ))
        ) : (
          <em>Pas de classes pour le moment</em>
        )}
      </ul>
    );

    return classElements;
  }, [schoolId, schools, classId]);

  const displaySchools = useCallback(() => {
    return (
      <ul id={`schools_list`}>
        {schools.length !== 0 ? (
          schools.map((school: _School, key: number) => (
            <Link to={`/classes/${school._id}`}>
              <School
                key={key}
                className={`school-list-item ${
                  schoolId
                    ? schoolId === school._id
                      ? "selected"
                      : "not-selected"
                    : ""
                }`}
              >
                <img
                  src={import.meta.env.VITE_APP_API_URL + school.logoUrl}
                  alt={school.name}
                />
                {!schoolId && (
                  <div style={{ animationDelay: `${0.7 + 0.2 * key}s` }}>
                    {" "}
                    <h3>{school.name}</h3>
                    <i>{school.description}</i>
                  </div>
                )}
              </School>
            </Link>
          ))
        ) : (
          <em>Pas d'écoles pour le moment</em>
        )}
      </ul>
    );
  }, [schools, schoolId]);

  return (
    <aside>
      <section id="schools" className={schoolId && "collapsed"}>
        <h2>
          <IoIosSchool /> {!schoolId && <span>ECOLES</span>}
        </h2>
        {displaySchools()}
      </section>

      {schoolId && (
        <section id="classes">
          <h2>
            <FaChalkboardTeacher /> <span>CLASSES</span>
          </h2>
          {displayClasses()}
        </section>
      )}
    </aside>
  );
};

const School = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 5px;
  transition: 0.2s;
  filter: grayscale(0.3);

  &:hover,
  &.selected {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    filter: grayscale(0);
  }

  &.not-selected {
    filter: grayscale(1);
  }

  & > div {
    transition: 0.2s;
    transition-delay: 0.3s;
    h3 {
      font-size: 1rem;
    }

    i {
      font-size: 0.9rem;
      padding-left: 2px;
      opacity: 0.7;
    }
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }
`;
const Class = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 5px;
  transition: 0.2s;
  opacity: 0.7;

  &:hover,
  &.selected {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    opacity: 1;
  }

  &.not-selected {
  }

  & > div {
    transition: 0.2s;
    transition-delay: 0.3s;
    h3 {
      font-size: 1rem;
    }

    i {
      font-size: 0.9rem;
      padding-left: 2px;
      opacity: 0.7;
    }
  }
`;
export default ClassList;
