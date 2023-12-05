const API_KEY = 'apikey-75C0BC12-E16E-4BDB-A63A-143962B2AD02';
let course = [];
let dates = [];


async function init() {
    await loadCourse();
    await load5DayCourse();
    await getDates();
    renderChart();
}


async function loadCourse() {
    let url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur';
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let currentCourse = Math.round(responseAsJSON['bitcoin']['eur']);

    document.getElementById('course').innerHTML = /* html */ `<b> ${currentCourse}€ </b>`

}


async function load5DayCourse() {
    let url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=1825&interval=daily';
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    responseAsJSON = responseAsJSON['prices'];



    for (let i = 0; i < responseAsJSON.length; i += 5) {
        const courseEach10Days = Math.round(responseAsJSON[i][1]);
        course.push(courseEach10Days);
    }
    console.log(course)
}


function renderChart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Kurs in €',
                data: course,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function getDates() {
    let currentDate = new Date(2018, 11, 6)
    const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }
    const f = new Intl.DateTimeFormat("de-DE", {
        dateStyle: 'short',
    })
    while (currentDate <= new Date()) {
        dates.push(f.format(currentDate));
        currentDate = addDays.call(currentDate, 5);
    }
    return dates
}

