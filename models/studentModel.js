const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    studentId: {
      type: Number,
      required: true,
      unique: true,
    },
    fname: {
      type: String,
      required: [true, "Please enter Firstname"],
    },
    lname: {
      type: String,
      required: [true, "Please enter Lastname"],
    },
    email: {
      type: String,
      required: [true, "Please enter Email"],
    },
    city: {
      type: String,
      required: [true, "Please enter the City"],
    },
    course: {
      type: String,
      required: true,
    },
    guardian: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    programming: {
      type: Number,
      required: false,
    },
    dbms: {
      type: Number,
      required: false,
    },
    wad: {
      type: Number,
      required: false,
    },
    dccn: {
      type: Number,
      required: false,
    },
    physics: {
      type: Number,
      required: false,
    },
    maths: {
      type: Number,
      required: false,
    },
    circuits: {
      type: Number,
      required: false,
    },
    project: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
