$(document).ready(function() {
    $('#searchInput').on('input', function() {
        var searchValue = $(this).val().trim();
        if (searchValue !== '') {
            searchStudents(searchValue);
        } else {
            $('#searchResults').empty();
        }
    });
});

function searchStudents(searchValue) {
    $.ajax({
        url: 'http://localhost:3000/students',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var results = response.filter(function(student) {
                var searchValueLowerCase = searchValue.toLowerCase();
                return (
                    student.fname.toLowerCase().includes(searchValueLowerCase) ||
                    student.studentId.toString().includes(searchValueLowerCase)
                );
            });

            displaySearchResults(results);
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}

function displaySearchResults(results) {
    var searchResultsContainer = $('#searchResults');
    searchResultsContainer.empty();

    if (results.length === 0) {
        searchResultsContainer.append('<p>No results found.</p>');
        return;
    }

    var table = $('<table class="table"></table>');
    var tableHeader = $('<thead><tr><th>Student ID</th><th>FirstName</th><th>LastName</th><th>Email</th><th>City</th><th>Course</th><th>Guardian</th><th>Age</th><th>Action</th></tr></thead>');
    var tableBody = $('<tbody></tbody>');

    results.forEach(function(student) {
        var row = $('<tr></tr>');
        row.append('<td>' + student.studentId + '</td>');
        row.append('<td>' + student.fname + '</td>');
        row.append('<td>' + student.lname + '</td>');
        row.append('<td>' + student.email + '</td>');
        row.append('<td>' + student.city + '</td>');
        row.append('<td>' + student.course + '</td>');
        row.append('<td>' + student.guardian + '</td>');
        row.append('<td>' + student.age + '</td>');

        var editButton = $('<button class="btn btn-primary btn-sm">Edit</button>');
        editButton.click(function() {
            editStudent(student.studentId);
        });

        var deleteButton = $('<button class="btn btn-danger btn-sm">Delete</button>');
        deleteButton.click(function() {
            deleteStudent(student.studentId);
        });

        var actionCell = $('<td></td>');
        actionCell.append(editButton);
        actionCell.append(' ');
        actionCell.append(deleteButton);
        row.append(actionCell);

        tableBody.append(row);
    });

    table.append(tableHeader);
    table.append(tableBody);
    searchResultsContainer.append(table);
}

function editStudent(studentId) {
    var updatedFirstName = prompt('Enter the updated First name:');
    var updatedLastName = prompt('Enter the updated Last name:');
    var updatedEmail = prompt('Enter the updated Email:');
    var updatedCity = prompt('Enter the updated City:');
  //  var updatedCourse = prompt('Enter the updated Course:');
    //var updatedGuardian = prompt('Enter the updated Guardian:');
    var updatedAge = prompt('Enter the updated age:');

    var updatedStudent = {
        fname: updatedFirstName,
        lname: updatedLastName,
        email: updatedEmail,
        city: updatedCity,
       // course: updatedCourse,
        //guardian: updatedGuardian,
        age: updatedAge
    };

    $.ajax({
        url: 'http://localhost:3000/students/' + studentId,
        type: 'PUT',
        dataType: 'json',
        data: updatedStudent,
        success: function(response) {
            console.log('Student updated successfully:', response);
            
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            // Handle the error case
        
        }
    });
}

function deleteStudent(studentId) {
    $.ajax({
        url: 'http://localhost:3000/students/' + studentId,
        type: 'DELETE',
        dataType: 'json',
        success: function(response) {
            console.log('Student deleted successfully:', response);
            
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            // Handle the error case
           
        }
    });
}
