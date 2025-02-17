const  express = require('express');

const { logout, signup, login, protect, deleteUser, makeadmin, getAlluser, removeAdmin } = require('../controllers/userCantroller');


const router = express.Router()

// GET /api/products

router.get("/",(req,res)=>{
    res.status(200).json({
        status: "OK",
        message: "Welcome to user!"
    });
})
router.post('/signup', signup)
router.post('/login', login);
router.get('/all',getAlluser)
router.use(protect)
router.get("/logout",logout)
router.get("/makeadmin/:id",makeadmin)
router.get("/removeadmin/:id",removeAdmin)
router.get('/delete',deleteUser)
router.get("/current", (req, res)=>{
    const user = req.user
    res.status(200).json({status: "OK", message: user})
})
// router.post('/login', login);
// Router.post('/login', login);


module.exports = router;
