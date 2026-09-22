// ==========================================
// 1. Firebase Initialization
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// ==========================================
// 2. Role-Based Access Control (RBAC) Logic
// ==========================================
function applyRoleAccess() {
    // Admin ဖြင့် ဝင်ရောက်လာပါက Role ကို 'ADMIN' ဟု အသေချာဆုံး ဖြစ်စေရန်
    const savedRole = localStorage.getItem('login_role');
    const loginRole = (savedRole) ? savedRole.toUpperCase() : 'ADMIN';

const menus = {
    dashboard: document.getElementById('menu-dashboard'),
    fuel: document.getElementById('menu-fuel'),
    maintenance: document.getElementById('menu-maintenance'),
    inspection: document.getElementById('menu-inspection'),
    warehouse: document.getElementById('menu-warehouse'),
    stock: document.getElementById('menu-stock'),
    inventory: document.getElementById('menu-inventory'),
    stationery: document.getElementById('menu-stationery'),
    stationaryInventory: document.getElementById('menu-stationaryinventory'), // ဤနေရာတွင် ရှိရပါမည်
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

    // ၂။ Login ဝင်ထားသော Role အလိုက် လိုအပ်သည့် Menu များကိုသာ ပြမည်
    if (loginRole === 'HR') {
        if (menus.leave) menus.leave.style.display = 'block';
        if (menus.meeting) menus.meeting.style.display = 'block';
        if (menus.manpower) menus.manpower.style.display = 'block';
        if (menus.interview) menus.interview.style.display = 'block';
    }
    else if (loginRole === 'FLEET') {
        if (menus.fuel) menus.fuel.style.display = 'block';
        if (menus.maintenance) menus.maintenance.style.display = 'block';
        if (menus.inspection) menus.inspection.style.display = 'block';
    }
    else if (loginRole === 'WAREHOUSE') {
        if (menus.warehouse) menus.warehouse.style.display = 'block';
        if (menus.stock) menus.stock.style.display = 'block';
        if (menus.inventory) menus.inventory.style.display = 'block';
    }
    // --- ADMIN Role (Full Access - အားလုံးပြမည်) ---
    else {
        Object.values(menus).forEach(menu => {
            if (menu) menu.style.display = 'block';
        });
    }
}


// ==========================================
// 3. Log Out Function
// ==========================================
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}


// ==========================================
// 4. Page Load Event Listener
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    applyRoleAccess();
});
