import express from 'express';
const router = express.Router();

router.post('/logout', (req, res) => {
    res.clearCookie('token');  // Assuming you're using a cookie named 'token' for authentication
    res.status(200).json({ message: 'Logged out successfully' });
});

export { router as LogoutRouter };
