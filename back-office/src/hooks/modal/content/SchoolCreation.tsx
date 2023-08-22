import { useState, useCallback } from 'react';
import useRequests from '../../useRequests';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index.ts';

const SchoolCreation = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const teacherId = useSelector((state: RootState) => state.data.user?._id);
  const request = useRequests();
  console.log(teacherId);

  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const onLogoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.files ? e.target.files[0] : null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !teacherId || !description || !logo) {
        request.errorHandler.changeErrorMsg(
          'Tous les champs doivent être remplis'
        );
        request.errorHandler.enableError();
        return;
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('teacherId', teacherId);
      formData.append('logo', logo);

      request.fetchToAPI('/api/postSchool', 'POST', {
        type: 'multipart/form-data',
        content: formData,
      });
    },
    [description, logo, name, teacherId, request]
  );

  return (
    <>
      <h1>Ajouter une Ecole</h1>
      <form onSubmit={handleSubmit} onClick={request.errorHandler.disableError}>
        <em
          className={`learn-error ${
            request.errorHandler.error.status && 'error'
          }`}
        >
          {request.errorHandler.error.msg}
        </em>
        <div>
          <label htmlFor="name">Nom de l'école</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Nom"
            className={`learn-input ${
              request.errorHandler.error.status && !name && 'error'
            }`}
            value={name}
            onChange={onNameChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description de l'école</label>
          <textarea
            style={{ resize: 'none' }}
            className={`learn-input ${
              request.errorHandler.error.status && !description && 'error'
            }`}
            placeholder="Description"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>

        <div>
          <label htmlFor="logo">Logo de l'école</label>
          <input
            type="file"
            className={`learn-input ${
              request.errorHandler.error.status && !logo && 'error'
            }`}
            placeholder="Logo"
            onChange={onLogoChange}
          />
        </div>

        <button type="submit" className="learn-button">
          Ajouter {request.statusIcon}
        </button>
      </form>
    </>
  );
};

export default SchoolCreation;
