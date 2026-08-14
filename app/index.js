const express = require('express')
const cookieParser = require('cookie-parser')
const cors  = require('cors')
const { doubleCsrf } = require("csrf-csrf")

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

const allowedOrigins = [
  "http://localhost:5173",
  "https://collaboardation.com",
  "https://www.collaboardation.com"
]
app.use(
  cors({
    origin(origin, callback) {
      if(!origin || allowedOrigins.includes(origin)){
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },          
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true, 
  })
);

app.use(express.json())            //Required to allow Express to read JSON request bodies
app.use(cookieParser())

const { generateCsrfToken, doubleCsrfProtection, } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  getSessionIdentifier: (req) => req.cookies.token || "unauthenticated",
  cookieName: "csrf_token", 
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
})

app.get("/csrf-token", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);

  res.json({
    csrfToken,
  });
});

app.use(doubleCsrfProtection);

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/projects/:projectId/boards', boardRoutes);
app.use('/projects/:projectId/boards/:boardId/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});


app.use(notFoundHandler);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

(async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT , () => console.log(`Server is listening on port ${PORT}`));
    }catch(error){
        console.error('Failed to sync models: ' , error)
    }
})();

