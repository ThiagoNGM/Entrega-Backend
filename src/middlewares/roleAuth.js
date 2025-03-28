// src/middleware/roleAuth.js

export const roleAuth = (role) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "No autorizado" });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
};