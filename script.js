// ==========================================
// 1. Firebase Initialization
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
// လိုအပ်ပါက Google Auth အတွက် ဤနေရာတွင် ထပ်မံ import လုပ်နိုင်ပါသည် (ဥပမာ- getAuth, GoogleAuthProvider စသည်ဖြင့်)

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


// ==========================================
// 2. Role-Based Access Control (RBAC) Logic
// ==========================================
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
    
    // --- HR Role ---
    if (loginRole === 'HR') {
        if (menus.leave) menus.leave.style.display = 'block';
        if (menus.meeting) menus.meeting.style.display = 'block';
        if (menus.manpower) menus.manpower.style.display = 'block';
        if (menus.interview) menus.interview.style.display = 'block';
    }

    // --- FLEET Role ---
    else if (loginRole === 'FLEET') {
        if (menus.fuel) menus.fuel.style.display = 'block';
        if (menus.maintenance) menus.maintenance.style.display = 'block';
        if (menus.inspection) menus.inspection.style.display = 'block';
    }

    // --- WAREHOUSE Role ---
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


// ==========================================
// 3. Gmail / Google Authentication Process (Placeholder)
// ==========================================
// နောင်တွင် Firebase Google Sign-In ဖြင့် ချိတ်ဆက်ရန် ဤနေရာတွင် Function အသစ်ရေးသားနိုင်ပါသည်
function loginWithGoogle() {
    // ဥပမာ - Firebase Authentication (Google Provider) ဖြင့် ဝင်ရောက်ရန် ကုဒ်များကို ဤနေရာတွင် ထည့်သွင်းပါမည်။
    console.log("Google Sign-In process will be implemented here.");
}


// ==========================================
// 4. Log Out Function
// ==========================================
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}


// ==========================================
// 5. Page Load Event Listener
// ==========================================
window.addEventListener('DOMContentLoaded', applyRoleAccess);
