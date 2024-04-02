import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {

        console.log(req.body);

        const { fullname, username, password, confirmPassword, gender } = req.body;
        console.log(req.body);
        console.log(password);
        console.log(confirmPassword);


        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilepic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //generate token
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilepic: newUser.profilepic

            });
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }


    } catch (error) {
        res.status(500).json({ error: "internal server error" });
        console.log(error);
    }

};

export const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic
        });

    } catch (error) {
        res.status(500).json({ error: "internal server error" });
        console.log(error);
    }

};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

};
