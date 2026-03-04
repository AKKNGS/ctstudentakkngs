// ១. អាសយដ្ឋាន Web App URL ពី Google Sheets របស់អ្នក
const API_URL = "https://script.google.com/macros/s/AKfycbwv5RL5VEitJQP5z8MibT4FYa5Y12AskKt_xdi1vXdr3HcSfGpPmfPUPG09gh7amDEpnw/exec";

// ២. បង្កើត Function សម្រាប់ទាញទិន្នន័យពី Google Sheets
async function loadData() {
    const list = document.getElementById('student-list');
    const totalStudentsEl = document.getElementById('total-students');
    const totalFemaleEl = document.getElementById('total-female');
    
    list.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:20px;'>កំពុងទាញទិន្នន័យ...</td></tr>";

    try {
        const response = await fetch(API_URL);
        const studentData = await response.json();
        
        list.innerHTML = ""; 
        let femaleCount = 0;
        let actualCount = 0;

        studentData.forEach(s => {
            // ១. ឆែកមើល Row ទទេ៖ បើគ្មានឈ្មោះ គឺមិនបង្ហាញឡើយ
            if (!s.name || s.name.trim() === "") return; 

            actualCount++;
            let genderIconClass = "";
            if (s.gender === "ស្រី") {
                femaleCount++;
                genderIconClass = "fa-venus color-pink"; 
            } else {
                genderIconClass = "fa-mars color-blue"; 
            }

            const row = `<tr>
                <td>${actualCount}</td>
                <td><span class="gender-icon ${genderIconClass}"><i class="fas ${genderIconClass.split(' ')[0]}"></i></span> ${s.name}</td>
                <td style="color: ${s.gender === 'ស្រី' ? '#E91E63' : '#4A90E2'};">${s.gender}</td>
                <td><span style="background:#eee; padding:2px 8px; border-radius:5px; font-size:0.8rem;">${s.grade || '-'}</span></td>
            </tr>`;
            list.innerHTML += row;
        });

        totalStudentsEl.innerText = actualCount;
        totalFemaleEl.innerText = femaleCount;

    } catch (error) {
        list.innerHTML = "<tr><td colspan='4' style='text-align:center; color:red;'>មិនអាចទាញទិន្នន័យបាន!</td></tr>";
    }
}
// ៣. Function សម្រាប់ប្តូរទំព័រ Home និង Account
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

// ៤. ហៅឱ្យ loadData ដំណើរការនៅពេលបើក App ភ្លាម

window.onload = loadData;

