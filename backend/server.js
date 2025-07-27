const express = require ('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/mongodb-config')
const userController = require('./controllers/user-controller');
const bookController = require('./controllers/book-controller');
const jwt = require('jsonwebtoken');
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true ,
  }));

const port = 3000;
connectDB();

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'thebookstore', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User signup
app.post('/api/signup', userController.signupController);

// User login
app.post('/api/login', userController.loginController);

// Book CRUD (protected)
app.post('/api/books', authenticateToken, bookController.createBook);
app.get('/api/books', authenticateToken, bookController.getBooks);
app.put('/api/books/:id', authenticateToken, bookController.updateBook);
app.delete('/api/books/:id', authenticateToken, bookController.deleteBook);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


