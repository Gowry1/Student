$(document).ready(function() {
    $('#searchForm').submit(function(event) {
      event.preventDefault(); // Prevent form submission
  
      const studentId = $('#studentId').val();
  
      $.ajax({
        url: `http://localhost:3000/students/${studentId}`,
        method: 'GET',
        dataType: 'json',
        success: function(student) {
          const resultContainer = $('#resultContainer');
          resultContainer.empty();
  
          if (!student) {
            resultContainer.append('<p class="text-danger">Student not found</p>');
            return;
          }
  
          let marks;
  
          if (student.course === 'hdit') {
            marks = {
              programming: student.programming,
              wad: student.wad,
              dbms: student.dbms,
              dccn: student.dccn
            };
          } else if (student.course === 'hdee') {
            marks = {
              physics: student.physics,
              maths: student.maths,
              circuits: student.circuits,
              project: student.project
            };
          }
  
          let resultHTML = `
            <h4>Student ID: ${student.studentId}</h4>
            <h4>Name: ${student.fname} ${student.lname}</h4>
            <h4>Course: ${student.course}</h4>
            <h4>Marks:</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>`;
  
          for (const subject in marks) {
            const grade = calculateGrade(marks[subject]);
            resultHTML += `
              <tr>
                <td>${subject}</td>
                <td>${marks[subject]}</td>
                <td>${grade}</td>
              </tr>`;
          }
  
          resultHTML += `
              </tbody>
            </table>`;
  
          resultContainer.append(resultHTML);
        },
        error: function(xhr, status, error) {
          console.error('Error:', error);
          const resultContainer = $('#resultContainer');
          resultContainer.html('<p class="text-danger">An error occurred while searching for the student.</p>');
        }
      });
    });
  });
  
  function calculateGrade(marks) {
    let grade;
  
    if (marks >= 80 && marks <= 100) {
      grade = 'A+';
    } else if (marks >= 75 && marks <= 79) {
      grade = 'A';
    } else if (marks >= 70 && marks <= 74) {
      grade = 'A-';
    } else if (marks >= 65 && marks <= 69) {
      grade = 'B+';
    } else if (marks >= 60 && marks <= 64) {
      grade = 'B';
    } else if (marks >= 55 && marks <= 59) {
      grade = 'B-';
    } else if (marks >= 50 && marks <= 54) {
      grade = 'C+';
    } else if (marks >= 45 && marks <= 49) {
      grade = 'C';
    } else if (marks >= 40 && marks <= 44) {
      grade = 'C-';
    } else if (marks >= 30 && marks <= 39) {
      grade = 'D';
    } else {
      grade = 'E';
    }
  
    return grade;
  }
  