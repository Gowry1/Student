const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/studentModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

let nextStudentId; // Declare the variable to store the next student ID

mongoose
  .connect('mongodb+srv://root:root@cluster0.pxpjgnx.mongodb.net/node-api?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');

    // Retrieve the maximum student ID from the database
    Student.findOne({}, { studentId: 1 }, { sort: { studentId: -1 } })
      .then((lastStudent) => {
        if (lastStudent) {
          nextStudentId = lastStudent.studentId + 1; // Increment the last student ID by 1
        } else {
          nextStudentId = 1; // If no students found, start from ID 1
        }

        // Start the server after retrieving the next student ID
        app.listen(3000, () => {
          console.log('Node API is running on port 3000');
        });
      })
      .catch((error) => {
        console.error('Error retrieving next student ID:', error);
      });

    app.get('/', (req, res) => {
      res.send('Hello Node API');
    });

    app.get('/students', async (req, res) => {
      try {
        const students = await Student.find({});
        const formattedStudents = students.map((student) => {
          return {
            studentId: student.studentId,
            fname: student.fname,
            lname: student.lname,
            email: student.email,
            city: student.city,
            course: student.course,
            guardian: student.guardian,
            age: student.age,
          };
        });
        res.status(200).json(formattedStudents);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.post('/students', async (req, res) => {
      try {
        const studentData = req.body;
        console.log('Received student data:', studentData);

        if (!studentData.fname || !studentData.lname || !studentData.email || !studentData.city || !studentData.course || !studentData.guardian || !studentData.age) {
          return res.status(400).json({ message: 'Name and age are required fields' });
        }

        const student = new Student({
          ...studentData,
          studentId: nextStudentId, // Assign the next available student ID
        });

        console.log('Created student object:', student);

        const savedStudent = await student.save();

        console.log('Saved student object:', savedStudent);

        nextStudentId++; // Increment the student ID counter for the next student
        res.status(201).json(savedStudent);
      } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error.message });
      }
    });



    app.get('/students/:studentId', async (req, res) => {
      try {
        const studentId = req.params.studentId;
        const student = await Student.findOne({ studentId: studentId });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });



    // PUT route
    app.put('/students/:studentId', async (req, res) => {
      try {
        const studentId = req.params.studentId;
        const updatedStudent = req.body;
        const student = await Student.findOneAndUpdate({ studentId: studentId }, updatedStudent, { new: true });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });


    // DELETE route
    app.delete('/students/:studentId', async (req, res) => {
      try {
        const studentId = req.params.studentId;
        const student = await Student.findOneAndDelete({ studentId: studentId });
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

  })
  .catch((error) => {
    console.log(error);
  });