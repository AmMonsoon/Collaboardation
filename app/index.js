const express = require('express')
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection:', reason);
});
const sequelize = require('./config/database')
const { User, Project } = require('./models')
const userRoutes = require('./routes/userRoutes')
const app = express();

// console.log("&&&&&&&&&&&&&&&&&&&&&", userRoutes)

app.use(express.json())            //Required to allow Express to read JSON request bodies

app.use('/users', userRoutes);


app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});


(async () => {
    try{
        await sequelize.sync({ alter: true });
        console.log('Models synced successfully.');
        app.listen(3000, () => console.log('Server is listening on port 3000'));
  setInterval(() => console.log('💤 Still alive...'), 3000);
    }catch(error){
        console.error('Failed to sync models: ' , error)
    }
})();

