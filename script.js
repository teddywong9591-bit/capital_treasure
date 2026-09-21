<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDXxz98pnMZd9M0Hwc1He4mycOGZDub5xw",
    authDomain: "capitaltreasure-2020.firebaseapp.com",
    databaseURL: "https://capitaltreasure-2020-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "capitaltreasure-2020",
    storageBucket: "capitaltreasure-2020.firebasestorage.app",
    messagingSenderId: "27339976932",
    appId: "1:27339976932:web:50881deb7f2334ef237cf1",
    measurementId: "G-Z8C39DE428"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

function applyRoleAccess() {
    // LocalStorage မှ Login ဝင်ထားသော Role ကို ယူမည် (မရှိပါက Default 'ADMIN')
    const loginRole = localStorage.getItem('login_role') || 'ADMIN';

    // HTML ထဲရှိ Menu ID အားလုံးကို ရယူခြင်း
    const menus = {
        dashboard: document.getElementById('menu-dashboard'),
        fuel: document.getElementById('menu-fuel'),
        maintenance: document.getElementById('menu-maintenance'),
        inspection: document.getElementById('menu-inspection'),
        warehouse: document.getElementById('menu-warehouse'),
        stock: document.getElementById('menu-stock'),
        inventory: document.getElementById('menu-inventory'),
        stationery: document.getElementById('menu-stationery'),
        fixedAssets: document.getElementById('menu-fixed-assets'),
        leave: document.getElementById('menu-leave'),
        meeting: document.getElementById('menu-meeting'),
        manpower: document.getElementById('menu-manpower'),
        interview: document.getElementById('menu-interview'),
        userManage: document.getElementById('menu-usermanage')
    };

    // ၁။ ပထမဦးစွာ Menu အားလုံးကို မမြင်ရအောင် (display: none) အရင်ပိတ်မည်
    Object.values(menus).forEach(menu => {
        if (menu) menu.style.display = 'none';
    });

    // ၂။ Login ဝင်ထားသော Role အလိုက် လိုအပ်သည့် Menu များကိုသာ ပြမည် (display: block)
    
    // --- HR Role (Dashboard မပါပါ) ---
    if (loginRole === 'HR') {
        if (menus.leave) menus.leave.style.display = 'block';
        if (menus.meeting) menus.meeting.style.display = 'block';
        if (menus.manpower) menus.manpower.style.display = 'block';
        if (menus.interview) menus.interview.style.display = 'block';
    }

    // --- FLEET Role (Dashboard မပါပါ) ---
    else if (loginRole === 'FLEET') {
        if (menus.fuel) menus.fuel.style.display = 'block';
        if (menus.maintenance) menus.maintenance.style.display = 'block';
        if (menus.inspection) menus.inspection.style.display = 'block';
    }

    // --- WAREHOUSE Role (Dashboard မပါပါ) ---
    else if (loginRole === 'WAREHOUSE') {
        if (menus.warehouse) menus.warehouse.style.display = 'block';
        if (menus.stock) menus.stock.style.display = 'block';
        if (menus.inventory) menus.inventory.style.display = 'block';
    }

    // --- ADMIN Role (Full Access - Dashboard အပါအဝင် အားလုံးပြမည်) ---
    else if (loginRole === 'ADMIN') {
        Object.values(menus).forEach(menu => {
            if (menu) menu.style.display = 'block';
        });
    }
}

// Login စစ်ဆေးသည့် Function
function loginUser(username, password) {
    if (username === 'abc123' && password === 'abc1234') {
        localStorage.setItem('login_role', 'ADMIN');
        localStorage.setItem('user_role', 'ADMIN');
        localStorage.setItem('logged_in_user', 'ABC Admin');
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
}

// Log Out ပြုလုပ်သည့် Function
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// Page Load ဖြစ်သည်နှင့် တစ်ပြိုင်နက် အလိုအလျောက် စစ်ဆေးမည်
window.addEventListener('DOMContentLoaded', applyRoleAccess);
