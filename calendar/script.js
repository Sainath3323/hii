const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;
let events = {}; // To store events for each date

const monthYearDisplay = document.getElementById("month-year");
const calendar = document.getElementById("calendar");
const eventModal = document.getElementById("event-modal");
const eventText = document.getElementById("event-text");
const saveEventButton = document.getElementById("save-event");
const closeModalButton = document.getElementById("close-modal");

// Render Calendar for the current month
function renderCalendar() {
  calendar.innerHTML = ""; // Clear the calendar
  monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const totalCells = Math.ceil((totalDays + startingDay) / 7) * 7;

  // Create empty cells before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("day", "empty");
    calendar.appendChild(emptyCell);
  }

  // Create cells for each day
  for (let day = 1; day <= totalDays; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day");
    dayCell.textContent = day;
    dayCell.dataset.date = `${currentYear}-${currentMonth + 1}-${day}`;

    // If there's an event for this day, mark it
    if (events[dayCell.dataset.date]) {
      dayCell.classList.add("active");
    }

    dayCell.addEventListener("click", openEventModal);
    calendar.appendChild(dayCell);
  }
}

// Open the modal to add/edit an event
function openEventModal(event) {
  const date = event.target.dataset.date;
  selectedDate = date;

  // Populate the event text area with the existing event (if any)
  eventText.value = events[date] || "";
  eventModal.style.display = "flex";

  saveEventButton.onclick = saveEvent;
}

// Save the event to the selected date
function saveEvent() {
  events[selectedDate] = eventText.value;
  renderCalendar(); // Re-render the calendar to reflect changes
  closeModal();
}

// Close the event modal
function closeModal() {
  eventModal.style.display = "none";
  eventText.value = ""; // Clear the text area
}

// Navigate to the previous month
document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  renderCalendar();
});

// Navigate to the next month
document.getElementById("next-month").addEventListener("click", () => {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  renderCalendar();
});

// Close the modal when the close button is clicked
closeModalButton.addEventListener("click", closeModal);

// Initial render of the calendar
renderCalendar();
