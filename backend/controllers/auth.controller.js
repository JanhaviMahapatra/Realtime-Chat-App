import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (userId) => {
return jwt.sign(
{ userId },
process.env.JWT_SECRET,
{
expiresIn: "15d",
}
);
};

export const signup = async (req, res) => {
try {
const { fullName, username, password, confirmPassword, gender } = req.body;

if (password !== confirmPassword) {
return res.status(400).json({ error: "Passwords don't match" });
}

const user = await User.findOne({ username });

if (user) {
return res.status(400).json({ error: "Username already exists" });
}

// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Generate default profile picture
const profilePic =
gender === "male"
	? `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`
	: `https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`;

const newUser = new User({
fullName,
username,
password: hashedPassword,
gender,
profilePic,
});

if (newUser) {
await newUser.save();

const token = generateToken(newUser._id);

res.status(201).json({
	_id: newUser._id,
	fullName: newUser.fullName,
	username: newUser.username,
	profilePic: newUser.profilePic,
	token,
});
} else {
res.status(400).json({ error: "Invalid user data" });
}
} catch (error) {
console.log("Error in signup controller", error.message);
res.status(500).json({ error: "Internal Server Error" });
}
};

export const login = async (req, res) => {
try {
const { username, password } = req.body;

const user = await User.findOne({ username });
const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

if (!user || !isPasswordCorrect) {
return res.status(400).json({ error: "Invalid username or password" });
}

const token = generateToken(user._id);

res.status(200).json({
_id: user._id,
fullName: user.fullName,
username: user.username,
profilePic: user.profilePic,
token,
});
} catch (error) {
console.log("Error in login controller", error.message);
res.status(500).json({ error: "Internal Server Error" });
}
};

export const logout = (req, res) => {
try {
res.status(200).json({ message: "Logged out successfully" });
} catch (error) {
console.log("Error in logout controller", error.message);
res.status(500).json({ error: "Internal Server Error" });
}
};