const templatedisplay = document.getElementById("templatedisplay")
let totalBal = document.getElementById("totalBal");
let getacc = localStorage.getItem("currentLogin");
let balance = 0;
const transac = []

function deposits() {
    document.getElementById("deposit-portal").style.display = "inline-block"
    document.getElementById("withdraw-portal").style.display = " none"
    document.getElementById('tableTransactions').style.display = "none"
    document.getElementById("transferFunds").style.display = "none"
    document.getElementById("welcome").style.display = "none"
    document.getElementById("Transaction").style.display = "none"
    document.getElementById("number").style.display = "inline-block"
    document.getElementById("details").style.display = "inline-block"
    document.getElementById("username").style.display = "inline-block"
    document.getElementById("deposit-btn").style.backgroundColor = "skyBlue"
    document.getElementById("withdraw-btn").style.backgroundColor = "lightGrey"
    document.getElementById("transaction-btn").style.backgroundColor = "lightGrey"
    document.getElementById("transfer-btn").style.backgroundColor = "lightGrey"
    document.getElementById("Account_btn").style.backgroundColor = "lightGrey"
    depositremove()
}

function withdraws() {
    withdrawremove()
    document.getElementById("withdraw-portal").style = "display: inline-block"
    document.getElementById('tableTransactions').style.display = "none"
    document.getElementById("deposit-portal").style.display = " none"
    document.getElementById("transferFunds").style.display = "none"
    document.getElementById("transfer-btn").style.display = "inline-block";
    document.getElementById("welcome").style.display = "none"
    document.getElementById("Transaction").style.display = "none"
    document.getElementById("number").style.display = "inline-block"
    document.getElementById("details").style.display = "inline-block"
    document.getElementById("username").style.display = "inline-block"
    document.getElementById("withdraw-btn").style.backgroundColor = "skyBlue"
    document.getElementById("deposit-btn").style.backgroundColor = "lightGrey"
    document.getElementById("transfer-btn").style.backgroundColor = "lightGrey"
    document.getElementById("transaction-btn").style.backgroundColor = "lightGrey"
    document.getElementById("Account_btn").style.backgroundColor = "lightGrey"
}
function Transferfunds() {
    document.getElementById("withdraw-portal").style = "display: none"
    document.getElementById('tableTransactions').style.display = "none"
    document.getElementById("deposit-portal").style.display = " none"
    document.getElementById("Transaction").style.display = "none"
    document.getElementById("transferFunds").style.display = "inline-block"
    document.getElementById("welcome").style.display = "none"
    document.getElementById("number").style.display = "none"
    document.getElementById("details").style.display = "inline-block"
    document.getElementById("username").style.display = "none"
    document.getElementById("transfer-btn").style.backgroundColor = "skyBlue"
    document.getElementById("withdraw-btn").style.backgroundColor = "lightGrey"
    document.getElementById("deposit-btn").style.backgroundColor = "lightGrey"
    document.getElementById("transaction-btn").style.backgroundColor = "lightGrey"
    document.getElementById("Account_btn").style.backgroundColor = "lightGrey"
}

function Transaction() {
    document.getElementById('tableTransactions').style.display = "inline-block"
    document.getElementById("withdraw-portal").style.display = " none"
    document.getElementById("deposit-portal").style.display = " none"
    document.getElementById("transferFunds").style.display = "none"
    document.getElementById("Transaction").style.display = "inline-block"
    document.getElementById("welcome").style.display = "none"
    document.getElementById("number").style.display = "none"
    document.getElementById("details").style.display = "none"
    document.getElementById("transaction-btn").style.backgroundColor = "SkyBlue"
    document.getElementById("deposit-btn").style.backgroundColor = "lightGrey"
    document.getElementById("withdraw-btn").style.backgroundColor = "lightGrey"
    document.getElementById("Account_btn").style.backgroundColor = "lightGrey"
    document.getElementById("transfer-btn").style.backgroundColor = "lightGrey"
    depositTransaction()
}
function Accounts() {
    window.location.assign("Account.html")
}


function depositTransaction() {
    const transac = JSON.parse(localStorage.getItem('transac')) || [];
    let showtransaction = "";
    if(transac === 0){
        alert("No Transaction yet.")
        return
    }else{
            transac.forEach(trans => {
                if(trans.AccNum == getacc){
                        showtransaction +=
                        `
                                <tr>      
                                        <th>${trans.AccNum}</th>
                                        <th>${trans.AccName}</th>
                                        <th>${trans.Action}</th>
                                        <th>&#8369;${trans.Amount.toLocaleString()}</th>
                                        <th>${trans.Time}</th>
                                        <th>${trans.Date}</th>                        
                                </tr>
                            `
                        }
                        templatedisplay.innerHTML = showtransaction;
                    
                });  
        }
}
//NUMBERS FUNCTION
let display = document.getElementById("depositamount");
let display1 = document.getElementById("withdrawamount");

function amount(value) {
    display.value += value;
    display1.value += value;
}
function cleardisplay() {
    display.value = ""
    display1.value = ""

}

//TRANSACTION
function depositremove() {
    depositamount.value = ""
}
function withdrawremove() {
    withdrawamount.value = ""
}
function Updated() {
    let date = new Date();
    let hours = date.getHours()
    let mins = date.getMinutes()
    let amorpm = hours >= 12 ? "pm" : "am"
    hours = (hours % 12) || 12

    mins = mins < 10 ? '0' + mins : mins
    hours = hours < 10 ? '0' + hours : hours

    return `${hours}:${mins}${amorpm}`
}
//DEPOSIT FUNCTION
function deposit() {
    let depositamount = parseInt(document.getElementById("depositamount").value);
    let transac = JSON.parse(localStorage.getItem("transac")) || [];                
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let balance = parseFloat(localStorage.getItem('balance')) || 0;

        users.forEach(userGO => {
            if(userGO.AccNum == getacc){
            if(depositamount <= 999) {
                alert(`Please Deposit more than ₱1,000`);
                depositremove();
                return;
            }else if(depositamount > 500001){
                alert("Sorry we can't accept that kind of amount, because our maximun amount for deposit is ₱500,000")
                depositremove();
                return;
            }else if(isNaN(depositamount)){
                alert("Please enter your amount..")
                depositremove();
                return
            }else if (!isNaN(depositamount) && depositamount > 0) {
                let date = new Date().toLocaleDateString();
                balance += depositamount;
                localStorage.setItem('balance', balance);
                let balanced = parseFloat(depositamount) + userGO.balance;

                userGO.Action = "Deposit";
                userGO.Amount = parseFloat(depositamount);
                userGO.Date = date;
                userGO.Time = Updated();
                userGO.balance = balanced;

                transac.push({
                    AccNum: userGO.AccNum,
                    AccName: userGO.AccName,
                    Action: "Deposit",
                    Amount: parseFloat(depositamount),
                    Date: date,
                    Time: Updated(),
                    balance: balanced
                });

                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("transac", JSON.stringify(transac));

                depositremove();
                updateBalance();
                console.log("Deposit Successfully");
                alert("Deposit Successfully");
            } else {
                depositremove();
                console.log("Please enter your amount");
                alert("Please enter your amount");
            }
            }
    });
            
}


// WITHDRAW FUNCTION
function withdraw() {
    let withdrawamount = parseFloat(document.getElementById("withdrawamount").value);
    let date = new Date().toLocaleDateString();
    let transac = JSON.parse(localStorage.getItem('transac')) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (isNaN(withdrawamount) || withdrawamount <= 0) {
        alert("Enter a valid Amount");
        withdrawremove();
        return;
    }
    let userFound = false;
            users.forEach(user1 => {
                if(user1.AccNum == getacc){
                    if(withdrawamount < 100){
                        alert("Sorry you can't withdraw, because we only accept ₱100 up for withdraw")
                        withdrawremove();
                        return
                    }
                    if (withdrawamount > user1.balance) {
                        alert("Insufficient Amount");
                        withdrawremove();
                        return;
                    }else if (withdrawamount <= user1.balance) {
                        balance - withdrawamount
                        user1.balance -= withdrawamount;
                        user1.Action = "Withdraw";
                        user1.Amount = withdrawamount;
                        user1.Date = date;
                        user1.Time = Updated();
        
                        transac.push({
                            AccNum: user1.AccNum,
                            AccName: user1.AccName,
                            Action: "Withdraw",
                            Amount: withdrawamount,
                            Date: date,
                            Time: Updated(),
                            balance: user1.balance
                        });

                        localStorage.setItem('users', JSON.stringify(users));
                        localStorage.setItem("transac", JSON.stringify(transac));
                        withdrawremove();
                        updateBalance()
                        alert("Withdraw Successfully");
                        userFound = true;
                        return;
                    }

                    if (!userFound) {
                        alert("Account not found");
                        return
                }
        }
                
    });
            
}



info()
function info() {
    const username = document.getElementById("username");
    let findname = JSON.parse(localStorage.getItem("users")) || [];

    findname.forEach(acc => {
    if(acc.AccNum == getacc){
            username.innerHTML =  `Account: ${acc.AccName}`
        
        }
    });
}

updateBalance();
function updateBalance() {
    const transaction = JSON.parse(localStorage.getItem("users")) || [];
    let totalBalance = 0;
        
    transaction.forEach(transac => {
        if(transac.AccNum == getacc){
            totalBalance += transac.balance;
            document.getElementById('totalBal').innerHTML = `Balance: &#8369;${totalBalance.toLocaleString()}`;
        }
    });
}
function showTransfer(){
    document.getElementById("transferFunds").style.display = "inline-block"
    document.getElementById("welcome").style.display = "none"
    document.getElementById("deposit-portal").style.display = "none"
    document.getElementById("withdraw-portal").style.display = " none"
    document.getElementById('tableTransactions').style.display = "none"
    document.getElementById('Transaction').style.display = "none"
    document.getElementById("username").style.display = "none"
    document.getElementById("totalBal").style.display = "inline-block";
    document.getElementById("transaction-btn").style.backgroundColor = "lighGrey"
    document.getElementById("deposit-btn").style.backgroundColor = "lightGrey"
    document.getElementById("withdraw-btn").style.backgroundColor = "lightGrey"
    document.getElementById("transfer-btn").style.backgroundColor = "skyBlue"
    document.getElementById("Account_btn").style.backgroundColor = "lightGrey"
    
}

function transfer() {
    const amount = document.getElementById("transferAmount");
    const transferTo = parseFloat(document.getElementById("transferTo"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    users.forEach(transAmount => {
        if(transAmount.AccNum == getacc){
            if(isNaN(amount) || amount <= 0 || !transferTo) {
                alert("Please enter a valid amount and recipient username.");
                return;
            }
            const recipient = transAmount.find(u => u.AccNum == transferTo);
            if (!recipient) {
                alert("Recipient Account no not found.");
                return;
            }
            if (recipient.balance < amount) {
                alert("Insufficient funds.");
                return;
            }
            recipient.balance -= amount;
            recipient.transactions.push({ type: "Transfer", amount: amount, to: recipient.AccName });
            recipient.balance += amount;
            // document.getElementById("balance").textContent = `Balance: $${recipient.balance}`;
            // document.getElementById("transferAmount").value = "";
            // document.getElementById("transferTo").value = "";
        }
    });
}





document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("LoggedIn") != "true" /*|| localStorage.getItem("LoggedIn") != "true"*/) {
        window.location.assign("CreateAccount.html")
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logout")
    logout.addEventListener("click", function () {
        sessionStorage.clear();
        window.location.assign("CreateAccount.html");

    })
}) 