const express = require('express');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.JWT_SECRET_KEY);


app.use(cors());
app.use(express.json());

const users = [
    { id: 1, username: 'testuser@gmail.com', password: bcrypt.hashSync('password', 10) } // password is 'password'
  ];

  app.post('/login',async (req,res)=>{

    const {email, password} = req.body;

    const user = users.find((user) => user.username === email);

    if (!user) {
        return res.status(400).json({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET_KEY) {
        return res.status(400).json({message:"JWT_SECRET_KEY not set"})
    }

    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});

    res.json({token});

  });

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})