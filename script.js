// Dynamic Role Access Control Logic
function applyRoleAccess() {
    // LocalStorage မှ Login ဝင်ထားသော Role ကို ယူမည် (မရှိပါက Default 'ADMIN')
    const loginRole = localStorage.getItem('login_role') || 'ADMIN';

    // Hide/Show လုပ်ချင်သော Menu Element များကို ID ဖြင့် ရယူမည်
    const dashboardMenu = document.getElementById('menu-dashboard');
    const stationeryMenu = document.getElementById('menu-stationery');
    const userManageMenu = document.getElementById('menu-usermanage');

    // 1. HR Role: Dashboard နှင့် Stationery ကို Hide မည်
    if (loginRole === 'HR') {
        if (dashboardMenu) dashboardMenu.style.display = 'none';
        if (stationeryMenu) stationeryMenu.style.display = 'none';
    }

    // 2. WAREHOUSE Role: Dashboard ကို Hide မည်
    if (loginRole === 'WAREHOUSE') {
        if (dashboardMenu) dashboardMenu.style.display = 'none';
    }

    // 3. FLEET Role: Dashboard နှင့် User Manage ကို Hide မည်
    if (loginRole === 'FLEET') {
        if (dashboardMenu) dashboardMenu.style.display = 'none';
        if (userManageMenu) userManageMenu.style.display = 'none';
    }
}

// Log Out ပြုလုပ်သည့် Function
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// Page တိုင်းတွင် DOM ready ဖြစ်သည်နှင့် ချက်ချင်း အလိုအလျောက် စစ်ဆေးမည်
window.addEventListener('DOMContentLoaded', applyRoleAccess);
