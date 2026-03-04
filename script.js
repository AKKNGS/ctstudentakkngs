const API_URL = "https://script.google.com/macros/s/AKfycbwv5RL5VEitJQP5z8MibT4FYa5Y12AskKt_xdi1vXdr3HcSfGpPmfPUPG09gh7amDEpnw/exec";
let allStudents = [];

async function loadData() {
    const grid = document.getElementById('student-grid');
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>កំពុងទាញទិន្នន័យ...</p>";

    try {
        const response = await fetch(API_URL);
        allStudents = await response.json();
        
        displayStudents(allStudents);
    } catch (error) {
        grid.innerHTML = "<p style='grid-column: 1/-1; color:red;'>មិនអាចទាញទិន្នន័យបាន!</p>";
    }
}

function displayStudents(data) {
    const grid = document.getElementById('student-grid');
    grid.innerHTML = "";
    let femaleCount = 0;
    let actualCount = 0;

    data.forEach(s => {
        if (!s.name || String(s.name).trim() === "") return;

        actualCount++;
        const isFemale = s.gender === "ស្រី";
        if (isFemale) femaleCount++;

        const card = document.createElement('div');
        card.className = 'student-card shadow';
        card.onclick = () => showDetails(s, actualCount);
        
        card.innerHTML = `
            <span class="id-badge">ID: ${actualCount}</span>
            <div class="g-icon ${isFemale ? 'bg-pink' : 'bg-blue'}">
                <i class="fas ${isFemale ? 'fa-venus' : 'fa-mars'}"></i>
            </div>
            <span class="name">${s.name}</span>
            <span class="label" style="color:${isFemale ? '#ed64a6' : '#4A90E2'}">${s.gender}</span>
        `;
        grid.appendChild(card);
    });

    document.getElementById('total-students').innerText = actualCount;
    document.getElementById('total-female').innerText = femaleCount;
}

function showDetails(s, id) {
    const modal = document.getElementById('detail-modal');
    const body = document.getElementById('modal-body');
    const isFemale = s.gender === "ស្រី";

    body.innerHTML = `
        <div class="g-icon ${isFemale ? 'bg-pink' : 'bg-blue'}" style="width:60px; height:60px; font-size:1.5rem;">
            <i class="fas ${isFemale ? 'fa-venus' : 'fa-mars'}"></i>
        </div>
        <h2 style="margin: 15px 0;">${s.name}</h2>
        <div style="text-align: left; background: #f7fafc; padding: 15px; border-radius: 12px;">
            <p><strong>លរ:</strong> ${id}</p>
            <p><strong>ភេទ:</strong> ${s.gender}</p>
            <p><strong>ថ្នាក់:</strong> ${s.grade || 'មិនទាន់បញ្ជាក់'}</p>
        </div>
        <button onclick="closeModal()" style="margin-top:20px; width:100%; padding:12px; border:none; background:var(--primary); color:white; border-radius:10px;">បិទ</button>
    `;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('detail-modal').style.display = "none";
}

function filterData() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = allStudents.filter(s => s.name && s.name.toLowerCase().includes(query));
    displayStudents(filtered);
}

function switchTab(tab) {
    const home = document.getElementById('home-page');
    const account = document.getElementById('account-page');
    const navItems = document.querySelectorAll('.nav-item');

    if (tab === 'home') {
        home.classList.remove('hidden'); account.classList.add('hidden');
        navItems[0].classList.add('active'); navItems[1].classList.remove('active');
    } else {
        home.classList.add('hidden'); account.classList.remove('hidden');
        navItems[0].classList.remove('active'); navItems[1].classList.add('active');
    }
}

window.onclick = (event) => {
    const modal = document.getElementById('detail-modal');
    if (event.target == modal) closeModal();
}

window.onload = loadData;
