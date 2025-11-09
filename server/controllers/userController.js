const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require("bcryptjs")
const User = require('../models/userModel');

// --- Helpers ---
const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
const generateToken = () => crypto.randomBytes(32).toString('hex');

// --- Register ---
exports.RegisterController = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const exists = await User.findOne({ $or: [{ email }, { username }] });
        if (exists) return res.status(400).json({ message: 'Email or username already in use' });

        const user = await User.create({ name, username, email, password });

        // Generate verification token and log it
        const verificationToken = generateToken();
        user.verificationToken = verificationToken;
        await user.save();
        console.log(`Email verification link: ${process.env.CLIENT_URL}/verify/${verificationToken}`);

        const token = signToken(user._id);
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: err.message });
    }
};

// --- Login ---
exports.LoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select('+password');
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        if (!user.verified) {

            // Generate verification token and log it
            const verificationToken = generateToken();
            user.verificationToken = verificationToken;
            await user.save();
            console.log(`Email verification link: ${process.env.CLIENT_URL}/verify/${verificationToken}`);
            return res.status(401).json({ message: 'Email not verified' });
        }

        const token = signToken(user._id);
        res.json({
            token,
            user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

// USER PROFILE

exports.getProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (err) { 
        return res.status(500).json({ message: err.message });
        // next(err);
     }
};

// --- Verify Email ---
exports.verifyEmailController = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

// --- Forget Password ---
exports.forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = generateToken();
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        console.log(`Password reset link: ${process.env.CLIENT_URL}/reset-password/${token}`);
        res.json({ message: 'Password reset link generated (check console)' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// --- Reset Password ---
exports.resetPasswordController = async (req, res) => {
    try {
         const { token } = req.params;
        const { newPassword } = req.body;
        
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = newPassword; // pre-save hook will hash it
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};
