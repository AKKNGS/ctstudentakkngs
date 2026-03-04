// ១. អាសយដ្ឋាន Web App URL ពី Google Sheets របស់អ្នក
const API_URL = "https://script.google.com/macros/s/AKfycbwv5RL5VEitJQP5z8MibT4FYa5Y12AskKt_xdi1vXdr3HcSfGpPmfPUPG09gh7amDEpnw/exec";

// ២. បង្កើត Function សម្រាប់ទាញទិន្នន័យពី Google Sheets
async function loadData() {
    const list = document.getElementById('student-list');
    const totalStudentsEl = document.getElementById('total-students');
    const totalFemaleEl = document.getElementById('total-female');
    
    // បង្ហាញសារថាកំពុងទាញទិន្នន័យ
    list.innerHTML = "<tr><td colspan='4' style='text-align:center;'>កំពុងទាញទិន្នន័យ...</td></tr>";

    try {
        // ទាញទិន្នន័យពី API_URL
        const response = await fetch(API_URL);
        const studentData = await response.json();
        
        // លុបសារ "កំពុងទាញ" ចេញវិញ
        list.innerHTML = ""; 
        let femaleCount = 0;

        // បញ្ចូលទិន្នន័យទៅក្នុងតារាង
        studentData.forEach(s => {
            let genderIconClass = "";
            if (s.gender === "ស្រី") {
                femaleCount++;
                genderIconClass = "fa-venus gender-icon color-pink"; // Icon ស្រី
            } else if (s.gender === "ប្រុស") {
                genderIconClass = "fa-mars gender-icon color-blue"; // Icon ប្រុស
            }

            const row = `<tr>
                <td>${s.id}</td>
                <td><i class="fas ${genderIconClass}"></i>${s.name}</td>
                <td>${s.gender}</td>
                <td>${s.grade || ""}</td>
            </tr>`;
            list.innerHTML += row;
        });

        // បង្ហាញចំនួនសរុបនៅលើកាត (Card)
        totalStudentsEl.innerText = studentData.length;
        totalFemaleEl.innerText = femaleCount;

    } catch (error) {
        console.error("Error loading data:", error);
        list.innerHTML = "<tr><td colspan='4' style='text-align:center; color:red;'>ការទាញទិន្នន័យមិនជោគជ័យ!</td></tr>";
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