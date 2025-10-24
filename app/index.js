const express = require('express')
const sequelize = require('./config/database')
const { User, Project } = require('./models')
const app = express();


app.use(express.json())            //Required to allow Express to read JSON request bodies



app.get('/',(req, res) => res.send("Server is running"));


(async () => {
    try{
        await sequelize.sync({ alter: true });
        console.log('Models synced successfully.')
        app.listen(5000, () => console.log('Server is listening on port 5000'))
    }catch(error){
        console.error('Failed to sync models: ' , error)
    }
})();
