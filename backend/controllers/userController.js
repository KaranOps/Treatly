const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new userSchema(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({
            success: true,
            token,
            user: { name: user.name, email: user.email }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.json({ success: false, "message": "User not found" });
        }

        const checkPass = bcrypt.compare(password, user.password);
        if (!checkPass) return res.json({ success: false, "message": "Password is incorrect" });

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // console.log(token);
        return res.json({ success: true, token, user: { name: user.name } });
    } catch (err) {
        console.error(err);
        res.status(501).json({ error: err.message });
    }
}