## Overview
The **Process Scheduling Calculator** is a web-based application that helps users simulate different CPU scheduling algorithms. It allows users to add processes with various parameters, choose a scheduling algorithm, and view the calculated waiting and turnaround times, along with a visual Gantt chart.

## Features
- Supports multiple CPU scheduling algorithms:
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF) - Preemptive & Non-Preemptive
  - Priority Scheduling
  - Round Robin (with customizable time quantum)
- Allows users to dynamically add, edit, and remove processes.
- Provides a real-time process table.
- Displays calculated **waiting time** and **turnaround time**.
- Generates a **Gantt Chart** for visualization.
- Responsive and visually appealing UI.

## Technologies Used
- **HTML** for structure
- **CSS** for styling (gradient background, styled tables, buttons, and effects)
- **JavaScript** for dynamic interactions and algorithm implementations

## Screenshots
(Add screenshots here)

## Installation & Setup
No installation is required. Simply open the `index.html` file in a web browser.

Alternatively, to run it on a local server:
1. Clone or download the repository.
2. Open the folder and launch `index.html` in a browser.

## Usage
1. Select a scheduling algorithm from the dropdown menu.
2. (For Round Robin) Specify a time quantum value.
3. Add processes by entering **Process ID, Arrival Time, Burst Time, and Priority** (if applicable).
4. Click \"Add Process\" to insert it into the process table.
5. Click \"Calculate\" to compute the schedule.
6. View results, including **waiting time, turnaround time**, and a **Gantt Chart**.

## Code Structure
- `index.html`: The main structure of the app.
- `style.css`: Defines UI styles, including tables, buttons, and charts.
- `script.js`: Implements process scheduling logic and dynamic UI updates.

## Scheduling Algorithms Implemented
### 1. First Come First Serve (FCFS)
- Non-preemptive algorithm.
- Processes are executed in the order they arrive.
- Simple but can lead to high waiting times for longer jobs.

### 2. Shortest Job First (SJF)
- Two types:
  - **Non-preemptive**: Selects the shortest burst time process available at any given time.
  - **Preemptive (SRTF)**: Preempts the current process if a new shorter process arrives.
- Minimizes waiting time but requires knowledge of burst times in advance.

### 3. Priority Scheduling
- Each process has a priority value.
- The process with the highest priority executes first.
- Can be **preemptive or non-preemptive**.

### 4. Round Robin (RR)
- Each process gets a fixed time quantum.
- If not completed within the quantum, it goes back into the queue.
- Ensures fairness but increases context switching.

## Future Improvements
- Adding **multi-level queues** for real-world scheduling scenarios.
- Providing a **graphical representation** of process execution.
- Adding **real-time CPU utilization statistics**.

## Contributing
Feel free to fork the project, submit issues, or contribute improvements!


# Write content to file
with open(file_path, "w") as file:
    file.write(readme_content)

# Provide file path for user download
file_path
