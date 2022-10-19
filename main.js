let timesAtoB = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
let timesBtoA = ['11:45', '12:45', '13:45', '14:45', '15:45', '16:45', '17:45', '18:45', '19:45', '20:45', '21:45', '22:45']

let timeAtoB = document.getElementById('timeAtoB');
let timeBtoA = document.getElementById('timeBtoA');
let block1 = document.getElementById('timeBlock1');
let block2 = document.getElementById('timeBlock2');
let list1 = document.getElementById('list1');
let list2 = document.getElementById('list2');
let value;
var timeValueAB;
var timeValueBA;
let timeAB;
let timeBA;

chooseRoute.addEventListener('change', function () {
    let times = document.getElementsByClassName('times');
    for (let list of times) {
        list.style.display = 'none';
    }

    value = this.value;

    if (value == 'fromAtoB') {
        block1.style.display = 'block';
        timeAtoB.style.display = 'block';
        list1.style.display = 'block';
        document.getElementById('timeAtoB').innerHTML =
            timesAtoB.map((time) => `
        <option value='${time}'>${time}</option>
        `)
    }

    else if (value == 'fromBtoA') {
        block2.style.display = 'block';
        timeBtoA.style.display = 'block';
        list2.style.display = 'block';
        document.getElementById('timeBtoA').innerHTML =
            timesBtoA.map((time) => `
    <option value='${time}'>${time}</option>
    `)
        timeValueBA = this.value;
    }

    else if (value == 'fromAtoBandBack') {
        block1.style.display = 'block';
        timeAtoB.style.display = 'block';
        list1.style.display = 'block';
        document.getElementById('timeAtoB').innerHTML =
            timesAtoB.map((time) => `
        <option value='${time}'>${time}</option>
        `);

        timeAtoB.addEventListener('change', function () {
            let timesBtoAupdate = [];
            timeValueAB = this.value;
            let firstTime = Number(timeValueAB[0] + timeValueAB[1]);
            block2.style.display = 'block';
            timeBtoA.style.display = 'block';
            list2.style.display = 'block';

            let secondTime;

            for (i = 1; i < timesBtoA.length; i++) {
                secondTime = Number(timesBtoA[i][0] + timesBtoA[i][1])
                if ((secondTime - firstTime) >= 1) {
                    timesBtoAupdate.push(secondTime)
                }
            }
            document.getElementById('timeBtoA').innerHTML =
                timesBtoAupdate.map((time) => `
            <option value='${time}:45'>${time}:45</option>
            `);

            timeBtoA.addEventListener('change', function () {
                timeValueBA = this.value;
            })
        })
    }
});

function getTimeAB() {
    timeAB = this.event.target.value
}

function getTimeBA() {
    timeBA = this.event.target.value
}

function getPrice() {
    let num = document.getElementById('num').value;
    let description;
    let sum;
    let duration;

    if (value == 'fromAtoB') {
        description = 'из A в B';
        sum = 700;
        duration = 50;
        document.getElementById('message2').innerHTML =
            `<p>Теплоход отправляется в ${timeAB}, а прибудет в ${timeAB.replace('00', 50)}.</p>`
    }

    else if (value == 'fromBtoA') {
        description = 'из B в A';
        sum = 700;
        duration = 50;
        document.getElementById('message2').innerHTML =
            `<p>Теплоход отправляется в ${timeBA}, а прибудет в ${(timeBA.replace(timeBA[1], +timeBA[1] + 1)).replace(45, 35)} </p>`
    }

    else {
        description = 'из A в B и обратно в А';
        sum = 1200;
        duration = 100;
        document.getElementById('message2').innerHTML =
            `<p> Теплоход отправляется из А в В ${timeAB} и прибудет в ${timeAB.replace('00', 50)}, а из В в А в ${timeBA} и прибудет в ${(timeBA.replace(timeBA[1], +timeBA[1] + 1)).replace(45, 35)}.</p > `
    }

    document.getElementById('message1').innerHTML =
        `<p> Вы выбрали ${num} билета по маршруту ${description} стоимостью ${sum * num}.</p >
    <p>Это путешествие займет у вас ${duration} минут.</p>`
}


