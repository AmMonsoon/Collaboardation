const express = require('express')
const cookieParser = require('cookie-parser')
const cors  = require('cors')
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
const sequelize = require('./config/database')

const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')
const boardRoutes =  require('./routes/boardRoutes')
const taskRoutes = require('./routes/taskRoutes')
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

app.use(notFoundHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});


(async () => {
    try{
        await sequelize.sync({ alter: true });
        app.listen(3000, () => console.log('Server is listening on port 3000'));
    }catch(error){
        console.error('Failed to sync models: ' , error)
    }
})();

