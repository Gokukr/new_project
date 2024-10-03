// controllers/trainerController.js
const prisma = require("../models");
const sendEmail = require("../services/mailer"); // Email sending function
const bcrypt = require("bcrypt");

const trainerController = {
  addTrainer: async (req, res) => {
    const { name, email } = req.body;
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newTrainer = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role_id: 2,
        },
      });

      sendEmail.sendmail(
        email,
        `Hello trainer here is your password: ${password} `
      );

      res.status(201).json({ message: "Trainer added successfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the trainer." });
    }
  },
};

module.exports = trainerController;
