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
    mm = mins - hours * 60;
    mm = ("0" + mm).slice(-2)
    ss = secs - mins * 60;
    ss = ("0" + ss).slice(-2)

    document.getElementById("timer-display").innerHTML = `${mm}:${ss}`;
}
setInterval(() => { updateWCTime(getSettings()['examEnd']) }, 1000)