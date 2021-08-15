let request_count = 0;


document.addEventListener('DOMContentLoaded', () => {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const hours = document.getElementById('hours');
    console.log(hours);

    const content = document.getElementById('content');
    const spinner = document.getElementById('spinner');

    const counter = document.getElementById('counter');
    const counter_total = document.getElementById('counter-total');
    const counter_left = document.getElementById('counter-left');

    // Set minimum To == From
    from.addEventListener('change', () => {
        to.value = from.value;
        to.min = from.value;
    });

    document.getElementById('go').addEventListener('click', () => {
        const fromValue = new Date(from.value.replaceAll('-', '/'));
        const toValue = new Date(to.value.replaceAll('-', '/'));

        const days = getDaysArray(fromValue, toValue);

        // Init counters
        request_count = days.length;
        counter_left.innerHTML = request_count;
        counter_total.innerHTML = request_count;

        // Update template to loading
        content.style.visibility = 'hidden';
        spinner.style.display = 'block';
        counter.style.display = 'block';

        // Execute Time log
        days.forEach((day, index) => {
            const cms = 'https://cms.overactive.com/timeentrieswp.aspx?INS,0'

            // Init Iframe
            const iframe = document.createElement('iframe');
            iframe.id = 'OAcms-' + index;
            iframe.src = cms;
            iframe.style.display = 'none';

            iframe.onload = () => {
                iframe.contentWindow.window.postMessage({ type: "EXECUTE_TIME", day, hours: hours.value }, "*");
            }

            // Add to start loading
            document.body.appendChild(iframe);
        });
    });

    // document.getElementById('optionsLink').addEventListener('click', (ev) => {
    //     ev.preventDefault();
    //     chrome.tabs.create({ 'url': "/options.html" })
    // })
});

const getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        const isWeekend = new Date(dt).getDay() == 0 || new Date(dt).getDay() == 6;
        if (!isWeekend) {
            arr.push(new Date(dt));
        }
    }
    return arr;
};

// Set hours response
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender);
    
    request_count--;
    const content = document.getElementById('content');

    const counter_left = document.getElementById('counter-left');
    counter_left.innerHTML = request_count;

    if (request_count === 0) {
        const counter = document.getElementById('counter');
        const spinner = document.getElementById('spinner');
        const success = document.getElementById('successContainer');

        counter.style.display = 'none';
        spinner.style.display = 'none';
        content.style.display = 'none';
        success.style.display = 'block';
    }
});