
module.exports = (...roles) => {
    //[admin , manager]
    console.log("roles", roles);
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next("this role is not authorized");
        }
        next();
    }
}