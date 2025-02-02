const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
const express = require('express');
const app = express();
const cors = require('cors');

// Configurar CORS
const corsOptions = {
  origin: '*', // Permitir todas as origens
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Cabeçalhos permitidos
};

app.use(cors(corsOptions));
app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

require('./init/db.js')(app, () => {
  require('./init/middleware')(app);
  require('./init/router')(app);
  require('./swagger')(app);
  app.listen(port, host, (error) => {
    if (error) throw error;
    console.log('Your app is listening on ' + port);
  });
});
