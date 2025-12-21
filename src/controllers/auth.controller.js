import { signupUser, loginUser } from "../services/auth.service.js";

export async function signup(req, res) {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ error: "Email, username and password are required" });
        }

        // Email format validation
        const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const user = await signupUser({ email, username, password });

        res.status(201).json({
            message: "Signup successful",
            user: { email: user.email, username: user.username },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const { user, token } = await loginUser({ email, password });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { email: user.email, username: user.username },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
