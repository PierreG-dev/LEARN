const updateSubChapter = (id) => {
  console.log('hihi');
  fetch(`/api/updateSubChapterAccess:${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'manual',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let container = document.querySelector('#subChapter-container-' + id);
      if (data === true)
        container.classList.replace('bg-secondary', 'bg-success');
      else container.classList.replace('bg-success', 'bg-secondary');
    })
    .catch((error) => console.error(error));
};

const updateExercice = (id) => {
  console.log('hihi');
  fetch(`/api/updateExerciseAccess:${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'manual',
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

const updateExerciceSolution = (id) => {
  console.log('hihi');
  fetch(`/api/updateExerciseSolutionAccess:${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'manual',
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

document.querySelectorAll('.subChapter_access_button').forEach((button) => {
  button.onclick = () => {
    updateSubChapter(button.dataset.subchapter);
  };
});

document.querySelectorAll('.exo_access_button').forEach((button) => {
  button.onclick = () => {
    updateExercice(button.dataset.exoId);
  };
});
document.querySelectorAll('.exo_solutionAccess_button').forEach((button) => {
  button.onclick = () => {
    updateExerciceSolution(button.dataset.exoId);
  };
});
