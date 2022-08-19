const updateChapter = (id) => {
  console.log('hihi');
  fetch(`/api/updateChapterAccess:${id}`, {
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

document.querySelectorAll('.access-input').forEach((toggle) => {
  toggle.onclick = () => {
    updateChapter(toggle.dataset.chapter);
    location.reload();
  };
});
