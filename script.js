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
        stationaryInventory: document.getElementById('menu-stationaryinventory'),
        fixedAssets: document.getElementById('menu-fixed-assets'),
        leave: document.getElementById('menu-leave'),
        meeting: document.getElementById('menu-meeting'),
        manpower: document.getElementById('menu-manpower'),
        interview: document.getElementById('menu-interview'),
        userManage: document.getElementById('menu-usermanage')
    };

    // ၁။ ပထမဦးစွာ Group Titles အားလုံးနှင့် Menu အားလုံးကို မမြင်ရအောင် (display: none) အရင်ပိတ်မည်
    const groupTitles = document.querySelectorAll('.group-title');
    groupTitles.forEach(title => title.style.display = 'none');

    Object.values(menus).forEach(menu => {
        if (menu) menu.style.display = 'none';
    });

    // ၂။ Login ဝင်ထားသော Role အလိုက် လိုအပ်သည့် Menu များနှင့် သက်ဆိုင်ရာ Group Titles များကို ပြမည်
    if (loginRole === 'HR') {
        // HR Group ကို ပေါ်စေရန် ခေါင်းစဉ်နှင့်တကွ ပြမည် (လိုအပ်ပါက သက်ဆိုင်ရာ group-title များကို Index ဖြင့် ခွဲခြားနိုင်သည်)
        groupTitles.forEach(title => {
            if (title.textContent.includes('HR') || title.textContent.includes('Settings')) {
                title.style.display = 'block';
            }
        });
        if (menus.leave) menus.leave.style.display = 'block';
        if (menus.meeting) menus.meeting.style.display = 'block';
        if (menus.manpower) menus.manpower.style.display = 'block';
        if (menus.interview) menus.interview.style.display = 'block';
    }
    else if (loginRole === 'FLEET') {
        groupTitles.forEach(title => {
            if (title.textContent.includes('Fleet')) title.style.display = 'block';
        });
        if (menus.fuel) menus.fuel.style.display = 'block';
        if (menus.maintenance) menus.maintenance.style.display = 'block';
        if (menus.inspection) menus.inspection.style.display = 'block';
    }
    else if (loginRole === 'WAREHOUSE') {
        groupTitles.forEach(title => {
            if (title.textContent.includes('Warehouse')) title.style.display = 'block';
        });
        if (menus.warehouse) menus.warehouse.style.display = 'block';
        if (menus.stock) menus.stock.style.display = 'block';
        if (menus.inventory) menus.inventory.style.display = 'block';
    }
    // --- ADMIN Role (Full Access - အားလုံးပြမည်) ---
    else {
        groupTitles.forEach(title => title.style.display = 'block');
        Object.values(menus).forEach(menu => {
            if (menu) menu.style.display = 'block';
        });
    }

    // Dashboard ကို မည်သည့် Role အတွက်မဆို အမြဲပြထားရန်
    if (menus.dashboard) menus.dashboard.style.display = 'block';
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

// Edit လုပ်ရန် Click ခလုတ်နှိပ်လျှင်
function editItem(id) {
    console.log("Edit item ID: ", id);
    // ဤနေရာတွင် Edit Form သို့မဟုတ် Modal ပေါ်လာမည့် ကုဒ်များ ထည့်နိုင်သည်
    alert("Edit ID: " + id);
}

// Delete လုပ်ရန် Click ခလုတ်နှိပ်လျှင်
function deleteItem(id) {
    if (confirm("ဒီအချက်အလက်ကို ဖျက်မှာ သေချာပါသလား?")) {
        console.log("Delete item ID: ", id);
        // ဤနေရာတွင် Firebase (သို့) Database မှ Data ဖျက်မည့် ကုဒ်ထည့်ပါ
        alert("အောင်မြင်စွာ ဖျက်ပြီးပါပြီ။");
    }
}

        // 4. Render Table with Pagination & Action Dropdown (Highlight Row ပါ ထည့်သွင်းထားသည်)
        function renderTable() {
            const tableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; 

            const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
            if (currentPage > totalPages) currentPage = totalPages;

            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedItems = filteredData.slice(start, end);

            paginatedItems.forEach((item, index) => {
                let cleanDate = item.date ? item.date.split('T')[0] : '';
                const globalIndex = start + index; 

                // Check if this row is currently being edited
                const isEditing = (allData[globalIndex] === allData[editingIndex]);

                const newRow = tableBody.insertRow();
                if (isEditing) {
                    newRow.classList.add('highlight-row'); // Edit လုပ်နေသော row ကို အရောင်တင်ပေးမည်
                }

                newRow.innerHTML = `
                    <td>${start + index + 1}</td>
                    <td>${cleanDate}</td>
                    <td>${item.itemId || ''}</td>
                    <td>${item.itemName || ''}</td>
                    <td>${item.category || ''}</td>
                    <td>${item.quantity || 0}</td>
                    <td>${item.unit || ''}</td>
                    <td>${item.price || 0}</td>
                    <td>${item.totalAmount || 0}</td>
                    <td>${item.supplier || ''}</td>
                    <td>${item.remark || ''}</td>
                    <td>
                        <div class="dropdown">
                            <button onclick="toggleDropdown(event, ${globalIndex})" class="dropbtn">
                                Action <i data-lucide="chevron-down" style="width:12px; height:12px;"></i>
                            </button>
                            <div id="dropdown-${globalIndex}" class="dropdown-content">
                                <button class="edit-action" onclick="editItem(${globalIndex})">
                                    <i data-lucide="edit" style="width:14px;height:14px;"></i> Edit / Stock+
                                </button>
                                <button class="delete-action" onclick="deleteItem(${globalIndex})">
                                    <i data-lucide="trash-2" style="width:14px;height:14px;"></i> Delete
                                </button>
                            </div>
                        </div>
                    </td>
                `;
            });

            document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${totalPages}`;
            document.getElementById('prevBtn').disabled = currentPage === 1;
            document.getElementById('nextBtn').disabled = currentPage === totalPages || totalPages === 0;

            lucide.createIcons();
        }

        // 5. Edit Item & Stock Addition Handler (Highlight လုပ်ရန် renderTable ထပ်ခေါ်ပေးသည်)
        function editItem(index) {
            const item = filteredData[index];
            editingIndex = allData.findIndex(i => i === item); 

            document.getElementById('itemName').value = item.itemName || '';
            document.getElementById('category').value = item.category || '';
            document.getElementById('quantity').value = ''; 
            document.getElementById('unit').value = item.unit || '';
            document.getElementById('price').value = item.price || 0;
            document.getElementById('supplier').value = item.supplier || '';
            document.getElementById('pDate').value = item.date ? item.date.split('T')[0] : '';
            document.getElementById('remark').value = item.remark || '';

            document.getElementById('formTitle').innerHTML = `<i data-lucide="package-plus"></i> Update & Add Stock (${item.itemName} - မူလလက်ကျန်: ${item.quantity})`;
            document.getElementById('submitBtn').innerHTML = `<i data-lucide="refresh-cw"></i> Update Stock (ပေါင်းထည့်ရန်)`;
            
            renderTable(); // Row ကို highlight အရောင်ပြောင်းရန် ဇယားကို ပုံစံအသစ်ပြန်ဖော်မည်
            lucide.createIcons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 8. Export Table Data to CSV/Excel File
        function exportToCSV() {
            if (allData.length === 0) {
                alert("Export လုပ်ရန် Data မရှိသေးပါ။");
                return;
            }

            let csvContent = "data:text/csv;charset=utf-8,";
            // CSV Header
            csvContent += "No.,Date,Item ID,Item Name,Category,Quantity,Unit,Purchase Price,Total Amount,Supplier Name,Remark\r\n";

            // CSV Rows
            allData.forEach((item, index) => {
                let cleanDate = item.date ? item.date.split('T')[0] : '';
                let row = [
                    index + 1,
                    cleanDate,
                    item.itemId || '',
                    `"${item.itemName || ''}"`, // Text ထဲမှာ ကော်မာပါပါက ပြဿနာမရှိစေရန်
                    `"${item.category || ''}"`,
                    item.quantity || 0,
                    item.unit || '',
                    item.price || 0,
                    item.totalAmount || 0,
                    `"${item.supplier || ''}"`,
                    `"${item.remark || ''}"`
                ];
                csvContent += row.join(",") + "\r\n";
            });

            // Download Trigger
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "stationary_inventory_report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

