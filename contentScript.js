const setTime = async (_date, _hours) => {
    const date = document.getElementById('vTIMEENTRIESDATE');
    const hours = document.getElementById('vTIMEENTRIESHOURS');
    const user = document.getElementById('vCONTRACTDETAILUSERSUSERID');
    const client = document.getElementById('vCLIENTID');
    const project = document.getElementById('vPROJECTID');
    const contract = document.getElementById('vCONTRACTID');
    const role = document.getElementById('vPROJECTROLEID');
    const type = document.getElementById('vTIMEENTRYTYPEID');
    const task = document.getElementById('vPROJECTSCOMMONTASKSID');

    date.value = _date;
    hours.value = parseFloat(_hours);

    document.getElementById('BTNCONFIRMANDCONTINUE').click();
}


window.addEventListener("message", (event) => {
    
    if (event.data.type && (event.data.type == "EXECUTE_TIME")) {
        day = event.data.day;
        hours = event.data.hours;
        const date = `${day.getMonth() + 1}/${day.getDate()}/${day.getYear().toString().substr(-2)}`;
        setTime(date, hours);
    }

}, false);

// Listen for event completition
document.addEventListener('DOMNodeInserted', (event) => {
    const success = event.target && event.target.id && event.target.id === 'toast-container';
    
    if (success) {
        document.getElementById('toast-container').remove();
        chrome.runtime.sendMessage({}, null);
    }
})
