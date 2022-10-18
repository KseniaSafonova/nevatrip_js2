let timesAtoB = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
let timesBtoA = ['11:45', '12:45', '13:45', '14:45', '15:45', '16:45', '17:45', '18:45', '19:45', '20:45', '21:45', '22:45']



// let tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);
// console.log(tomorrow)


// let time = [new Date(0, 0, 0, 11, 00, 0, 0), new Date(2022, 0, 1, 12, 00, 0, 0), new Date(2022, 0, 1, 13, 00, 0, 0)]
// console.log(time)
// let tomorrow = time[0];
// tomorrow.setDate(tomorrow.getDate() + 1)
// console.log(tomorrow)



let timeAtoB = document.getElementById('timeAtoB');
let timeBtoA = document.getElementById('timeBtoA');
let block1 = document.getElementById('timeBlock1');
let block2 = document.getElementById('timeBlock2');
let list1 = document.getElementById('list1');
let list2 = document.getElementById('list2');
let value;
// let timeABvalue;
// let timeBAvalue;

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
        document.getElementById('timeAtoB').innerHTML +=
            timesAtoB.map((time) => `
        <option value='${time}'>${time}</option>
        `)
    }

    else if (value == 'fromBtoA') {
        block2.style.display = 'block';
        timeBtoA.style.display = 'block';
        list2.style.display = 'block';
        document.getElementById('timeBtoA').innerHTML +=
            timesBtoA.map((time) => `
    <option value='${time}'>${time}</option>
    `)
    }

    else if (value == 'fromAtoBandBack') {
        block1.style.display = 'block';
        timeAtoB.style.display = 'block';
        list1.style.display = 'block';
        document.getElementById('timeAtoB').innerHTML +=
            timesAtoB.map((time) => `
        <option value='${time}'>${time}</option>
        `);

        timeAtoB.addEventListener('change', function () {
            let timesBtoAupdate = [];
            value = this.value;
            let firstTime = Number(value[0] + value[1]);
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
            document.getElementById('timeBtoA').innerHTML +=
                timesBtoAupdate.map((time) => `
            <option value='${time}'>${time}:45</option>
            `);
        })
    }
});

function getPrice() {
    let num = document.getElementById('num').value;
    let description;
    let sum;
    let duration;
    // let time;

    if (value == 'fromAtoB') {
        description = 'из A в B';
        sum = 700;
        duration = 50;
        // time = timeValue;???
    }

    else if (value == 'fromBtoA') {
        description = 'из B в A';
        sum = 700;
        duration = 50;
        // time = timeBAvalue; ???
    }

    else {
        description = 'из A в B и обратно в А';
        sum = 1200;
        duration = 100;
    }

    document.getElementById('message').innerHTML =
        `<p>Вы выбрали ${num} билета по маршруту ${description} стоимостью ${sum * num}.</p>
        <p>Это путешествие займет у вас ${duration} минут.</p>
        `
    // <p>Теплоход отправляется в ${time} ??, а прибудет в ????.</p>
}


