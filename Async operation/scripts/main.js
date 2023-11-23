// 1. Работаем с отложенным выполнением кода. Нужно вывести в консоль сообщение "Delayed message", через 5 секунд после запуска скрипта.

setTimeout(() => {console.log('Delayed message')
}, 5000);

// 2. Делаем блок на странице, который будет запускать отложенное выполнение. Нужно сделать инпут, в который будем вводить задержку в секундах, и кнопку "Запуск". При нажатии на кнопку "Запуск", нужно через N секунд вывести сообщение "Delayed message". N - это кол-во секунд, введенное в инпуте.
// 3. Дорабатываем наш блок. Добавляем кнопку "Отмена". Изначально она должна быть скрыта (рекомендуется воспользоваться CSS).
//  - когда мы нажимаем на кнопку "Запуск", мы показываем кнопку "Отмена".
//  - при нажатии на кнопку "Отмена", нам нужно отменить запланированное в `setTimeout` выполнение.
//  - если выполнение все же произошло (т.е. функциональность внутри `setTimeout` выполнилась), то кнопку "Отмена" скрываем.

const main = document.querySelector('.mainContainer');
const input = document.createElement('input');
main.append(input);

const btn = document.createElement('button');
btn.textContent = 'Запуск';
main.append(btn);

const btnCancel = document.createElement('button');
btnCancel.textContent = 'Отмена';
btnCancel.disabled = true;
main.append(btnCancel);

let timerId;
btn.addEventListener('click', () => {
    if(!Number.isNaN(+input.value)){
        btnCancel.disabled = false;
        timerId = setTimeout(() => {console.log('Delayed message')
        btnCancel.disabled = true;
    }, input.value * 1000);
    }else{
        console.log('Not a number');
    }
});

btnCancel.addEventListener('click', () => {
    clearTimeout(timerId);
    btnCancel.disabled = true;
});

// 4. Работаем с другой асинхронной операцией. Наша задача - каждые 5 секунд выводить в консоль сообщение "Прошло 5 секунд".

setInterval(() => {console.log('Прошло 5 секунд')
}, 5000);

// 5. Добавляем на страницу текущие дату и время. Нужно добавить в разметку блок, в котором должны отображаться текущие дата и время, вида `01.01.2000 11:23:55`. И нужно сделать так, чтобы дата и время отображались актуальные (т.е. обновлять текст ежесекундно).

const date = new Date();
const now = date.toLocaleDateString() +' ' + date.toLocaleTimeString();

const newDate = document.createElement('p');
newDate.textContent = now;
main.append(newDate);

function updateTimerDisplay() {
    if(newDate) newDate.textContent = now;
}
setInterval(() => {newDate}, 1000); 
//Не работает. Время обновляется, когда обновляется страница

// 6. Реализуем простой секундомер. Нужно добавить в блок с id=`simpleTimerContainer` секундомер. В блоке будут:
//  - параграф, в котором будем выводить текущее время секундомера
//  - кнопка "Старт" - при нажатии запускаем секундомер
//  - кнопка "Сброс" - при нажатии сбрасываем секундомер.

const timer = document.createElement('div');
timer.setAttribute('id', 'simpleTimerContainer')
main.append(timer)

const timerText = document.createElement('p');
timerText.textContent = '0 seconds';
const btnStart = document.createElement('button');
btnStart.textContent = 'Start';
const btnBreak = document.createElement('button');
btnBreak.textContent = 'Reset';
timer.append(timerText, btnStart, btnBreak)

let timerInterval;
let seconds = 0;

btnStart.addEventListener('click', () => {
    timerInterval = setInterval(function () {
        seconds++;
        updateTimerDisplay();
    }, 1000);
})

btnBreak.addEventListener('click', () => {
    clearInterval(timerInterval);
    seconds = 0;
    updateTimerDisplay();
})

function updateTimerDisplay() {
    timerText.textContent = seconds +' seconds';
}

// 7. Усложняем наш секундомер. Нам нужно добавить кнопки "Пауза", "Возобновить". Первая будет приостанавливать, но не сбрасывать секундомер, а вторая - возобновлять его работу.

const btnPause = document.createElement('button');
btnPause.textContent = 'Pause';
const btnPlay = document.createElement('button');
btnPlay.textContent = 'Play';
timer.append(btnPause, btnPlay);

btnPause.addEventListener('click', () => {
    clearInterval(timerInterval)
});

btnPlay.addEventListener('click', () => {
    timerInterval = setInterval(function () {
        seconds++;
        updateTimerDisplay();
    }, 1000);
});

// 8. Работаем с промисами. Задача - написать промис, который через 5 секунд будет успешно завершен текстом "Successfully finished!". Этот текст нужно вывести в консоль.

const newPromise = new Promise((resolve, reject) => {
 setTimeout(() => {
    resolve("Successfully finished!")
}, 5000)
}); 
newPromise.then((result) => console.log(result));

// 9. Теперь задача через 5 секунд завершить промис "неуспехом", с текстом "Something went wrong!", и вывести результат в консоль.
const newPromise1 = new Promise( ( resolve, reject) => {
    setTimeout( () => {
        reject('Something went wrong!')
    }, 5000);
 });

 newPromise1.then(
    (result) => { console.log(result) }
 )
 .catch( error => { console.log(error) } );
