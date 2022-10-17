let timesAtoB = ['время отправления из А:', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
let timesBtoA = ['время отправления из В:', '11:45', '12:45', '13:45', '14:45', '15:45', '16:45', '17:45', '18:45', '19:45', '20:45', '21:45', '22:45']

let timeAtoB = document.getElementById('timeAtoB');
let timeBtoA = document.getElementById('timeBtoA');
let block1 = document.getElementById('timeBlock1');
let block2 = document.getElementById('timeBlock2');

chooseRoute.addEventListener('change', function () {

    let times = document.getElementsByClassName('times');
    for (let list of times) {
        list.style.display = 'none';
    }

    let value = this.value;

    if (value == 'fromAtoB') {
        block1.style.display = 'block';
        timeAtoB.style.display = 'block';
        document.getElementById('timeAtoB').innerHTML +=
            timesAtoB.map((time) => `
        <option value="">${time}</option>
        `)
    }

    else if (value == 'fromBtoA') {
        block2.style.display = 'block';
        timeBtoA.style.display = 'block';
        document.getElementById('timeBtoA').innerHTML +=
            timesBtoA.map((time) => `
    <option value="">${time}</option>
    `)
    }

    else if (value == 'fromAtoBandBack') {
        block1.style.display = 'block';
        timeAtoB.style.display = 'block';
        document.getElementById('timeAtoB').innerHTML +=
            timesAtoB.map((time) => `
        <option value="${time}">${time}</option>
        `);

        timeAtoB.addEventListener('change', function () {
            let timesBtoAupd = [];
            let value = this.value;
            let firstTime = Number(value[0] + value[1]);
            block2.style.display = 'block';
            timeBtoA.style.display = 'block';

            let secondTime;

            for (i = 1; i < timesBtoA.length; i++) {
                secondTime = Number(timesBtoA[i][0] + timesBtoA[i][1])
                if ((secondTime - firstTime) >= 1) {
                    timesBtoAupd.push(secondTime)
                }
            }
            document.getElementById('timeBtoA').innerHTML +=
                timesBtoAupd.map((time) => `
            <option value="${time}">${time}</option>
            `);
        })
    }
});

