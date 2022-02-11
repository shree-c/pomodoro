//global jobs
const logele = document.querySelector('.logdate');

logele.innerText = new Date().toLocaleString();
Notification.requestPermission().then(function (permission) { console.log('permiss', permission) });
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
const work_name_ele = document.querySelector('.work_name');
const work_name_imp_ele = document.querySelector('#work_name_id');
const choice_ele = document.querySelector('#choice');
const more_settings_ele = document.querySelector('.more_settings')
let start_time_id = null;


//based on the type of timer selected populate minutes and seconds fields with respective values
set_timer();
function set_timer() {
    if (start_time_id)
        clearInterval(start_time_id);
    seconds.innerText = '00';
    switch (choice_ele.value) {
        case ('Small rest'):
            {
                minutes.innerText = document.querySelector('#sb_t').value;
                work_name_ele.style.display = "none";
                break;
            }
        case ('Long rest'):
            {
                minutes.innerText = document.querySelector('#lb_t').value;
                work_name_ele.style.display = "none";
                break;
            }
        case ('Study'): {
            minutes.innerText = document.querySelector('#work_t').value;
            show_work_name();
            break;
        }
        default:
            minutes.innerText = '00';
    }
}

function updatevals(ele) {
    const work_slider = document.querySelector('#' + ele);
    const work_tval = document.querySelector('.' + ele + 'span');
    work_tval.innerText = work_slider.value;
}
//assists changing default values and resets timer each time settings is changed
function show_more_settings() {
    if (more_settings_ele.style.display == 'none')
        more_settings_ele.style.display = 'block';
    else
        more_settings_ele.style.display = 'none'
}
//takes care of setting up interval and updating clock values
function start_timer() {
    //you should have the second and minutes values at hand
    //the minutes value is dynamically taken care of already
    //if second value becomes zero decrement minutes
    //if minutes go negative alert and stop timer
    set_timer();
    if (choice_ele.value === 'Study')
        log(work_name_imp_ele.value)
    if (start_time_id)
        clearInterval(start_time_id);
    start_time_id = setInterval(() => {
        // console.log(+minutes.innerText)
        // console.log(+seconds.innerText)
        let min = +minutes.innerText;
        let sec = +seconds.innerText;
        if (sec === 0) {
            min--;
            if (min < 0) {
                send_notif();
                reset_timer();
                return;
            }
            sec = 59;
            seconds.innerText = sec;
            minutes.innerText = min;
        } else {
            sec--;
            seconds.innerText = sec;
            minutes.innerText = min;
        }
    }, 1000);
}
//clears interval if anything is running
function reset_timer() {
    if (start_time_id)
        clearInterval(start_time_id);
    set_timer();
}


// sends notification
function send_notif() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(`completed your ${choice_ele.value}`);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(`completed your ${choice_ele.value}`);
            }
        });
    }
}
//when work mode is set it shows input field for giving name to work
function show_work_name() {
    work_name_ele.style.display = 'block';
    work_name_imp_ele.focus();
}
//logs str to log element
function log(str) {
    const logele = document.querySelector('.log');
    logele.innerHTML += `<div><p class="w_dis">${str}</p><span class="logdate">${new Date().toLocaleString()}</span></div>`
}