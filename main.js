let timesAtoB = ['выберите время:', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
let timesBtoA = ['выберите время:', '09:45', '10:45', '11:45', '12:45', '13:45', '14:45', '15:45', '16:45', '17:45', '18:45', '19:45', '20:45', '21:45', '22:45']

let timeAtoB = document.getElementById('timeAtoB');
let timeBtoA = document.getElementById('timeBtoA');
let block1 = document.getElementById('timeBlock1');
let block2 = document.getElementById('timeBlock2');
let list1 = document.getElementById('list1');
let list2 = document.getElementById('list2');
let value;
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
        <option value='${time}'>${time}</option>`)
    }

    else if (value == 'fromBtoA') {
        block2.style.display = 'block';
        timeBtoA.style.display = 'block';
        list2.style.display = 'block';
        document.getElementById('timeBtoA').innerHTML =
            timesBtoA.map((time) => `
        <option value='${time}'>${time}</option>`)
    }

    else if (value == 'fromAtoBandBack') {
        block1.style.display = 'block';
        timeAtoB.style.display = 'block';
        list1.style.display = 'block';
        document.getElementById('timeAtoB').innerHTML =
            timesAtoB.map((time) => `
        <option value='${time}'>${time}</option>`);

        timeAtoB.addEventListener('change', function () {
            let timesBtoAupdate = [];
            timeValueAB = this.value;
            let firstTime = Number(timeValueAB[0] + timeValueAB[1]);
            block2.style.display = 'block';
            timeBtoA.style.display = 'block';
            list2.style.display = 'block';

            let secondTime;
            // расчет возможного времени обратного отправления
            for (i = 1; i < timesBtoA.length; i++) {
                secondTime = Number(timesBtoA[i][0] + timesBtoA[i][1])
                if ((secondTime - firstTime) >= 1) {
                    timesBtoAupdate.push(secondTime);
                }
            }
            document.getElementById('timeBtoA').innerHTML =
                timesBtoAupdate.map((time) => `
            <option value='${time}:45'>${time}:45</option>`);
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
    let hours;
    let minutes;
    let result;

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
        hours = +timeBA.slice(0, 2) + +1;
        minutes = (+timeBA.slice(3) + +50) - 60;
        result = hours + ':' + minutes;
        document.getElementById('message2').innerHTML =
            `<p>Теплоход отправляется в ${timeBA}, а прибудет в ${result}.</p>`
    }

    else {
        description = 'из A в B и обратно в А';
        sum = 1200;
        duration = 100;
        hours = +timeBA.slice(0, 2) + +1;
        minutes = (+timeBA.slice(3) + +50) - 60;
        result = hours + ':' + minutes;
        document.getElementById('message2').innerHTML =
            `<p> Теплоход отправляется из А в В в ${timeAB} и прибудет в ${timeAB.replace('00', 50)}, 
            а из В в А в ${timeBA} и прибудет в ${result}.</p > `
    }

    document.getElementById('message1').innerHTML =
        `<p> Вы выбрали ${num} билета по маршруту ${description} стоимостью ${sum * num}.</p >
        <p>Это путешествие займет у вас ${duration} минут.</p>`
}


