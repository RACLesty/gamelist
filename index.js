let participants = [];
let matchQueue = [];
let matchHistory = [];

function addParticipant() {
  const name = document.getElementById('participantName').value.trim();
  if (name) {
    participants.push(name);
    document.getElementById('participantName').value = '';
    updateParticipantList();
  }
}

function updateParticipantList() {
  const list = document.getElementById('participantList');
  const selection = document.getElementById('selectionList');
  list.innerHTML = '';
  selection.innerHTML = '';

  participants.forEach((name, index) => {
    list.innerHTML += `<div class="participant-item">${name}</div>`;
    selection.innerHTML += `
      <div>
        <label>
          <input type="checkbox" id="select_${index}" />
          ${name}
        </label>
      </div>`;
  });
}

function addMatch() {
  const selected = [];
  participants.forEach((name, index) => {
    const checkbox = document.getElementById(`select_${index}`);
    if (checkbox && checkbox.checked) {
      selected.push(name);
    }
  });

  if (selected.length < 2 || selected.length > 5) {
    alert("Select between 2 and 5 participants!");
    return;
  }

  matchQueue.push(selected);
  updateMatchQueue();

 
  document.querySelectorAll('#selectionList input').forEach(input => input.checked = false);
}


function updateMatchQueue() {
  const queue = document.getElementById('matchQueue');
  queue.innerHTML = '';

  matchQueue.forEach((match, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Match ${index + 1}:</strong> ${match.join(', ')}
      <button onclick="finishMatch(${index}, 'Win')">Win</button>
      <button onclick="finishMatch(${index}, 'Lose')">Lose</button>
      <button onclick="deleteMatch(${index})">Delete</button>
    `;
    queue.appendChild(li);
  });
}


function finishMatch(index, result) {
  const match = matchQueue[index];
  matchHistory.push({ participants: match, result });
  matchQueue.splice(index, 1);
  updateMatchQueue();
  updateMatchHistory();
}


function deleteMatch(index) {
  matchQueue.splice(index, 1);
  updateMatchQueue();
}


function editMatch(index) {
  const match = matchQueue[index];
  document.querySelectorAll('#selectionList input').forEach((checkbox, idx) => {
    checkbox.checked = match.includes(participants[idx]);
  });
  matchQueue.splice(index, 1);
  updateMatchQueue();
}


function updateMatchHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  matchHistory.forEach((match, index) => {
    const li = document.createElement('li');
    li.textContent = `Match ${index + 1}: ${match.participants.join(', ')} - ${match.result}`;
    historyList.appendChild(li);
  });
}
