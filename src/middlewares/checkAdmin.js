export const checkAdmin = (req, res, next) => {

    if (!res || !res.status) {
        console.error("❌ ERROR: res no está definido en checkAdmin.");
        return;
    }

    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).render('error', { error: 'No tienes permiso para realizar esta acción.' });
    }
};
