// import controllers review, products
const userController = require("../controllers/userController");

// router
const router = require("express").Router();

// use routers
router.post("/register", userController.Register);
router.post("/login", userController.Login);

module.exports = router;
