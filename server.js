// instanciating express app and routes 
const express = require('express');
const routes = require('./routes';

//bringing in sequelize connection 
const sequelize = require('./config/connect');

const app = express();
const PORT = prcoess.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//calling app to use routes 
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App now listening on port ${PORT}`);
  });
});
