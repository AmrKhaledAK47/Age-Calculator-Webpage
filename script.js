const yearObj = document.getElementById("year");
const monthObj = document.getElementById("month");
const dayObj = document.getElementById("day");
const buttonObj = document.getElementById("btn");
const errMessages = document.querySelectorAll(".err-msg");
const labels = document.querySelectorAll(".label-info");
const inputs = document.querySelectorAll(".inputs");
const resultYears = document.querySelector(".final-years");
const resultMonths = document.querySelector(".final-months");
const resultDays = document.querySelector(".final-days");
buttonObj.addEventListener("click", (el) => {
    const years = yearObj.value;
    const months = monthObj.value;
    const days = dayObj.value;
    for (let i = 0; i < 3; i++) {
        errMessages[i].classList.remove("show");
        labels[i].classList.remove("err");
        inputs[i].classList.remove("err-input");
    }
    if (inputIsEmpty(days, months, years) === 1) return;
    if (checkValues(days, months, years) === 0) return;
    if (isDateValid(days, months, years) === 0) return;
    calculateAge(days, months, years);
});
function calculateAge(days, months, years) {
    const DATE = new Date();
    const actualDay = DATE.getDate();
    const actualMonth = DATE.getMonth() + 1;
    const actualYear = DATE.getFullYear();
    const year = parseInt(years);
    const month = parseInt(months);
    const day = parseInt(days);
    let liveDays = parseInt((actualYear - year) * 365.25) + ((actualMonth - (month - 1)) * 30.5) + (actualDay - day) - 30.5;
    resultYears.textContent = parseInt(liveDays / 365.25);
    resultYears.classList.add("letter");
    resultMonths.classList.add("letter");
    resultDays.classList.add("letter");
    liveDays -= parseInt(parseInt(liveDays / 365.25) * 365.25);
    resultMonths.textContent = parseInt(liveDays / 30.5);
    liveDays -= parseInt(liveDays / 30.5) * 30.5;
    resultDays.textContent = Math.round(liveDays);
}
function inputIsEmpty(days, months, years) {
    let i = 0;
    let fl = 0;
    for (const val of arguments) {
        if (val === "") {
            errMessages[i].textContent = "This field is required";
            errMessages[i].classList.add("show");
            labels[i].classList.add("err");
            inputs[i].classList.add("err-input");
            fl = 1;
        }
        i++;
    }
    return fl;
}
function checkValues(days, months, years) {
    let fl = 1;
    const y = parseInt(years);
    const m = parseInt(months);
    const d = parseInt(days);
    if (isNaN(y) || !(y >= 1888 && y <= new Date().getFullYear())) {
        errMessages[2].textContent = "Must be a valid year";
        errMessages[2].classList.add("show");
        labels[2].classList.add("err");
        inputs[2].classList.add("err-input");
        fl = 0;
    }
    if (isNaN(m) || !(m >= 1 && m <= 12)) {
        errMessages[1].textContent = "Must be a valid month";
        errMessages[1].classList.add("show");
        labels[1].classList.add("err");
        inputs[1].classList.add("err-input");
        fl = 0;
    }
    if (isNaN(d) || !(d >= 1 && d <= 31)) {
        errMessages[0].textContent = "Must be a valid day";
        errMessages[0].classList.add("show");
        labels[0].classList.add("err");
        inputs[0].classList.add("err-input");
        fl = 0;
    }
    return fl;
}
function isDateValid(days, months, years) {
    const y = parseInt(years);
    const m = parseInt(months);
    const d = parseInt(days);
    console.log(d, new Date().getDate());
    let fl = 1;
    if ((m === 2 && d >= 30) || ((m === 4 || m === 6 || m === 9 || m === 11) && d >= 31) || (y === new Date().getFullYear() && ((m - 1 > new Date().getMonth()) || (m - 1 === new Date().getMonth() && new Date().getDate() < d)))) {
        for (let i = 0; i < 3; i++) {
            errMessages[i].classList.add("show");
            labels[i].classList.add("err");
            inputs[i].classList.add("err-input");
        }
        errMessages[0].textContent = "Must be a valid date";
        fl = 0;
    }
    return fl;
}