$(document).ready(function() {
  // Handle form submission
  $('#studentForm').submit(function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the form data
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var city = $('#city').val();
    var course = $('#course').val();
    var guardian = $('#guardian').val();
    var age = $('#age').val();

    // Create a student object
    var student = {
      fname: fname,
      lname: lname,
      email: email,
      city: city,
      course: course,
      guardian: guardian,
      age: age
    };

    // Send a POST request to the API endpoint
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/students',
      data: JSON.stringify(student),
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        alert('Student added successfully');
        // Clear form inputs after successful submission
        $('#fname').val('');
        $('#lname').val('');
        $('#email').val('');
        $('#city').val('');
        $('#course').val('');
        $('#guardian').val('');
        $('#age').val('');
      },
      error: function(error) {
        console.log(error);
        alert('Failed to add student');
      }
    });
  });
});
