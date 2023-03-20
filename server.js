// could solve CORS errors ????

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

// Agregar ruta que expone el archivo JSON
app.get('/courses', (req, res) => {
  res.sendFile(__dirname + '/courses.json');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
