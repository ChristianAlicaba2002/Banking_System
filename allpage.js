//Switch Display
const DisplayAccounts = document.getElementById("DisplayAccounts");
const Transactions = document.getElementById("Transactions");
const BestAccounts = document.getElementById("BestAccounts");
const Top3Accounts = document.getElementById("Top3Accounts");
const vipAccountsList = document.getElementById("vip-accounts-list")
const Exit = document.getElementById("Exit");
const template_display = document.getElementById("template_display")
const templatedisplay = document.getElementById("templatedisplay")

function totalAccount(){
    let AccountList = document.getElementById("AccountList");
    const alluser = JSON.parse(localStorage.getItem("users"));

    if(!alluser){
         AccountList.innerHTML = `Account List: 0`
    }else{
            for(let q = 0; q <= alluser.length; q++){
                AccountList.innerHTML = `Account List: ${q}`
            }
       }
}

// function displayData(){
//     const getAllData = JSON.parse(localStorage.getItem("users"));
//     let showuser = "";
//     for(let q = 0; q < getAllData.length; q++ ){
//         showuser +=
//         `
//             <tr>      
//                     <th>${getAllData[q].AccNum}</th>
//                     <th>${getAllData[q].AccName}</th>
//                     <th>${getAllData[q].AccGender}</th>
//                     <th>${getAllData[q].Acctype}</th>
//                     <th>&#8369;${getAllData[q].balance.toLocaleString()}</th>
//                     <th>${getAllData[q].AccAddress}</th>
//                     <th><button onclick=deleted(${q})>Deleted</button></th>
//             </tr>
//             `;
// }

// }

DisplayAccounts.addEventListener('click', () => {
    document.getElementById("AccountList").style.display = "inline-block"
    totalAccount()
    document.getElementById('tableDisplayAccounts').style.display = "inline-block"
    document.getElementById("tableTransaction").style.display = "none"
    document.getElementById("Top3accounts").style.display = "none"
    document.getElementById("vip-accounts-list").style.display = "none"
    document.getElementById("top3").style.display = "none"
    DisplayAccounts.style.color = "green"
    Transactions.style.color = "black"
    document.getElementById("view-vip-button").style.color = "black"
    // BestAccounts.style.color = "black"
    Top3Accounts.style.color = "black"
    Exit.style.color = "black"
    displayProduct()
    document.getElementById("pagination_controls").style.display = "inline-block"
    document.getElementById("paginationcontrols").style.display = "none"
});
Transactions.addEventListener("click", () => {
    document.getElementById("AccountList").style.display = "none"
    document.getElementById("tableTransaction").style.display = "inline-block"
    document.getElementById('tableDisplayAccounts').style.display = "none"
    document.getElementById("Top3accounts").style.display = "none"
    document.getElementById("vip-accounts-list").style.display = "none"
    document.getElementById("top3").style.display = "none"
    DisplayAccounts.style.color = "black"
    Transactions.style.color = "green"
    document.getElementById("view-vip-button").style.color = "black"
    // BestAccounts.style.color = "black"
    Top3Accounts.style.color = "black"
    Exit.style.color = "black"
    TransactionShow()
    document.getElementById("pagination_controls").style.display = "none"
    document.getElementById("paginationcontrols").style.display = "inline-block"
});
// BestAccounts.addEventListener("click", () => {
//     document.getElementById("AccountList").style.display = "none"
//     document.getElementById("tableTransaction").style.display = "none"
//     document.getElementById('tableDisplayAccounts').style.display = "none"
//     document.getElementById("Top3accounts").style.display = "none"
//     document.getElementById("vip-accounts-list").style.display = "none"
//     document.getElementById("top3").style.display = "none"
//     DisplayAccounts.style.color = "black"
//     document.getElementById("view-vip-button").style.color = "black"
//     Transactions.style.color = "black"
//     BestAccounts.style.color = "blue"
//     Top3Accounts.style.color = "black"
//     Exit.style.color = "black"
// })
Top3Accounts.addEventListener("click", () => {
    Top3accounts();
    document.getElementById("AccountList").style.display = "none"
    document.getElementById("tableTransaction").style.display = "none"
    document.getElementById('tableDisplayAccounts').style.display = "none"
    document.getElementById("Top3accounts").style.display = "inline-block"
    document.getElementById("vip-accounts-list").style.display = "none"
    document.getElementById("top3").style.display = "inline-block"
    document.getElementById("view-vip-button").style.color = "black"
    DisplayAccounts.style.color = "black"
    Transactions.style.color = "black"
    // BestAccounts.style.color = "black"
    Top3Accounts.style.color = "green"
    Exit.style.color = "black"
    document.getElementById("pagination_controls").style.display = "none"
    document.getElementById("paginationcontrols").style.display = "none"
})

Exit.addEventListener("click", () => {
    DisplayAccounts.style.color = "black"
    Transactions.style.color = "black"
    // BestAccounts.style.color = "black"
    Top3Accounts.style.color = "black"
    Exit.style.color = "blue"
})

const getAllUser = JSON.parse(localStorage.getItem('users')) || [];
let currentPage = 1;
const itemsPerPage = 5;

function displayProduct() {
    let showuser = "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = getAllUser.slice(startIndex, endIndex);

    if (paginatedUsers.length === 0) {
        alert("No Account exists.");
    } else {
        for (let q = 0; q < paginatedUsers.length; q++) {
            paginatedUsers.sort((w,b) => b.balance - w.balance);  
            showuser += `
                <tr>
                    <th>${paginatedUsers[q].AccNum}</th>
                    <th>${paginatedUsers[q].AccName}</th>
                    <th>${paginatedUsers[q].AccGender}</th>
                    <th>${paginatedUsers[q].Age}</th>
                    <th>${paginatedUsers[q].Acctype}</th>
                    <th>&#8369;${paginatedUsers[q].balance.toLocaleString()}</th>
                    <th>${paginatedUsers[q].AccAddress}</th>
                    <th><button onclick="deleted(${q})">Deleted</button></th>
                </tr>
            `;
        }
        document.getElementById('template_display').innerHTML = showuser;
        updatePagination();
    }
}
function deleted(q){
    alert("Delete Successfully")
    getAllUser.splice(q,1)
    totalAccount()
}

function updatePagination() {
    const totalPages = Math.ceil(getAllUser.length / itemsPerPage);
    let paginationButtons = "";

    for (let i = 1; i <= totalPages; i++) {
        paginationButtons += `<button onclick="goToPage(${i})">${i}</button>`;
    }

    document.getElementById('pagination_controls').innerHTML = paginationButtons;
}
function goToPage(pageNumber) {
    currentPage = pageNumber;
    displayProduct();
}


const getAllUser1 = JSON.parse(localStorage.getItem('transac')) || [];
let currentPage1 = 1;
const itemsPerPage1 = 5;

function TransactionShow() {
    const startIndex1 = (currentPage1 - 1) * itemsPerPage1;
    const endIndex = startIndex1 + itemsPerPage1;
    const paginatedALLUsers = getAllUser1.slice(startIndex1, endIndex);
    
    if(paginatedALLUsers === 0) {
        alert("No transaction yet.")
    } else {
        let showuser1 = "";
        for (let i = 0; i < paginatedALLUsers.length; i++) {
            paginatedALLUsers.sort((a,b) => a.time - b.time);  
            showuser1 +=
                `
                    <tr>      
                            <th>${paginatedALLUsers[i].AccNum}</th>
                            <th>${paginatedALLUsers[i].AccName}</th>
                            <th>${paginatedALLUsers[i].Action}</th>
                            <th>&#8369;${paginatedALLUsers[i].Amount.toLocaleString()}</th>
                            <th>&#8369;${paginatedALLUsers[i].balance.toLocaleString()}</th>
                            <th>${paginatedALLUsers[i].Time}</th>
                            <th>${paginatedALLUsers[i].Date}</th>
                    </tr>
                    `;
        }
        document.getElementById('templatedisplay').innerHTML = showuser1;
        updatePagination1();
    }
}
function updatePagination1() {
    const totalPages = Math.ceil(getAllUser1.length / itemsPerPage1);
    let AllpaginationButtons1 = "";

    for (let i = 1; i <= totalPages; i++) {
        AllpaginationButtons1 += `<button onclick="goToPage1(${i})">${i}</button>`;
    }
    document.getElementById('paginationcontrols').innerHTML = AllpaginationButtons1;
}
function goToPage1(pageNumber1) {
    currentPage1 = pageNumber1;
     TransactionShow();
}




setInterval(Updated, 1000)
Updated()
function Updated() {
    let date = new Date();
    time.innerHTML = formateTime(date)

    function formateTime() {
        let hours = date.getHours()
        let mins = date.getMinutes()
        let amorpm = hours >= 12 ? "pm" : "am"

        hours = (hours % 12) || 12

        hours = formattimeezone(hours)
        mins = formattimeezone(mins)
        // secs = formattimeezone(secs)


        return `${hours}:${mins} ${amorpm}`

    }
    function formattimeezone(time) {
        time = time.toString()
        return time.length < 2 ? "0" + time : time
    }
}

function Top3accounts() {
    let top3templatedisplay = document.getElementById("top3templatedisplay");
    let allAccounts = JSON.parse(localStorage.getItem("users")) || [];

    if (allAccounts.length === 0) {
        alert("No transaction yet");
    } else {
        allAccounts = allAccounts.filter(account => account.balance >= 500000);

        allAccounts.sort((a, b) => b.balance - a.balance);

        let top3Accounts = allAccounts.slice(0, 3);
        let showTop3 = top3Accounts.map(account => 
            `
            <tr>
                <th>${account.AccNum}</th>
                <th>${account.AccName}</th>
                <th>&#8369;${account.balance.toLocaleString()}</th>
            </tr>
        `).join("");

        top3templatedisplay.innerHTML = showTop3;
    }
}

function toggleVipAccounts() {
    const vipAccountsList = document.getElementById('vip-accounts-list');
    const button = document.getElementById('view-vip-button');
    document.getElementById("AccountList").style.display = "none"
    document.getElementById('tableDisplayAccounts').style.display = "none"
    document.getElementById("tableTransaction").style.display = "none"
    document.getElementById("Top3accounts").style.display = "none"
    document.getElementById("vip-accounts-list").style.display = "none"
     document.getElementById("pagination_controls").style.display = "none"
    document.getElementById("paginationcontrols").style.display = "none"
    document.getElementById("top3").style.display = "none"
    document.getElementById("view-vip-button").style.color = "green"
    DisplayAccounts.style.color = "black"
    Transactions.style.color = "black"
    //BestAccounts.style.color = "black"
    Top3Accounts.style.color = "black"
    Exit.style.color = "black"


    if(vipAccountsList.style.display === 'none') {
        vipAccountsList.style.display = 'block';
        viewVipAccounts();
        button.innerText = 'VIP Accounts';
    }
}

function viewVipAccounts() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const vipAccountsList = document.getElementById('vip-accounts-list');
    vipAccountsList.innerHTML = '';
    users.sort((q,b) => b.balance - q.balance);  

    const categories = {
        Platinum: [],
        Gold: [],
        Silver: [],
        Bronze: [],
    };
    users.forEach(user => {
        if (user.balance >= 0 && user.balance < 50000) {
            categories.Bronze.push(user);
        } else if (user.balance >= 50000 && user.balance < 1000000) {
            categories.Silver.push(user);
        }else if (user.balance >= 1000000 && user.balance < 50000000) {
            categories.Gold.push(user);
        }else if (user.balance >= 50000000 && user.balance < 500000000) {
            categories.Platinum.push(user);
        }
    });
    for (const[category, users] of Object.entries(categories)) {
        if (users.length > 0){
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `<h2>${category}</h2>`;
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `${user.AccName} - Balance: ₱${user.balance.toLocaleString()}`;
                categoryDiv.appendChild(userDiv);
            });
            vipAccountsList.appendChild(categoryDiv);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem("LoggIn") != "true") {
        //alert(`You can't proceed without login `)
        window.location.assign("CreateAccount.html")
    }
});

document.addEventListener("DOMContentLoaded", () => {
    Exit.addEventListener("click", () => {
        sessionStorage.clear()
        window.location.assign("CreateAccount.html")
    })
})
