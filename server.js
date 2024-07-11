const app = require('./app');
const { sequelize } = require('./config/db');

const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

