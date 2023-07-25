const express = require("express");

const router = new express.Router();

const controllers = require("../controllers/userControllers");

//define routes


router.post("/user/register",controllers.userpost);

router.get("/user/getAlluser",controllers.getUsers);

router.get("/user/singleUser/:id",controllers.getSingleuser);

router.get("/user/deleteUser/:id",controllers.deleteuser);

router.put("/user/updateUser/:id",controllers.updateUser);







module.exports=router;