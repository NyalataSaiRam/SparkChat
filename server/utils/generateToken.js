import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_CODE, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true,  // so the cookie can't be accessed by client-side scripting
        sameSite: "strict",    // to prevent cross-site access of the cookie
        secure: process.env.NODE_ENV !== "development"
    });

};

export default generateTokenAndSetCookie;