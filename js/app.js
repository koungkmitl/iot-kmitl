const config = {
    apiKey: "<KEY>",
    authDomain: "<KEY>",
    databaseURL: "<KEY>",
    projectId: "<KEY>",
    storageBucket: "<KEY>",
    messagingSenderId: "<KEY>"
};
firebase.initializeApp(config);

const analogLed = firebase.database().ref('analog');
const resistorLed = firebase.database().ref('history');
const digitalLed = firebase.database().ref('digital');
let text = document.getElementById("text-btn");

function submitBtn1() {
    analogLed.set(text.value);
}

function submitBtn2() {
    resistorLed.push(text.value);
}

function ratioBtnOn() {
    digitalLed.set("on");
}

function ratioBtnOff() {
    digitalLed.set('off');
}

const chart = Highcharts.chart('container', {
    title: {
        text: 'Level Analog'
    },
    xAxis: {
        tickInterval: 1
    },
    yAxis: {
        type: 'logarithmic',
        minorTickInterval: 1
    },
    tooltip: {
        headerFormat: '<b></b><br />',
        pointFormat: 'x = {point.x}, y = {point.y}'
    },    
    series: [{
        id: 0,
        name: 'LED',
        data: []
    }]
});

resistorLed.on('value', snapshot => {
    const points = Object.values(snapshot.val()).map(parseFloat);
    chart.series[0].setData(points, true);
})