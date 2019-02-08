import { Component, ElementRef,AfterViewInit,ChangeDetectionStrategy } from '@angular/core';
import {UploadFileService} from '../../services/upload/upload-file.service';
import * as Chart from 'chart.js'
import {differenceWith,first,concat} from "lodash";
import {max,min,sum} from "lodash";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from '../../services/database/database.service';
@Component({
  selector: 'app-user-main-information',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-main-information.component.html',
  styleUrls: ['./user-main-information.component.css']
})
export class UserMainInformationComponent implements AfterViewInit {

  chart = [];
  income = [];
  expense = [];
  myChart:any;
  canvas: any;
  ctx: any;
  difference = [];
  inc = [];
  exp = [];
  bal = [];
  highestIncomeMonth;
  highestExpenseMonth;
  highestBalanceMonth;
  lowestBalanceMonth;
  i;
  userMonthStats;
  highestIncome;
  highestExpenses;
  highestBalance;
  lowestBalance;
  incomeSum;
  expensesSum;
  differenceInSums;
  monthCount;
  key;
  highestIncomeIndex;
  uss;
  incomeArray;
  expenseArray;

  constructor(public dataBase:DatabaseService,private elementRef: ElementRef,private modalService: NgbModal,private upload: UploadFileService,public afAuth: AngularFireAuth) {}

  ngAfterViewInit() {
  window.scrollTo(0, 0);

  // Getting main information
  this.dataBase.getStats().subscribe( res => {
  this.userMonthStats = res;
  let income = res.map(res => res.income);
  let expense = res.map(res => res.expenses);
  this.key = res.map(res => res.$key);
  this.monthCount = res.length;
  this.uss = first(this.key);


  // If information starts not from first (january month) it will add an 0 into the array for that particular month.
  // That's why if the information starts from 7 month the graph will only show information from 7 month all other would be equal to 0
  for(this.i=1; this.i<this.uss; this.i++){
  this.inc.push(0);
  this.exp.push(0);
  this.bal.push(0);
}
// Adding information to arrays
this.incomeArray = this.inc.concat(income)
this.expenseArray = this.exp.concat(expense)
for(let k = 0; k < this.incomeArray.length; k++){
  let difference = this.incomeArray[k] - this.expenseArray[k];
  this.difference.push(difference);
}

// Calculating different parts
this.highestExpenses = max(expense);
this.highestIncome = max(income);
this.highestBalance = max(this.difference);
this.lowestBalance = min(this.difference);
this.incomeSum = sum(income);
this.expensesSum = sum(expense);
this.differenceInSums = sum(this.difference);

// Finding index for given criteria
let highestExpensesIndex = this.expenseArray.indexOf(this.highestExpenses);
let highestIncomeIndex = this.incomeArray.indexOf(this.highestIncome);
let highestDifferenceIndex = this.difference.indexOf(this.highestBalance);
let lowestDifferenceIndex = this.difference.indexOf(this.lowestBalance);

// Finding the months equivalent to the numbers
this.checkIndex(highestIncomeIndex,highestExpensesIndex,highestDifferenceIndex,lowestDifferenceIndex);

// Graph
this.canvas = document.getElementById('myChart');
this.ctx = this.canvas.getContext('2d');
let myChart = new Chart(this.ctx, {
  type: 'line',
  data: {
    labels: ["January", "February", "March","April","May","June","July","August","September","October","November","December"],
    datasets: [  {
      fill: 'start',
      label: 'income',
      data: this.incomeArray,
      borderColor: "green",
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      lineTension: 0.32,
      borderWidth: 5
    },
    {
      fill: 'start',
      label: 'expenses',
      data: this.expenseArray,
      borderColor: "red",
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      lineTension: 0.32,
      borderWidth: 5
    },
    {
      fill: 'start',
      label: 'difference',
      data: this.difference,
      borderColor: "black",
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      lineTension: 0.32,
      borderWidth: 5
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      position: "top",
      text: "Financial information graphic for 2018 ",
      fontSize: 20,
      fontColor: "#111"
    },
    display:true,
    spanGaps:false,labels: {
      boxWidth: 80,
      fontColor: 'black'
    }},
  });
})
}

// Finding the months equivalent to the numbers
checkIndex(highestIncomeIndex,highestExpensesIndex,highestDifferenceIndex,lowestDifferenceIndex){
switch(highestIncomeIndex){
  case highestIncomeIndex = 0:
  this.highestIncomeMonth = "January"
  break;

  case highestIncomeIndex = 1:
  this.highestIncomeMonth = "February"
  break;

  case highestIncomeIndex = 2:
  this.highestIncomeMonth = "March"
  break;

  case highestIncomeIndex = 3:
  this.highestIncomeMonth = "April"
  break;

  case highestIncomeIndex = 4:
  this.highestIncomeMonth = "May"
  break;

  case highestIncomeIndex = 5:
  this.highestIncomeMonth = "June"
  break;

  case highestIncomeIndex = 6:
  this.highestIncomeMonth = "July"
  break;

  case highestIncomeIndex = 7:
  this.highestIncomeMonth = "August"
  break;

  case highestIncomeIndex = 8:
  this.highestIncomeMonth = "September"
  break;

  case highestIncomeIndex = 9:
  this.highestIncomeMonth = "October"
  break;

  case highestIncomeIndex = 10:
  this.highestIncomeMonth = "November"
  break;

  case highestIncomeIndex = 11:
  this.highestIncomeMonth = "December"
  break;
}
switch(highestExpensesIndex){

  case highestExpensesIndex = 0:
  this.highestExpenseMonth = "January"
  break;

  case highestExpensesIndex = 1:
  this.highestExpenseMonth = "February"
  break;

  case highestExpensesIndex = 2:
  this.highestExpenseMonth = "March"
  break;

  case highestExpensesIndex = 3:
  this.highestExpenseMonth = "April"
  break;

  case highestExpensesIndex = 4:
  this.highestExpenseMonth = "May"
  break;

  case highestExpensesIndex = 5:
  this.highestExpenseMonth = "June"
  break;

  case highestExpensesIndex = 6:
  this.highestExpenseMonth = "July"
  break;

  case highestExpensesIndex = 7:
  this.highestExpenseMonth = "August"
  break;

  case highestExpensesIndex = 8:
  this.highestExpenseMonth = "September"
  break;

  case highestExpensesIndex = 9:
  this.highestExpenseMonth = "October"
  break;

  case highestExpensesIndex = 10:
  this.highestExpenseMonth = "November"
  break;

  case highestExpensesIndex = 11:
  this.highestExpenseMonth = "December"
  break;
}

switch(highestDifferenceIndex){

  case highestDifferenceIndex = 0:
  this.highestBalanceMonth = "January"
  break;

  case highestDifferenceIndex = 1:
  this.highestBalanceMonth = "February"
  break;

  case highestDifferenceIndex = 2:
  this.highestBalanceMonth = "March"
  break;

  case highestDifferenceIndex = 3:
  this.highestBalanceMonth = "April"
  break;

  case highestDifferenceIndex = 4:
  this.highestBalanceMonth = "May"
  break;

  case highestDifferenceIndex = 5:
  this.highestBalanceMonth = "June"
  break;

  case highestExpensesIndex = 6:
  this.highestBalanceMonth = "July"
  break;

  case highestDifferenceIndex = 7:
  this.highestBalanceMonth = "August"
  break;

  case highestDifferenceIndex = 8:
  this.highestBalanceMonth = "September"
  break;

  case highestDifferenceIndex = 9:
  this.highestBalanceMonth = "October"
  break;

  case highestDifferenceIndex = 10:
  this.highestBalanceMonth = "November"
  break;

  case highestDifferenceIndex = 11:
  this.highestBalanceMonth = "December"
  break;
}
switch(lowestDifferenceIndex){

  case lowestDifferenceIndex = 0:
  this.lowestBalanceMonth = "January"
  break;

  case lowestDifferenceIndex = 1:
  this.lowestBalanceMonth = "February"
  break;

  case lowestDifferenceIndex = 2:
  this.lowestBalanceMonth = "March"
  break;

  case lowestDifferenceIndex = 3:
  this.lowestBalanceMonth = "April"
  break;

  case lowestDifferenceIndex = 4:
  this.lowestBalanceMonth = "May"
  break;
  case lowestDifferenceIndex = 5:

  this.lowestBalanceMonth = "June"
  break;

  case lowestDifferenceIndex = 6:
  this.lowestBalanceMonth = "July"
  break;

  case lowestDifferenceIndex = 7:
  this.lowestBalanceMonth = "August"
  break;

  case lowestDifferenceIndex = 8:
  this.lowestBalanceMonth = "September"
  break;

  case lowestDifferenceIndex = 9:
  this.lowestBalanceMonth = "October"
  break;

  case lowestDifferenceIndex = 10:
  this.lowestBalanceMonth = "November"
  break;

  case lowestDifferenceIndex = 11:
  this.lowestBalanceMonth = "December"
  break;
}
}
}
