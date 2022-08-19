const chapterName = document.querySelector('#chapter_name'); //For chapter name
const chapterDescription = document.querySelector('#chapter_description'); //For chapter description
const chapterSuccessSpan = document.querySelector('#chapterSuccessSpan'); //Span for success indicator
const chapterButton = document.querySelector('#chapter_button'); //Button to confirm the creation

chapterButton.onclick = (e) => {
  console.log('launching post...');
  console.log(
    JSON.stringify({
      chapterName: chapterName.value,
      description: chapterDescription.value,
    })
  );
  fetch('/api/postChapter', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chapterName: chapterName.value,
      description: chapterDescription.value,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      chapterName.value = '';
      chapterDescription.value = '';
      chapterSuccessSpan.classList.replace('d-none', 'd-block');
    })
    .catch((error) =>
      console.error('erreur dans le fetch coté back office\n' + error)
    );
  e.preventDefault();
};
