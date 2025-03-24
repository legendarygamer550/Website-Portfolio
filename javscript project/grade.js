let scores = {}; // Object to store scores by course (course -> [{subject, score}])
let currentCourse = "Web Design"; // Default course

// Initialize scores for all courses
["Web Design", "Computer Science", "Software Developer", "Data Analyst"].forEach(course => {
    scores[course] = [];
});

// Change course and update UI
function changeCourse() {
    currentCourse = document.getElementById("courseSelect").value;
    document.getElementById("courseTitle").innerText = `Current Course: ${currentCourse}`;
    document.getElementById("currentCourse").innerText = currentCourse;
    renderTable();
}

// Function to add a new subject and score
function addScore() {
    const subject = document.getElementById("subjectName").value;
    const score = parseFloat(document.getElementById("score").value);

    if (subject && !isNaN(score)) {
        scores[currentCourse].push({ subject, score });
        renderTable();
        clearInputs();
    } else {
        alert("Please enter a valid subject name and score.");
    }
}

// Render the score table for the current course
function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear the table

    scores[currentCourse].forEach((entry, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.subject}</td>
            <td>${entry.score}</td>
            <td>
                <button onclick="editScore(${index})">Edit</button>
                <button onclick="deleteScore(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updateAverageAndGrade();
}

// Function to update the average score and calculate the final grade
function updateAverageAndGrade() {
    if (scores[currentCourse].length > 0) {
        const total = scores[currentCourse].reduce((sum, entry) => sum + entry.score, 0);
        const average = (total / scores[currentCourse].length).toFixed(2);
        document.getElementById("averageScore").innerText = `Average Score: ${average}`;

        const grade = calculateGrade(average);
        document.getElementById("finalGrade").innerText = `Final Grade: ${grade}`;
    } else {
        document.getElementById("averageScore").innerText = "Average Score: -";
        document.getElementById("finalGrade").innerText = "Final Grade: -";
    }
}

// Function to calculate the final grade based on the average score
function calculateGrade(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else return "F";
}

// Function to delete a score entry
function deleteScore(index) {
    scores[currentCourse].splice(index, 1); // Remove the score at the specified index
    renderTable();
}

// Function to edit a score entry
function editScore(index) {
    const newScore = prompt(`Edit score for ${scores[currentCourse][index].subject}:`, scores[currentCourse][index].score);
    if (newScore !== null && !isNaN(newScore)) {
        scores[currentCourse][index].score = parseFloat(newScore);
        renderTable();
    }
}

// Clear input fields after adding a score
function clearInputs() {
    document.getElementById("subjectName").value = "";
    document.getElementById("score").value = "";
}
