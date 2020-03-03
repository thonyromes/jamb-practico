function updateWCTime(kickoff) {
    now = new Date()
    kickoff = new Date(kickoff)
    diff = kickoff - now;

    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);

    dd = days;
    hh = hours - days * 24;
    hh = ("0" + hh).slice(-2)
    mm = mins - hours * 60;
    mm = ("0" + mm).slice(-2)
    ss = secs - mins * 60;
    ss = ("0" + ss).slice(-2)

    if (hh == '00' & mm == '00' & ss == '00') {
        endExam()
    }
    document.getElementById("timer-display").innerHTML = `${hh}:${mm}:${ss}`;
}
let interval = setInterval(() => { updateWCTime(parseInt(localStorage.getItem('examEnd'))) }, 1000)

function endExam() {
    clearInterval(interval)
    localStorage.removeItem('subjects')
    localStorage.removeItem('examEnd')
    alert('Exam Ended')
    location.assign('./index.html')
}