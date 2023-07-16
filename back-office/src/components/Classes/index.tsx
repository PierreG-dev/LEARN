import React, { useCallback } from "react";
import { School, Class } from "../../types/types";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import ClassView from "./ClassView";
import ClassEdit from "./ClassEdit";

type Props = {
  schools?: School[];
  edit: boolean;
};

const Index: React.FC<Props> = ({ schools, edit }) => {
  const { classId } = useParams();

  const displayClasses = useCallback((school: School) => {
    const classElements = school.classes.map(
      (classItem: Class, key: number) => (
        <li key={key} className="class-list-item">
          <h3>{classItem.name}</h3>
          <p title="Etudiants inscrits / Etudiants prévus">
            {classItem.registeredStudentsAmount}/{classItem.studentsAmount}
          </p>
          <div>
            <button className="disable"></button>
            <Link to={`/classes/${classItem._id}/edit`}>
              <button className="edit">
                <AiFillEdit />
              </button>
            </Link>
          </div>
          <Link to={`/classes/${classItem._id}`}>
            <button className="access">
              <AiOutlineArrowRight />
            </button>
          </Link>
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

  const displaypicker = useCallback(() => {
    if (classId && !edit) return <ClassView classId={classId} />;
    else if (classId && edit) return <ClassEdit classId={classId} />;
    else
      return (
        <>
          <h1>Liste des groupes</h1>
          {displaySchools()}
        </>
      );
  }, [classId, edit]);

  return <MainContainer>{displaypicker()}</MainContainer>;
};

const MainContainer = styled.main`
  min-height: 100%;
  margin: 0;
  padding: 30px 15px;
  h1 {
    margin-bottom: 20px;
    font-size: 2.7rem;
    font-style: italic;
  }

  ul#schools_list {
    list-style: none;
    padding-left: 40px;
    li.school-list-item {
      h2 {
      }
      & > em {
        display: block;
        padding-left: 20px;
        opacity: 0.5;
        margin-bottom: 30px;
      }
    }
  }

  ul.classes_list {
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    li.class-list-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 25px;
      width: 50%;
      background: #fafafa;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
      border-radius: 5px;

      p {
        cursor: help;
        user-select: none;
      }
    }
  }
`;

export default Index;
