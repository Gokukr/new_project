const prisma = require("../models");

// Add a course and assign it to a trainer
exports.addCourse = async (req, res) => {
  const { courseName, description, trainerId } = req.body; // Ensure courseName is captured correctly
  console.log(trainerId, "trainerId");

  if (!courseName) {
    return res.status(400).json({ error: "Course name is required" });
  }

  try {
    // Step 1: Create the course in the database
    const newCourse = await prisma.course.create({
      data: {
        name: courseName, // Use courseName from the request body
        description: description || "", // If no description is provided, default to an empty string
        trainer_id: trainerId,
      },
    });

    // Step 2: Update the course_id in the user model
    await prisma.user.update({
      where: { id: trainerId }, // Assuming trainerId corresponds to user ID
      data: { course_id: newCourse.id }, // Update the user's course_id with the new course ID
    });

    res
      .status(201)
      .json({ message: "Course added and assigned to trainer", newCourse });
  } catch (error) {
    console.error("Error adding course and assigning trainer:", error);
    res.status(500).json({ error: "Failed to add course and assign trainer" });
  }
};
