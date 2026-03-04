const API_URL = "https://script.google.com/macros/s/AKfycbwv5RL5VEitJQP5z8MibT4FYa5Y12AskKt_xdi1vXdr3HcSfGpPmfPUPG09gh7amDEpnw/exec";

async function loadData() {
    const list = document.getElementById('student-list');
    const totalStudentsEl = document.getElementById('total-students');
    const totalFemaleEl = document.getElementById('total-female');
    
    list.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:30px; color:#94a3b8;'>កំពុងទាញទិន្នន័យ...</td></tr>";

    try {
        const response = await fetch(API_URL);
        const studentData = await response.json();
        
        list.innerHTML = ""; 
        let femaleCount = 0;
        let actualCount = 0;

        studentData.forEach(s => {
            // លក្ខខណ្ឌតឹងរឹង៖ បើគ្មានឈ្មោះ ឬឈ្មោះទទេ មិនបង្ហាញជួរដេកឡើយ
            if (!s.name || String(s.name).trim() === "" || s.name === "undefined") return; 

            actualCount++;
            let genderIconClass = "";
            let genderLabelColor = "";

            if (s.gender === "ស្រី") {
                femaleCount++;
                genderIconClass = "fa-venus color-pink"; 
                genderLabelColor = "#E91E63";
            } else {
                genderIconClass = "fa-mars color-blue"; 
                genderLabelColor = "#4A90E2";
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="color:#94a3b8; font-weight:bold; text-align:center;">${actualCount}</td>
                <td style="font-weight:500; color:#1e293b;">
                    <span class="gender-icon ${genderIconClass}"><i class="fas ${genderIconClass.split(' ')[0]}"></i></span>
                    ${s.name}
                </td>
                <td style="color:${genderLabelColor}; font-weight:500;">${s.gender}</td>
                <td><span class="grade-badge">${s.grade || '-'}</span></td>
            `;
            list.appendChild(row);
        });

        totalStudentsEl.innerText = actualCount;
        totalFemaleEl.innerText = femaleCount;

    } catch (error) {
        list.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#ef4444; padding:30px;'>មិនអាចទាញទិន្នន័យបាន សូមឆែកអ៊ីនធឺណិត!</td></tr>";
    }
}

function filterData() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const rows = document.getElementById('student-list').getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const nameCol = rows[i].getElementsByTagName('td')[1];
        if (nameCol) {
            const nameText = nameCol.textContent || nameCol.innerText;
            rows[i].style.display = nameText.toLowerCase().includes(input) ? "" : "none";
        }
    }
}

function switchTab(tab) {
    const home = document.getElementById('home-page');
    const account = document.getElementById('account-page');
    const title = document.getElementById('page-title');
    const navItems = document.querySelectorAll('.nav-item');

    if (tab === 'home') {
        home.classList.remove('hidden');
        account.classList.add('hidden');
        title.innerText = "បញ្ជីរាយនាមសិស្សរៀន CT";
        navItems[0].classList.add('active');
        navItems[1].classList.remove('active');
    } else {
        home.classList.add('hidden');
        account.classList.remove('hidden');
        title.innerText = "គណនី";
        navItems[0].classList.remove('active');
        navItems[1].classList.add('active');
    }
}

window.onload = loadData;
