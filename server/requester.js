fetch('localhost:8000/api/postChapter', {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: '*cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    body: JSON.stringify({
      chapterName: 'Algorithmie',
      access: false,
      description: "Science de l'automatisation",
    }),
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
