let editStudentId = null;

const form = document.getElementById("studentForm");

if (form) {
    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const course = document.getElementById("course").value;

        if (!name || !email || !course) {
            alert("Please fill all fields");
            return;
        }

        const url = editStudentId
            ? `/update-student/${editStudentId}`
            : "/add-student";

        const method = editStudentId ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                course
            })
        })
        .then(response => response.text())
        .then(data => {

            alert(data);

            form.reset();

            editStudentId = null;

            loadStudents();

        })
        .catch(error => {
            console.error(error);
        });

    });
}

function editStudent(button) {

    const row = button.parentElement.parentElement;

    editStudentId = row.cells[0].textContent;

    document.getElementById("name").value =
        row.cells[1].textContent;

    document.getElementById("email").value =
        row.cells[2].textContent;

    document.getElementById("course").value =
        row.cells[3].textContent;
}

function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    fetch(`/delete-student/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {

        alert(data);

        loadStudents();

    })
    .catch(error => {
        console.log(error);
    });
}

function updateStudentCount() {

    const count =
        document.querySelectorAll("#studentList tr").length;

    document.getElementById("totalStudents").textContent =
        `Total Students: ${count}`;
}

function searchStudent() {

    const input =
        document.getElementById("searchInput");

    const filter =
        input.value.toLowerCase();

    const rows =
        document.querySelectorAll("#studentList tr");

    rows.forEach(row => {

        const name =
            row.cells[1].textContent.toLowerCase();

        if (name.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}

function sortStudents() {

    const tbody =
        document.getElementById("studentList");

    const rows =
        Array.from(tbody.rows);

    rows.sort((a, b) => {

        const nameA =
            a.cells[1].textContent.toLowerCase();

        const nameB =
            b.cells[1].textContent.toLowerCase();

        return nameA.localeCompare(nameB);

    });

    rows.forEach(row =>
        tbody.appendChild(row)
    );
}

function loadStudents() {

    fetch("/students")
        .then(response => response.json())
        .then(students => {

            const studentList =
                document.getElementById("studentList");

            studentList.innerHTML = "";

            students.forEach(student => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                    <td>
                        <button onclick="editStudent(this)">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;

                studentList.appendChild(row);

            });

            updateStudentCount();

        })
        .catch(error => {
            console.log(error);
        });
}

function exportStudents() {

    window.location.href = "/export-excel";

}

loadStudents();