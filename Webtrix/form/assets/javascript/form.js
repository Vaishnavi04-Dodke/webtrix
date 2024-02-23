const form = document.getElementById("myForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const table = document.getElementById("table");

function formValidate() {
    var fname = document.getElementById("first_name").value;
    var namePattern = /^[A-Z a-z]+$/;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("date_of_birth").value;
    var address = document.getElementById("address").value;
    var mobile = document.getElementById("number").value;

    document.getElementById("err").innerHTML = "";
    document.getElementById("error").innerHTML = "";
    document.getElementById("errorr").innerHTML = "";
    document.getElementById("erro").innerHTML = "";
    document.getElementById("error1").innerHTML = "";

    document.getElementById("first_name").style.borderColor = "";
    document.getElementById("email").style.borderColor = "";
    document.getElementById("date_of_birth").style.borderColor = "";
    document.getElementById("address").style.borderColor = "";
    document.getElementById("number").style.borderColor = "";

    if (fname == "") {
        document.getElementById("err").innerHTML = "Enter your Name..!";
        document.getElementById("first_name").style.borderColor = "red";
        return false;
    }
    if (!namePattern.test(fname)) {
        document.getElementById("err").innerHTML = "Name can only contain letters.";
        document.getElementById("first_name").style.borderColor = "red";
        return false;
    }

    if (email == "") {
        document.getElementById("error").innerHTML = "Enter your Email..! <br>";
        document.getElementById("email").style.borderColor = "red";
        return false;
    }
    if (dob == "") {
        document.getElementById("errorr").innerHTML = "Enter your DOB <br>";
        document.getElementById("date_of_birth").style.borderColor = "red";
        return false;
    }
    if (address == "") {
        document.getElementById("erro").innerHTML = "Enter your Address";
        document.getElementById("address").style.borderColor = "red";
        return false;
    }
    if (email.indexOf('@') <= 0) {
        alert("Enter a valid email address.");
        return false;
    }
    if ((email.charAt(email.length - 4) != '.') && (email.charAt(email.length - 3) != '.')) {
        alert(". is mandatory");
        return false;
    }
    if (mobile && (mobile.length !== 10 || !/^\d{10}$/.test(mobile))) {
        alert("Enter a valid 10-digit mobile number");
        document.getElementById("number").style.borderColor = "red";
        return false;
    }
    if (mobile == "") {
        document.getElementById("errorr1").innerHTML = "Enter your Number <br>";
        document.getElementById("number").style.borderColor = "red";
        return false;
    }
    return true;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (formValidate()) {
        const name = document.getElementById('first_name').value;
        const number = document.getElementById('number').value;
        const email = document.getElementById('email').value;
        const dob = document.getElementById('date_of_birth').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const address = document.getElementById('address').value;

        const newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);

        cell1.innerHTML = name;
        cell2.innerHTML = number;
        cell3.innerHTML = email;
        cell4.innerHTML = dob;
        cell5.innerHTML = gender;
        cell6.innerHTML = address;
        cell7.innerHTML = '<button class="btn" onclick="deleteRow(this)">Delete</button>' +
            '<button class="btn1" onclick="editRow(this)">Edit</button>';

        function displaySuccessMessage() {
            popup.style.display = "block";
        }
        displaySuccessMessage();

        form.reset();
    }
});

closePopup.addEventListener("click", function () {
    popup.style.display = "none";
});

function deleteRow(button) {
    const row = button.parentNode.parentNode;

    const confirmation = window.confirm("Are you sure you want to delete this row?");

    if (confirmation) {
        // If the user confirms, delete the row
        const table = row.parentNode;
        table.deleteRow(row.rowIndex);
    }
}

function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.cells;

    // Populate the form fields with the data from the selected row
    document.getElementById('first_name').value = cells[0].textContent;
    document.getElementById('number').value = cells[1].textContent === 'N/A' ? '' : cells[1].textContent;
    document.getElementById('email').value = cells[2].textContent;
    document.getElementById('date_of_birth').value = cells[3].textContent;

    // Check and set the radio button based on the "gender" value
    const gender = cells[4].textContent;
    const genderRadio = document.getElementsByName('gender');
    for (let i = 0; i < genderRadio.length; i++) {
        if (genderRadio[i].value === gender) {
            genderRadio[i].checked = true;
        }
    }

    document.getElementById('address').value = cells[5].textContent;

    // Hide the original "ADD" button and show an "UPDATE" button
    document.getElementById('submit').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    // Store the row index to know which row is being edited
    document.getElementById('update').setAttribute('data-row-index', row.rowIndex);
}
document.getElementById('update').addEventListener('click', function () {
    updateRow();
});

function updateRow() {
    const rowIndex = document.getElementById('update').getAttribute('data-row-index');
    const table = document.getElementById('table');
    const row = table.rows[rowIndex];
    const cells = row.cells;

    // Update the table row with the edited data
    cells[0].textContent = document.getElementById('first_name').value;
    cells[1].textContent = document.getElementById('number').value || 'N/A';
    cells[2].textContent = document.getElementById('email').value;
    cells[3].textContent = document.getElementById('date_of_birth').value;

    const genderRadio = document.getElementsByName('gender');
    for (let i = 0; i < genderRadio.length; i++) {
        if (genderRadio[i].checked) {
            cells[4].textContent = genderRadio[i].value;
            break;
        }
    }

    cells[5].textContent = document.getElementById('address').value;

    // Reset the form and show the "ADD" button
    document.getElementById('myForm').reset();
    document.getElementById('submit').style.display = 'block';
    document.getElementById('update').style.display = 'none';

    return false;
}
