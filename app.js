$(document).ready(function() {
  // Fetch data from backend using AJAX
  $.ajax({
    url: 'http://localhost:3000/students', //  server URL
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      // Populate table with received data
      populateTable(data);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });

  // Function to populate the table with data
  function populateTable(data) {
    var tableBody = $('#table-body');
    tableBody.empty();

    // Iterate over the data and create table rows
    data.forEach(function(stu) {
      var row = $('<tr></tr>');
      row.append($('<td></td>').text(stu.studentId));
      row.append($('<td></td>').text(stu.fname));
      row.append($('<td></td>').text(stu.lname));
      row.append($('<td></td>').text(stu.email));
      row.append($('<td></td>').text(stu.city));
      row.append($('<td></td>').text(stu.course));
      row.append($('<td></td>').text(stu.guardian));
      row.append($('<td></td>').text(stu.age));

      tableBody.append(row);
    });
  }
});
