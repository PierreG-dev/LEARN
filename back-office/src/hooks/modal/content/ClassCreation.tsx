/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { FC, useState, useCallback } from 'react';
import { RootState } from '../../../store/index.ts';
import NumberInput from '../../../utilities/NumberInput.tsx';
import styled from 'styled-components';
import useRequests from '../../useRequests.tsx';
import { APIResponse } from '../../../types/index.ts';

type IProps = {
  options: {
    [value: string]: any;
  };
};

const ClassCreation: FC<IProps> = ({ options }) => {
  const [studentsAmount, setStudentsAmount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const request = useRequests();

  const school = useSelector((state: RootState) =>
    state.data.schools?.find(
      (school) => school._id === options.selectedSchoolId
    )
  );

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!school) throw new Error('No schoolId while trying to create a class');

    await request.fetchToAPI('/api/postClass', 'POST', {
      type: 'application/json',
      content: JSON.stringify({
        name: name,
        studentsAmount: studentsAmount,
        schoolId: school?._id,
      }),
    });

    if (request.data.code === 200) {
      setName('');
      setStudentsAmount(0);
    }
  };

  return (
    <>
      <h1>Ajouter une classe</h1>
      <InlineSchoolDisplayer title={school?.description}>
        <img
          src={`${import.meta.env.VITE_APP_API_URL}${school?.logoUrl}`}
          alt={school?.name}
        />{' '}
        <figcaption>{school?.name}</figcaption>
      </InlineSchoolDisplayer>
      <form onSubmit={handleSubmit} onClick={request.errorHandler.disableError}>
        <em
          className={`learn-error ${
            request.errorHandler.error.status && 'error'
          }`}
        >
          {request.errorHandler.error.msg}
        </em>
        <div>
          <label htmlFor="studentsAmount">Nombre max d'étudiants</label>
          <NumberInput
            getter={studentsAmount}
            setter={setStudentsAmount}
            name={'studentsAmount'}
          />
        </div>

        <div>
          <label htmlFor="name">Nom de la classe</label>
          <input
            type="text"
            className="learn-input"
            placeholder="Nom"
            value={name}
            onChange={onNameChange}
          />
        </div>

        <button type="submit" className="learn-button">
          Ajouter {request.statusIcon}
        </button>
      </form>
    </>
  );
};

const InlineSchoolDisplayer = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding-left: 10px;
  gap: 10px;
  cursor: help;
  margin-bottom: 30px;

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 5px;
  }

  figcaption {
    font-weight: 600;
  }
`;

export default ClassCreation;
