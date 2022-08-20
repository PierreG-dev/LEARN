const subChapterName = document.querySelector('#subChapter_name'); //For chapter description
const subChapterSuccessSpan = document.querySelector('#subChapterSuccessSpan'); //Span for success indicator
const subChapterButton = document.querySelector('#subChapter_button'); //Button to confirm the creation
const chapterId = subChapterButton.dataset.chapterId;
console.log(chapterId);

subChapterButton.onclick = (e) => {
  console.log('launching post...');

  fetch('/api/postSubChapter', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subChapterName: subChapterName.value,
      chapterId: chapterId,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      subChapterName.value = '';
      subChapterSuccessSpan.classList.replace('d-none', 'd-block');
    })
    .catch((error) =>
      console.error('erreur dans le fetch coté back office\n' + error)
    );
  e.preventDefault();
};
