function applyRoleAccess() {
    // LocalStorage မှ Login ဝင်ထားသော Role ကို ယူမည် (မရှိပါက Default 'ADMIN')
    const loginRole = localStorage.getItem('login_role') || 'ADMIN';

    // Menu Item များကို ID ဖြင့် ရယူမည်
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
        userManage: document.getElementById('menu-usermanage')
    };

    // ၁။ Menu အားလုံးကို ဦးစွာ မမြင်ရအောင် ခေတ္တ ပိတ်ထားမည် (Reset)
    Object.values(menus).forEach(menu => {
        if (menu) menu.style.display = 'none';
    });

    // ၂။ Role အလိုက် သတ်မှတ်ထားသော Menu များကိုသာ ပြသမည် (Show)
    
    // --- HR Role ---
    if (loginRole === 'HR') {
        if (menus.leave) menus.leave.style.display = 'block';
        if (menus.meeting) menus.meeting.style.display = 'block';
        if (menus.manpower) menus.manpower.style.display = 'block';
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

    // --- ADMIN Role --- (Stationery Request, Fixed Access, Meeting Note သာ ပြမည်)
    else if (loginRole === 'ADMIN') {
        if (menus.stationery) menus.stationery.style.display = 'block';
        if (menus.fixedAssets) menus.fixedAssets.style.display = 'block';
        if (menus.meeting) menus.meeting.style.display = 'block';
    }
}

// Log Out ပြုလုပ်သည့် Function
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// DOM ready ဖြစ်သည်နှင့် ချက်ချင်း အလိုအလျောက် စစ်ဆေးမည်
window.addEventListener('DOMContentLoaded', applyRoleAccess);
