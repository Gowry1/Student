$(document).ready(function() {  // When the document is ready, this function will be executed
    $('#searchForm').submit(function(event) {
      event.preventDefault(); // Prevent form submission
  
      const studentId = $('#studentId').val();// Get the value of the input field with the ID 'studentId'
  
      $.ajax({
        url: `http://localhost:3000/students/${studentId}`,// API endpoint to retrieve student data
        method: 'GET',// HTTP method for the request
        dataType: 'json',// The expected data type of the response
        success: function(student) {// This function will be executed if the AJAX request is successful and returns a response
          const resultContainer = $('#resultContainer');// Get the element with the ID 'resultContainer'
          resultContainer.empty();// Clear any existing content inside the result container
  
          if (!student) {// If the student data is empty or undefined, display an error message
            resultContainer.append('<p class="text-danger">Student not found</p>');
            return;
          }
  
          let formFields = '';// Variable to store HTML form fields dynamically
          if (student.course === 'hdit') {
            formFields += `
              <div class="form-group">
                <label for="programming">Programming:</label>
                <input type="number" class="form-control" id="programming" name="programming" required>
              </div>
              <div class="form-group">
                <label for="wad">WAD:</label>
                <input type="number" class="form-control" id="wad" name="wad" required>
              </div>
              <div class="form-group">
                <label for="dbms">DBMS:</label>
                <input type="number" class="form-control" id="dbms" name="dbms" required>
              </div>
              <div class="form-group">
                <label for="dccn">DCCN:</label>
                <input type="number" class="form-control" id="dccn" name="dccn" required>
              </div>
            `;
          } else if (student.course === 'hdee') {
            formFields += `
              <div class="form-group">
                <label for="physics">Physics:</label>
                <input type="number" class="form-control" id="physics" name="physics" required>
              </div>
              <div class="form-group">
                <label for="maths">Maths:</label>
                <input type="number" class="form-control" id="maths" name="maths" required>
              </div>
              <div class="form-group">
                <label for="circuits">Circuits:</label>
                <input type="number" class="form-control" id="circuits" name="circuits" required>
              </div>
              <div class="form-group">
                <label for="project">Project:</label>
                <input type="number" class="form-control" id="project" name="project" required>
              </div>
            `;
          }
  
          formFields += `
            <button type="submit" class="btn btn-primary">Submit</button>
          `;
  
          const updateForm = `
            <form id="updateForm" class="mt-4">
              <h4>Marks Form</h4>
              <div class="form-group">
                <label for="studentId">Student ID:</label>
                <input type="text" class="form-control" id="studentId" name="studentId" value="${student.studentId}" readonly>
              </div>
              ${formFields}
            </form>
          `;
  
          resultContainer.append(updateForm);// Append the dynamically generated form to the result container
          bindSubmitEvent(student.course);// Attach the submit event to the form based on the student's course
        },
        error: function(xhr, status, error) {// This function will be executed if an error occurs during the AJAX request
          console.error('Error:', error);
          const resultContainer = $('#resultContainer');
          resultContainer.html('<p class="text-danger">An error occurred while searching for the student.</p>');
        }
      });
    });
  });
  
  function bindSubmitEvent(course) {// Function to bind the submit event to the dynamically generated form
    $('#updateForm').submit(function(event) {
      event.preventDefault(); // Prevent form submission
  
      const studentId = $('#studentId').val();// Get the value of the input field with the ID 'studentId'
      const formData = {
        studentId: studentId
      };
  
      if (course === 'hdit') {
        formData.programming = $('#programming').val();
        formData.wad = $('#wad').val();
        formData.dbms = $('#dbms').val();
        formData.dccn = $('#dccn').val();
      } else if (course === 'hdee') {
        formData.physics = $('#physics').val();
        formData.maths = $('#maths').val();
        formData.circuits = $('#circuits').val();
        formData.project = $('#project').val();
      }
  
      $.ajax({
        url: `http://localhost:3000/students/${studentId}`,
        method: 'PUT',
        data: formData,
        success: function(response) {
          const resultContainer = $('#resultContainer');
          resultContainer.empty();
          resultContainer.append('<p class="text-success">Marks updated successfully</p>');
        },
        error: function(xhr, status, error) {
          console.error('Error:', error);
          const resultContainer = $('#resultContainer');
          resultContainer.empty();
          resultContainer.append('<p class="text-danger">An error occurred while updating marks</p>');
        }
      });
    });
  }
  