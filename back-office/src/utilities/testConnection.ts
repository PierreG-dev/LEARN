const testConnection = () =>
  fetch(`http://localhost:8000/ping`).then((response) => response.text());

export default testConnection;
