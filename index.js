require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/db');

const { syncModels } = require('./src/models');

const userRoutes = require('./src/routes/user.routes');
const tokenRoutes = require('./src/routes/token.routes');

const geoRoutes = require('./src/routes/geo.routes');

const notificationRoutes = require('./src/routes/notification.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger.json');


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Servidor API Push + Maps funcionando 🚀');
});

// Conexión a base de datos
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado a PostgreSQL');
    return syncModels(); // sincroniza tablas
  })
  .then(() => {
    console.log('📦 Modelos sincronizados');
  })
  .catch(err => console.error('🔴 Error de conexión a DB:', err));

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});


app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);

app.use('/api/geo', geoRoutes);

app.use('/api/notifications', notificationRoutes);


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));