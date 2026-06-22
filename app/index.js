console.log("1")
const express = require('express')
console.log("2")
const cookieParser = require('cookie-parser')
console.log("3")
const cors  = require('cors')
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
console.log("4")
const sequelize = require('./config/database')
console.log("5")
const userRoutes = require('./routes/userRoutes')
console.log("6")
const projectRoutes = require('./routes/projectRoutes')
console.log("7")
const boardRoutes =  require('./routes/boardRoutes')
console.log("8")
const taskRoutes = require('./routes/taskRoutes')
console.log("9")
const { errorHandler, notFoundHandler } = require('./middleware/index')

const app = express();


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",          
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

app.use(express.json())            //Required to allow Express to read JSON request bodies
app.use(cookieParser())

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/projects/:projectId/boards', boardRoutes);
app.use('/projects/:projectId/boards/:boardId/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.use(notFoundHandler);
app.use(errorHandler);


const PORT = process.env.PORT || 3000
(async () => {
    try{
        console.log("Starting Server")

        console.log("Authenticating DB")
        await sequelize.authenticate();
        console.log("Database authenticated");
        console.log("Syncing Models")
        await sequelize.sync();
        console.log("Models synced");
        app.listen(PORT , () => console.log(`Server is listening on port ${PORT}`));
    }catch(error){
        console.error('Failed to sync models: ' , error)
    }
})();

