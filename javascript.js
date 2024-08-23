let accounts = [];

function createAccount(accountNumber, accountName, accountType, gender, address) {
    accounts.push({
        accountNumber: accountNumber,
        accountName: accountName,
        accountType: accountType,
        gender: gender,
        address: address
    });
    alert("Account created successfully!");
    // Redirect to login page
    window.location.href = "login.html";
}

function login(accountNumber) {
    // Simulated login, check if account exists
    let account = accounts.find(acc => acc.accountNumber === accountNumber);
    if (account) {
        // Redirect to main page
        window.location.href = "main.html";
    } else {
        alert("Invalid account number. Please try again.");
    }
}
