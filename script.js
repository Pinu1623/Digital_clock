$(".stopwatch-btn").click(function () {
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show stopwatch wrapper
    $(".stopwatch").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});
$(".back-btn").click(function () {
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show clock wrapper
    $(".clock").slideDown();
    //update type text
    $(".type").html("Clock");
});
$(".timer-btn").click(function () {
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show timer wrapper
    $(".timer").slideDown();
    //update type text
    $(".type").html("timer");
});


const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};


const updateTime=()=>{
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    //12 hours
    hours = hours % 12 || 12;

    //trailing zero
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
};

//call function
updateTime();
//update every sec
setInterval(updateTime,1000);

//stopwatch

let stopwatchHours = 0,
stopwatchMinutes = 0,
stopwatchSeconds = 0,
stopwatchMiliSeconds = 0,
stopwatchRunning = false,
laps = 1,
stopwatchInterval;

const stopwatch = () =>{
    stopwatchMiliSeconds++;

    if(stopwatchMiliSeconds===100){
        //100 ms = 1 sec and reset ms to 0
        stopwatchMiliSeconds = 0;
        stopwatchSeconds++;
        
    }

    if(stopwatchSeconds===60){
        //60 sec = 1 min and reset sec to 0
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    if(stopwatchMinutes===60){
        //60 min = 1 hr and reset min to 0
         stopwatchMinutes = 0;
         stopwatchHours++;
    }
    //show values on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
};
//start stopwatch

const startStopwatch = () =>{
    stopwatch();
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};
//stop stopwatch
const stopStopwatch =()=>{
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};

//reset button 
const resetStopwatch = () =>{
    //clear to default
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    stopwatchRunning = false;
    laps = 1;

    // update to value on doc to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
};

$(".start-stopwatch").click(function () {
    startStopwatch();   

    //replace start with lap
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function (){
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function (){
    $(".lap").removeClass("active");
    $(".laps").prepend(
    `   <div class="lap active">
            <p>Lap ${laps}</p>
            <p>
                ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes
                )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
                stopwatchMiliSeconds
                )}
            </p>
      </div>
    `
    );
    laps++;
});

// Timer

let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTimer = () =>{
    time = prompt("Enter time in minute");
    //convert time to sec
    time *=60;
    //update default
    setTime();
};
const setTime = () =>{
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600)/60);
    timerSeconds = Math.floor(time %60);

    //input show
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
};

const timer = ()=>{
     timerMiliseconds--;
     if (timerMiliseconds===-1) {
        timerSeconds--;
        timerMiliseconds=99;
     }
     if (timerSeconds===-1) {
        timerMinutes--;
        timerSeconds=59;
     }
     if (timerMinutes===-1) {
        timerHours--;
        timerMinutes=59;
     }

     //update time
     $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));

     timeUp();

};
const startTimer = ()=>{
    //checking valid time
    if (timerHours===0 && timerMinutes===0 && timerSeconds===0 && timerMiliseconds===0) {
        getTimer();
    }else{
        timerInterval = setInterval(timer , 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
};

const stopTimer=()=>{
    clearInterval(timerInterval);
        $(".start-timer").show();
        $(".stop-timer").hide();
};

const resetTimer = () =>{
    stopTimer();
    time = 0;
    setTime();
};

// time up
const timeUp = () =>{
    if (timerHours===0 && timerMinutes===0 && timerSeconds===0 && timerMiliseconds===0) {
        resetTimer();
        alert("Time's up");
        setTime();
    }
}
$(".start-timer").click(function(){
    startTimer();
});

$(".stop-timer").click(function(){
    stopTimer();
});
$(".reset-timer").click(function(){
    resetTimer();
});