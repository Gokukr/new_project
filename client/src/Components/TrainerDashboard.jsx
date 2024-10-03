import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get trainerId from the URL

const TrainerDashboard = () => {
  const { trainerId } = useParams(); // Get trainerId from URL parameters
  const [employees, setEmployees] = useState([]); // State to store employee details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const [marks, setMarks] = useState({}); // State to manage marks for employees

  // Fetch employee details specific to the trainer
  useEffect(() => {
    const trainerId = localStorage.getItem("id");
    console.log(trainerId);

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/trainer/fetchTrainers/${trainerId}`
        );
        console.log(response.data);

        setEmployees(response.data.employees); // Assuming the response contains an 'employees' array
      } catch (err) {
        setError("Failed to fetch employees."); // Handle error
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchEmployees();
  }, [trainerId]); // Run effect when trainerId changes

  // Handle input change for marks
  const handleMarkChange = (employeeId, markType, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [employeeId]: {
        ...prevMarks[employeeId],
        [markType]: value,
      },
    }));
  };

  // Submit marks for an employee
  const handleSubmitMarks = async (employeeId) => {
    // const courseId = 1; // Assuming you have a course ID you want to use, change as needed
    const { mark1, mark2 } = marks[employeeId];
    console.log(employees[employeeId]);

    console.log(employees[0].course_id);

    try {
      await axios.post(
        `http://localhost:4000/user/employees/${employeeId}/addMarks`,
        {
          courseId: employees[0].course_id,
          mark1,
          mark2,
        }
      );

      alert("Marks added successfully!");
      // Optionally refresh employee data after adding marks
    } catch (err) {
      alert("Failed to add marks.");
    }
  };

  // Render loading, error, or employee details
  if (loading) {
    return <div className="text-light">Loading employees...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>; // Display error message
  }

  return (
    <div className="p-6 bg-whiter">
      <h1 className="text-dark text-2xl mb-4">
        Employees for Trainer ID: {trainerId}
      </h1>
      <table className="min-w-full border-collapse border border-darker">
        <thead>
          <tr>
            <th className="border border-dark p-2">ID</th>
            <th className="border border-dark p-2">Name</th>
            <th className="border border-dark p-2">Email</th>
            <th className="border border-dark p-2">Course Name</th>
            <th className="border border-dark p-2">Mark 1</th>
            <th className="border border-dark p-2">Mark 2</th>
            <th className="border border-dark p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-light p-2">{employee.id}</td>
              <td className="border border-light p-2">{employee.name}</td>
              <td className="border border-light p-2">{employee.email}</td>
              <td className="border border-light p-2">
                {employee.course?.name}
              </td>
              <td className="border border-light p-2">
                <input
                  type="number"
                  value={marks[employee.id]?.mark1 || ""}
                  onChange={(e) =>
                    handleMarkChange(employee.id, "mark1", e.target.value)
                  }
                  placeholder="Enter Mark 1"
                  className="border border-gray-400 p-1 rounded"
                />
              </td>
              <td className="border border-light p-2">
                <input
                  type="number"
                  value={marks[employee.id]?.mark2 || ""}
                  onChange={(e) =>
                    handleMarkChange(employee.id, "mark2", e.target.value)
                  }
                  placeholder="Enter Mark 2"
                  className="border border-gray-400 p-1 rounded"
                />
              </td>
              <td className="border border-light p-2">
                <button
                  onClick={() => handleSubmitMarks(employee.id)}
                  className="bg-dark text-whiter p-2 rounded"
                >
                  Add Marks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerDashboard;
