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
                    student.lname.toLowerCase().includes(searchValueLowerCase) ||
                    student.email.toLowerCase().includes(searchValueLowerCase) ||
                    student.city.toLowerCase().includes(searchValueLowerCase) ||
                    student.course.toLowerCase().includes(searchValueLowerCase) ||
                    student.guardian.toLowerCase().includes(searchValueLowerCase) ||
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
    var tableHeader = $('<thead><tr><th>Student ID</th><th>FirstName</th><th>LastName</th><th>Email</th><th>City</th><th>Course</th><th>Guardian</th><th>Age</th></tr></thead>');
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


        tableBody.append(row);
    });

    table.append(tableHeader);
    table.append(tableBody);
    searchResultsContainer.append(table);
}



   

