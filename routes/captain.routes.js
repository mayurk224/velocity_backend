const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const captainController = require("../controllers/captain.controller");

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("fullname.firstname")
            .isLength({ min: 3 })
            .withMessage("First name must be at least 3 letters"),
        body("fullname.lastname")
            .isLength({ min: 3 })
            .withMessage("Last name must be at least 3 letters"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),

        body("vehicle.color")
            .isLength({ min: 3 })
            .withMessage("color must be at least 3 letters"),
        body("vehicle.plate")
            .isLength({ min: 3 })
            .withMessage("plate must be at least 3 letters"),
        body("vehicle.capacity")
            .isInt({ min: 1 })
            .withMessage("capacity must be a number and at least 1"),
        body("vehicle.vehicleType")
            .isIn(["car", "motorcycle", "auto"])
            .withMessage("invalid vehicle type"),
    ],
    captainController.registerCaptain
);

module.exports = router;
