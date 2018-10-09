//checking sourcing
let employeeArray = [];
let monthlyCostNum;
let monthlyCostStr;

//creating a new class called Employee that I will use to store the user inputs into. 
class Employee{
    constructor(firstName, lastName, id, title, annualSalary){
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.title = title;
        this.annualSalary = annualSalary;
    }
}

console.log('JS');
$(nowReady);
function nowReady(){
    console.log('JQ');
    $('#submitButton').on('click', submitNewEmployee);
    $('#employeeTable').on('click','.deleteEmployee', deleteEmployee);
}



//function that occurs on cliq ;)
function submitNewEmployee() {
    createNewEmployee();
    clearInputFields();
    appendEmloyeeArray();
    calculateTotalSalary();
}

//function to create a new employee :)
function createNewEmployee(){
    //assigning js values to user inputs
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let id = $('#id').val();
    let title = $('#title').val();
    let annualSalary = $('#annualSalary').val();
    if(annualSalary === ''){
        annualSalary = 0;
    }
    annualSalary = annualSalary.replace('$','');
    annualSalary = annualSalary.replace(',','');
    //build a new Employee using values assigned ^^
    let freshEmployee = new Employee(firstName,lastName,id,title,annualSalary);
    employeeArray.push(freshEmployee);
}

//function only used to clear the text fields to prep for the next "submitNewEmployee"
function clearInputFields() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#title').val('');
    $('#annualSalary').val('');
}

function appendEmloyeeArray() {
    let element = $('#employeeTable')
    element.empty();
    for(let employee of employeeArray){
        element.append(`<tr class="tableRow"><td>${employee.firstName}</td><td>${employee.lastName}</td><td>${employee.id}</td><td>${employee.title}</td><td>$${Number(employee.annualSalary).toLocaleString('en')}<button class="deleteEmployee" style="font-size:12px;margin:0px; ">Delete</button></td></tr>`)
    }
}


function calculateTotalSalary(){
    let accumulatedSalary = 0;
    for(let employee of employeeArray){
        if(employee.annualSalary === NaN){ 
            employee.annualSalary = 0;
        }
        //replaces any commas or $ inputed by user and turns into num
        let cleanNum = employee.annualSalary.replace('$','');
        cleanNum = parseInt(cleanNum.replace(',',''));
        accumulatedSalary += cleanNum;
    }
    let monthlyCostNum = accumulatedSalary/12;
    //rounds to two decimal places.
    monthlyCostNum = Math.round(monthlyCostNum*100)/100;
    //adds Commas to numbers
    let monthlyCostStr = Number(monthlyCostNum).toLocaleString('en');
    //Time to append the new "monthlyCostStr" to the DOM
    $('#finalSalaryOutput').empty();
    $('#finalSalaryOutput').append(`<h2>Total Cost: $${monthlyCostStr}`)
    if(monthlyCostNum > 20000){
        $('#finalSalaryOutput').css('background-color','red');
    }
    else{
        $('#finalSalaryOutput').css('background-color','black');
    }
}

//Creating a function to remove an Employee from the DOM & Array
function deleteEmployee(){
    let employeeHtmlLine = $(this).parentsUntil($('.centeredText')).text();

    for(i = 0; i<employeeArray.length; i++){
        if(employeeHtmlLine.includes(employeeArray[i].id)){ //<< Could be bad for employees with smaller id nums
            console.log('Succ found an ID that Matches');
            employeeArray.splice(i,1);
            $(this).parentsUntil($('.centeredText')).empty();
            calculateTotalSalary();
            if(monthlyCostNum > 20000){
                $('#finalSalaryOutput').css('background-color','red');
            }
            else{
                $('#finalSalaryOutput').css('background-color','black');
            }
            return
        }     
    }
}



