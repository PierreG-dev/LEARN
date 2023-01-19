const exerciseData = document.querySelector('#exercise_data'); //For exercise data
const exerciseInstructions = document.querySelector('#exercise_instructions'); //For exercise instructions
const exerciseSolutionHTML = document.querySelector('#exercise_solution_html'); //HTML Solution
const exerciseSolutionCSS = document.querySelector('#exercise_solution_css'); //CSS Solution
const exerciseSolutionJS = document.querySelector('#exercise_solution_js'); //JS Solution
const exerciseSolutionFile = document.querySelector('#exercise_solution_file'); //File solution
const exerciseSuccessSpan = document.querySelector('#exerciseSuccessSpan'); //Span for success indicator
const exerciseButton = document.querySelector('#exercise_button'); //Button to confirm the creation

const memorySpan = document.querySelector('.memorySpan');
const exerciceCreationButtons = document.querySelectorAll(
  '.exercise-creation-button'
);
console.log(exerciceCreationButtons);
exerciceCreationButtons.forEach((button) => {
  console.log(button);
  button.onclick = () => {
    memorySpan.dataset.ongoingSubChapter = button.dataset.subchapterId;
    console.log(
      'new ongoing subchapter => ' + memorySpan.dataset.ongoingSubChapter
    );
  };
});

exerciseButton.onclick = (e) => {
  console.log('launching post...');
  console.log(exerciseSolutionFile);
  console.log({
    subChapterId: memorySpan.dataset.ongoingSubChapter,
    exerciseData: exerciseData.value,
    exerciseInstructions: exerciseInstructions.value,
    exerciseSolutionHTML: exerciseSolutionHTML.value,
    exerciseSolutionCSS: exerciseSolutionCSS.value,
    exerciseSolutionJS: exerciseSolutionJS.value,
    exerciseSolutionFile: exerciseSolutionFile.files[0],
  });
  const formData = new FormData();
  formData.append('subChapterId', memorySpan.dataset.ongoingSubChapter);
  formData.append('data', exerciseData.value);
  formData.append('instructions', exerciseInstructions.value);
  formData.append('solutionHTML', exerciseSolutionHTML.value);
  formData.append('solutionCSS', exerciseSolutionCSS.value);
  formData.append('solutionJS', exerciseSolutionJS.value);
  formData.append('solutionFile', exerciseSolutionFile.files[0] || null);
  console.log('before fetch');
  fetch('/api/postExercise', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'manual',
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      console.log('New exercise created !');
      console.log(`logs: ${data}`);
      exerciseData.value = '';
      exerciseInstructions.value = '';
      exerciseSolutionHTML.value = '';
      exerciseSolutionCSS.value = '';
      exerciseSolutionJS.value = '';
      exerciseSolutionFile.value = '';
      exerciseSuccessSpan.classList.replace('d-none', 'd-block');
    })
    .catch((error) =>
      console.error('erreur dans le fetch coté back office\n' + error)
    );
  e.preventDefault();
};
