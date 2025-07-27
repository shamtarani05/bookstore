const User = require('../Models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async (req, res) => {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        return res.status(400).json({ message: 'User Already Exist' });
    }
    const hashpassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({ fullName: user.fullName, email: user.email, password: hashpassword });
    await newUser.save();
    return res.status(201).json('User Created Successfully');
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, 'thebookstore', { expiresIn: '1h' });
    return res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
};

module.exports = {
    signupController,
    loginController
};