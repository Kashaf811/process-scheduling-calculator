let processes = [];

function addProcess() {
    let pid = document.getElementById("pid").value.trim();
    let arrival = parseInt(document.getElementById("arrival").value);
    let burst = parseInt(document.getElementById("burst").value);
    let priority = parseInt(document.getElementById("priority").value) || 0;

    if (pid === "" || isNaN(arrival) || isNaN(burst) || burst <= 0) {
        alert("Please enter valid process details.");
        return;
    }

    processes.push({ pid, arrival, burst, priority, remaining: burst, waiting: 0, turnaround: 0 });
    updateProcessTable();
}

function updateProcessTable() {
    let tableBody = document.getElementById("processTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    processes.forEach((p, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `<td>${p.pid}</td>
                         <td>${p.arrival}</td>
                         <td>${p.burst}</td>
                         <td>${p.priority}</td>
                         <td>
                             <button class="edit" onclick="editProcess(${index})">Edit</button>
                             <button class="delete" onclick="deleteProcess(${index})">Delete</button>
                         </td>`;
    });
}

function editProcess(index) {
    let p = processes[index];
    document.getElementById("pid").value = p.pid;
    document.getElementById("arrival").value = p.arrival;
    document.getElementById("burst").value = p.burst;
    document.getElementById("priority").value = p.priority;
    deleteProcess(index);
}

function deleteProcess(index) {
    processes.splice(index, 1);
    updateProcessTable();
}

function calculateSchedule() {
    let algorithm = document.getElementById("algorithm").value;
    let timeQuantum = parseInt(document.getElementById("timeQuantum").value);
    let resultsTable = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    let ganttChart = document.getElementById("ganttChart");

    resultsTable.innerHTML = "";
    ganttChart.innerHTML = "";

    if (processes.length === 0) {
        alert("No processes added!");
        return;
    }

    let schedule = [];
    if (algorithm === "fcfs") {
        schedule = fcfs();
    } else if (algorithm === "sjf-np") {
        schedule = sjf(false);
    } else if (algorithm === "sjf-p") {
        schedule = sjf(true);
    } else if (algorithm === "priority") {
        schedule = priorityScheduling();
    } else if (algorithm === "round-robin") {
        schedule = roundRobin(timeQuantum);
    }

    schedule.forEach(proc => {
        let row = resultsTable.insertRow();
        row.innerHTML = `<td>${proc.pid}</td><td>${proc.waiting}</td><td>${proc.turnaround}</td>`;
    });

    drawGanttChart(schedule);
}

function fcfs() {
    let time = 0;
    let schedule = [];
    let sortedProcesses = [...processes].sort((a, b) => a.arrival - b.arrival);

    sortedProcesses.forEach(p => {
        if (time < p.arrival) time = p.arrival;
        p.waiting = Math.max(0, time - p.arrival);
        p.turnaround = p.waiting + p.burst;
        time += p.burst;
        schedule.push(p);
    });

    return schedule;
}

function sjf(preemptive) {
    let time = 0, completed = 0, schedule = [];
    let remainingProcesses = [...processes].map(p => ({ ...p, remaining: p.burst }));

    while (completed < processes.length) {
        let available = remainingProcesses.filter(p => p.arrival <= time && p.remaining > 0);

        if (available.length === 0) {
            time++;
            continue;
        }

        let p = preemptive ? available.sort((a, b) => a.remaining - b.remaining)[0] 
                           : available.sort((a, b) => a.burst - b.burst)[0];

        let executeTime = preemptive ? 1 : p.remaining;
        time += executeTime;
        p.remaining -= executeTime;

        if (p.remaining === 0) {
            p.waiting = Math.max(0, time - p.arrival - p.burst);
            p.turnaround = time - p.arrival;
            completed++;
            schedule.push(p);
        }
    }

    return schedule;
}

function priorityScheduling() {
    let time = 0, schedule = [];
    let queue = [...processes].sort((a, b) => a.arrival - b.arrival);

    while (queue.length > 0) {
        let available = queue.filter(p => p.arrival <= time);
        if (available.length === 0) {
            time++;
            continue;
        }
        let p = available.sort((a, b) => a.priority - b.priority)[0];
        p.waiting = Math.max(0, time - p.arrival);
        time += p.burst;
        p.turnaround = time - p.arrival;
        queue = queue.filter(proc => proc !== p);
        schedule.push(p);
    }
    return schedule;
}

function roundRobin(timeQuantum) {
    let time = 0;
    let queue = processes.map(p => ({ ...p, remaining: p.burst }));
    let schedule = [];

    while (queue.length > 0) {
        let executed = false;

        for (let i = 0; i < queue.length; i++) {
            let p = queue[i];
            if (p.arrival <= time) {
                let executeTime = Math.min(p.remaining, timeQuantum);
                time += executeTime;
                p.remaining -= executeTime;

                if (p.remaining === 0) {
                    p.waiting = Math.max(0, time - p.arrival - p.burst);
                    p.turnaround = time - p.arrival;
                    schedule.push(p);
                    queue.splice(i, 1);
                    i--;
                } else {
                    queue.push(queue.splice(i, 1)[0]);
                }
                executed = true;
            }
        }
        if (!executed) time++;
    }
    return schedule;
}

function drawGanttChart(schedule) {
    let ganttChart = document.getElementById("ganttChart");
    ganttChart.innerHTML = "";

    schedule.forEach(proc => {
        let div = document.createElement("div");
        div.className = "gantt-block";
        div.innerText = proc.pid;
        ganttChart.appendChild(div);
    });
}
