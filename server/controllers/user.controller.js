import User from "../models/user.model.js";
import Volunteer from "../models/volunteer.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user: /api/user/register

export const register = async (req,res) =>{
    try {
        const {name, email, password, role, phone, address, city, state, zip} = req.body;
        
        // Basic validation
        if(!name || !email || !password || !role){
            return res.status(400).json({message: "All fields are required"});
        }

        // Additional validation for volunteers
        if(role === 'volunteer' && (!phone || !address || !city || !state || !zip)) {
            return res.status(400).json({message: "Additional fields are required for volunteers"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // If user is a volunteer, create volunteer record
        if(role === 'volunteer') {
            await Volunteer.create({
                name,
                email,
                phone,
                address,
                city,
                state,
                zip
            });
        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: "7d"});

        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false,message: error.message});
    }
}

// Login user: /api/user/login

export const login = async (req,res) =>{
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.status(400).json({success: false, message: 'Email and password are required'});
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({success: false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            return res.status(401).json({success: false, message: 'Invalid email or password'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            success: true, 
            user: {
                id: user._id,
                email: user.email, 
                name: user.name,
                role: user.role
            }
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

// Check Auth : /api/user/is-auth

export const isAuth = async (req,res) =>{
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                success: false, 
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({
                success: false, 
                message: "Invalid authentication token"
            });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false, 
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true, 
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Auth check error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false, 
                message: "Invalid authentication token"
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false, 
                message: "Token expired. Please login again."
            });
        }
        return res.status(500).json({
            success: false, 
            message: "Server error during authentication check"
        });
    }
}

// Logout user: /api/user/logout

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}

// Check if user exists and get role : /api/user/check-user
export const checkUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({
                success: true,
                exists: false
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            success: true,
            exists: true,
            role: user.role
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Upgrade user to volunteer : /api/user/upgrade-to-volunteer
export const upgradeToVolunteer = async (req, res) => {
    try {
        const { email, password, ...volunteerData } = req.body;

        // Find user and verify password
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Update user role and add volunteer data
        user.role = 'volunteer';
        Object.assign(user, volunteerData);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Successfully upgraded to volunteer"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};