import { questions } from "./questions.mjs";

//getting all the elements to html
var starting = document.getElementById("starts_btn");
var infoBoxs = document.getElementById("info_boxs");
var startbtn = document.getElementById("start");
var quiz_box = document.getElementById("quiz_box");
var result = document.getElementById("result");
var quit = document.getElementById("quiz_btn");
var continue_btn = document.getElementById("continue_btn");
var next_btn = document.getElementById("next_btn");
var quiz_opt = document.getElementById("quiz_options");
var quiz_question = document.getElementsByClassName("quiz_quest")[0];
var optionslist = document.getElementById("quiz_options");
var total_que = document.getElementById("total_que");
var timer_sec = document.getElementsByClassName("timer_sec")[0];
var quiz_time_slide = document.getElementsByClassName("quiz_time_slide")[0];
var replay = document.getElementsByClassName("replay")[0];
var quit_quiz = document.getElementsByClassName("quit_quiz")[0];
var result_box = document.getElementsByClassName("result-info")[0];

//variables
var time_width = 0;
let countQuestion = 0;
let count = 15;
var interval;
var loadinginterval;
var rightAnswerCount = 0;
// let time_slide;
let tickIcon =
  "<div class= 'icon tick' id ='right-answ'><i class='fa fa-times' ></i></div>";
let wronIcon =
  "<div class='icon cross' id ='wrong-answ'><i class='fa fa-check' ></i> </div> ";

//starting the quiz
startbtn.onclick = function () {
  console.log("startbtn");
  infoBoxs.setAttribute("alt", "this is a info box");
  infoBoxs.classList.add("active");
  starting.classList.remove("active");
};
// showing information box of quiz
quit.onclick = function () {
  console.log(quit);
  starting.classList.add("active");
  infoBoxs.classList.remove("active");
};
//starting the quiz
continue_btn.onclick = function () {
  quiz_box.classList.add("active");
  infoBoxs.classList.remove("active");

  startTimer(count);
};

// function for timer
function startTimer(time) {
  interval = setInterval(timer, 1000);
  loadinginterval = setInterval(loadingBar,150)
  function timer() {
    timer_sec.innerText = time;
    // loadingBar();
    time--;

    if (time == -1) {
      console.log("fd");
      clearInterval(interval);
      time = 15;
      markAnswer(countQuestion + 1);
    }
  }
}
//when time out automatically mark the answe
function markAnswer(index) {
  //setting the onclick event to all options that will could be selected
  let countans = index - 1;
  console.log(`index ${countans}`);
  const correctAns = questions[countans].answer;

  const alloption = optionslist.querySelectorAll(".option");
  for (let i = 0; i < alloption.length; i++) {
    console.log(alloption[i]);
    //if answer is incorrect select automatically correct answer

    if (alloption[i].innerText == correctAns) {
      setTimeout(() => {
        console.log("timeout");
        alloption[i].insertAdjacentHTML("beforeend", tickIcon);
        alloption[i].classList.add("right-answ");
      }, 20);
    }
  }
}
function loadingBar() {
// 15 second  main 100%
  time_width+=1;

  

  // console.log(time_width);
  // for(let i = 0; i <60; i++){
    
  // }
  // time_width += 0.104;
  // time_width+= 6.25;
  quiz_time_slide.style.width = `${time_width}%`;
  if(time_width>=100){
    clearInterval(loadinginterval);
  }
}

//logic for displaying questions and options and their functionality
const nextQuestion = (index) => {
  console.log(`index1 ${index} `);
  for (let i = 0; i < questions.length; i++) {
    quiz_opt.style.pointerEvents = "all";

    // printing questions
    quiz_question.innerHTML = `<h1>${questions[index].id}. ${questions[index].question}</h1>`;
    //quiz options
    quiz_opt.innerHTML = `<div class="option"><span>${questions[countQuestion].options[0]}</span></div> 
                            <div class="option" ><span>${questions[countQuestion].options[1]} </span></div>
                            <div class="option" ><span> ${questions[countQuestion].options[2]}</span> </div>
                            <div class="option"><span> ${questions[countQuestion].options[3]}</span></div>`;

    //logic for counting the number of questions
    total_que.innerHTML = ` <span><p>${countQuestion + 1}</p>of <p>${
      questions.length
    }</p>Question</span>`;
  }

  //setting the onclick event to all options that will could be selected
  const alloption = optionslist.querySelectorAll(".option");
  for (let i = 0; i < alloption.length; i++) {
    alloption[i].setAttribute("onclick", "optionSelected(this)");
    alloption[i].addEventListener("click", optionSelected);
  }

  //function for selecting option
  function optionSelected(ans) {
    clearInterval(interval);
    clearInterval(loadinginterval);
    const userAns = ans.path[0].innerText;
    const correctAns = questions[index].answer;
    //if user choose correct answer
    if (userAns == correctAns) {
      console.log("Correct");
      ans.path[0].classList.add("right-answ");
      ans.path[0].insertAdjacentHTML("beforeend", tickIcon);
      rightAnswerCount++;
    }

    //if user choose wrong answer
    else {
      ans.path[0].classList.add("wrong-answ");
      ans.path[0].insertAdjacentHTML("beforeend", wronIcon);

      //if answer is incorrect select automatically correct answer
      for (let i = 0; i < alloption.length; i++) {
        if (alloption[i].innerText == correctAns) {
          setTimeout(() => {
            console.log("timeout");
            alloption[i].insertAdjacentHTML("beforeend", tickIcon);
            alloption[i].classList.add("right-answ");
          }, 20);
        }
      }
    }
    quiz_opt.style.pointerEvents = "none";
    // count = 15;
  }

  //when next button is clicked
  next_btn.onclick = function () {
    if (countQuestion < questions.length - 1) {
      countQuestion++;
      console.log(count);
      if (count <= 15) {
        console.log("time");
        clearInterval(interval);
        clearInterval(loadinginterval);
        count = 15;
        time_width = 0;
      }
      clearInterval(interval);
      clearInterval(loadinginterval);
      startTimer(count);

      nextQuestion(countQuestion);
    } else {
      result.classList.add("active");
      quiz_box.classList.remove("active");
      if (rightAnswerCount < 3) {
        result_box.innerHTML = `<p>Don't Worry failure is the key of succuss😎 just try again!</p>
      <span>you got <p>${rightAnswerCount}</p>out of <p> ${questions.length}</p></span>`;
        console.log(result_box.firstChild);
      } else if (rightAnswerCount < 8) {
        result_box.innerHTML = `<p>well you got a good points! but remeber you have to achieve more</p>
      <span>you got <p>${rightAnswerCount}</p>out of <p> ${questions.length}</p></span>`;
        console.log(result_box.firstChild);
      } else {
        result_box.innerHTML = `<p>Congrats🎉you have completed the Quiz.</p>
      <span>you got <p>${rightAnswerCount}</p>out of <p> ${questions.length}</p></span>`;
        console.log(result_box.firstChild);
      }
    }

    // console.log(countQuestion);
  };
};

//result box script

//replay the quiz
replay.onclick = function () {
  result.classList.remove("active");
  quiz_box.classList.add("active");
  countQuestion = 0;
  rightAnswerCount = 0;
  nextQuestion(countQuestion);
  clearInterval(interval);
  clearInterval(loadinginterval);
};

// quit the quiz
quit_quiz.onclick = function () {
  window.location.reload();
};

nextQuestion(countQuestion);
