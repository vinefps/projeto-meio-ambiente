
const playButton = document.querySelector('.play')
const pauseButton = document.querySelector('.pause')
const stopButton = document.querySelector('.stop')
const addButton = document.querySelector('.add')
const decreaseButton = document.querySelector('.decrease')

const minutesDisplay = document.querySelector('#minutes')
const secondsDisplay = document.querySelector('#seconds')

const buttonPressSound = new Audio('./sounds/ButtonPress.wav')
const alarmSound = new Audio('./sounds/KitchenTimer.mp3')

let minutesSet = 25
let secondsSet = 0 

const addTaskBtn = document.querySelector('.addTask')
const deleteTask = document.querySelector('.deleteTask')
const inputTask = document.querySelector('#task')

const tasks = {
    all: []
}

const funcTasks = {
    nextId: 1,

    showList(list) {
        list.forEach(function (task) {
            DOM.showTask(task)
        })
    },

    add(newTask) {
        const task = {
            id: funcTasks.nextId,
            description: newTask
        };

        tasks.all.push(task);
        funcTasks.nextId++;

        App.reload();
    },

    exclude(excludeTask) {
        const index = tasks.all.findIndex((task) => {
            task.id === excludeTask;
        });

        tasks.all.splice(index, 1);
        App.reload();
    }
}

const DOM = {
    taskContainer: document.querySelector('#task-table tbody'),

    showTask(task) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.formatTask(task)

        DOM.taskContainer.appendChild(tr)
    },


    formatTask(task) {

        const taskAdded = ` 
            <td> <img src="./assets/long-arrow-pointing-to-the-right.png" alt="seta apontando para a atividade" height="20px" width="20px"></td>
            <td> ${task.description}</td>
            <td> <button class="deleteTask"><img src="./assets/close.png" alt="" height="20px" width="20px" onclick="funcTasks.exclude(${task.id})"></button></td>
        `
        return taskAdded
    },

    clearList() {
        DOM.taskContainer.innerHTML = ""
    }
}

const App = {
    init() {
        funcTasks.showList(tasks.all)
    },

    reload() {
        DOM.clearList()
        App.init()
    }
}

function countdown() {
    timerPause = setTimeout(function () {
        seconds = Number(secondsDisplay.textContent)
        minutes = Number(minutesDisplay.textContent)

        if (minutes <= 0 && seconds <= 0) {
            alarmSound.play()
            togglePlayPause()
            return
        }

        if (seconds <= 0) {
            seconds = 60

            --minutes
        }

        --seconds
        
        secondsDisplay.textContent = String(seconds).padStart(2, "0")
        minutesDisplay.textContent = String(minutes).padStart(2, "0")
        
        countdown()
    }, 1000)
}

function togglePlayPause() {
    playButton.classList.toggle('hide')
    pauseButton.classList.toggle('hide')
}

function addTimer() {
    minutesDisplay.textContent = String(Number(minutesDisplay.textContent) + 5).padStart(2, "0")
    minutesSet = minutesDisplay.textContent

    if (minutesSet > 60) {
        alert('Não é possível atribuir um intervalo maior que 60min')
        secondsDisplay.textContent = String(0).padStart(2, "0")
        return minutesDisplay.textContent = String(60)
    }

    secondsSet = 0
}

function decreaseTimer() {
    minutesDisplay.textContent = String(Number(minutesDisplay.textContent) - 5).padStart(2, "0")
    minutesSet = minutesDisplay.textContent

    if (minutesSet < 0) {
        alert('Não é possível diminuir mais o tempo')
        secondsDisplay.textContent = String(0).padStart(2, "0")
        return minutesDisplay.textContent = String(0).padStart(2, "0")
    }

    secondsSet = 0
}

function resetTimer() {
    minutesDisplay.textContent = String(minutesSet).padStart(2, "0")
    secondsDisplay.textContent = String(secondsSet).padStart(2, "0")
}

playButton.addEventListener('click', function () {
    buttonPressSound.play()
    togglePlayPause()
    countdown()
})

pauseButton.addEventListener('click', function () {
    buttonPressSound.play()
    togglePlayPause()
    clearTimeout(timerPause)
})

stopButton.addEventListener('click', function () {
    buttonPressSound.play()
    resetTimer()
})

addButton.addEventListener('click', function () {
    buttonPressSound.play()
    addTimer()
})

decreaseButton.addEventListener('click', function () {
    buttonPressSound.play()
    decreaseTimer()
})

addTaskBtn.addEventListener('click', function (event) {
    event.preventDefault()

    if (inputTask.value) {
        funcTasks.add(inputTask.value)
    } else {
        alert("Por favor insira uma atividade para então adiciona-la a sua agenda")
    }

})

App.init()