const LoginAccno = document.getElementById("LoginAccno");
const AccName = document.getElementById("RegAccountName");
const AccAddress = document.getElementById("RegAddress");
const ErrMessage = document.getElementById("ErrMessage");
const ErrMessage1 = document.getElementById("ErrMessage1");
let selectgender = document.getElementsByName('gender');
let choices = document.getElementsByName('choices');
let selectedGenderValue;
let selectedTranasacValue
const hideIcon = document.getElementById("hideIcon");
const showIcon = document.getElementById("showIcon");
const hideIcons = document.getElementById("hideIcons");
const showIcons = document.getElementById("showIcons");
const registeredMessage = document.getElementById("registeredMessage");
// const button1 = document.getElementById("button1");
const users = []
const transac = []
function button1() {
    registeredMessage.style.display = "none"
}


loginshowIcon()
function loginshowIcon() {
    hideIcon.onclick = () => {
        if (LoginAccno.type == "password") {
            LoginAccno.type = "text"
            showIcon.style.display = "inline-block"
            hideIcon.style.display = "none"
        }
    }
    showIcon.onclick = () => {
        if (LoginAccno.type == "text") {
            LoginAccno.type = "password"
            showIcon.style.display = "none"
            hideIcon.style.display = "inline-block"
        }
    }
}

function renderAuth() {
    document.getElementById("Login-portal").style = "display: inline-block";
    document.getElementById("Registar-portal").style = "display: none";
}


function viewRegister() {
    document.getElementById("Login-portal").style = "display: none";
    document.getElementById("Registar-portal").style = "display: inline-block";
    ErrMessage.style.display = "none"
    ErrMessage1.style.display = "none"
    LoginAccno.style.borderBottom = "1px solid black"
    resetform()
    resetlogin()
}

function viewLogin() {
    document.getElementById("Login-portal").style = "display: inline-block";
    document.getElementById("Registar-portal").style = "display none";
    ErrMessage.style.display = "none"
    ErrMessage1.style.display = "none"
    AccName.style.borderBottom = "1px solid black"

    resetform()
    resetlogin()
}

function resetlogin() {
    LoginAccno.value = ""
}

var slider = document.getElementById("volume");
slider.oninput = function() {
    var output = document.getElementById("volumeValue");
    output.innerHTML = slider.value;

  output.innerHTML = this.value;
}


function handleRegister() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const transac = JSON.parse(localStorage.getItem('transac')) || [];
    let specialcharacterspattern = /[1-9!@#$%^&*]/;
    
    let gender = document.getElementById("Gender").value
    let Transaction = document.getElementById("Transaction").value
    let address = document.getElementById("address").value

    if(AccName.value == ""){
        alert("Complete all form.")
        AccName.style.borderBottom = "1px solid red"  
        return
    }

    if(AccName.value.length >= 12) {
        alert("To much username , kindly use your firstname or Lastname and kindly avoid having special character");
        AccName.style.borderBottom = "1px solid red"
        return
    }if(specialcharacterspattern.test(AccName.value)){
        alert("Username must not have any speacial characterss")
        AccName.style.borderBottom = "1px solid red"
    }else{
        const AccNumber = Math.floor((Math.random() * 99999) + 99999);
        users.push({
            AccNum: AccNumber,
            AccName: AccName.value.charAt(0).toUpperCase() + AccName.value.slice(1),
            AccAddress: address,
            AccGender: gender,
            Acctype: Transaction,
            Age: parseInt(slider.value),
            Action: "",
            Amount: 0,
            Date: "",
            Time: "",
            balance: 0
        });
        //sessionStorage.setItem('AccNum' , AccNumber)
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('transac', JSON.stringify(transac));
        registeredMessage.style.display = "inline-block"
       document.getElementById("showmessage").innerHTML = `<p>Registered Succesfully<br><span1>this is your password <span3>${AccNumber}</span3> <br><span2>please remember it.</span2></p>`
        renderAuth()
        return
    }
}

//Main LOGIN

function isExisting(acc_no, getNum) {
    let isValid = false;
    getNum.forEach(acc => {
        if (acc.AccNum == acc_no) {
            alert(`Welcome ${acc.AccName}`)
            sessionStorage.setItem("LoggedIn" ,  "true")
            localStorage.setItem("currentLogin", acc.AccNum)
            return isValid = true;
        }
    });


    return isValid;
}

let getAccnumber = [];
function handleLogin() {
    //localStorage.setItem("LoggedIn" ,  "true")
    const admin = "123456"
     getAccnumber = JSON.parse(localStorage.getItem("users")) || [];
     let isExisting1 = isExisting(LoginAccno.value, getAccnumber);

        if(LoginAccno.value == admin) {
            // ErrMessage.style = "display: inline-block"
            sessionStorage.setItem("LoggIn", "true");
            alert("Welcome Admin")
            window.location.assign("allpages.html")
            return
            }

            if (LoginAccno.value == "") {
                ErrMessage.innerHTML = "Please fill up the form."
                ErrMessage.style = "display: inline-block"
                ErrMessage1.style.display = "none"
                LoginAccno.style.borderBottom = "1px solid red"
                LoginAccno.style.transition = "0.1s"
                resetlogin();
            }else if(isExisting1) {
                window.location.assign("UseExistingAccount.html")
             return
            }
            else{
                ErrMessage.style.display = "none"
                ErrMessage1.style.display = "inline-block"
                ErrMessage1.innerHTML = "Account number is incorrect."
                LoginAccno.style.borderBottom = "1px solid red"
                LoginAccno.style.transition = "0.1s"
                resetlogin()
            }
}


document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem("LoggedIn") == "true" /*&& localStorage.getItem("LoggedIn") == "true"*/) {
        //alert(`You can't go back because you are already logged in`)
        window.location.assign("UseExistingAccount.html")
    }

});

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("LoggIn") == "true") {
        //UseExistingAccount
        window.location.assign("allpages.html")
    }
})
//DARK MODE
function darkmode() {
    var content = document.getElementsByTagName('body')[0];
    var darkmode = document.getElementById('darkmode');

    darkmode.classList.toggle('active');
    content.classList.toggle('night');

}
