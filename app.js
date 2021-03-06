

// array of objects with the correct values
let questions = [
    { "Javascript goes at the bottom of the body.": true },
    { "<p> is a header tag?": false },
    { "You can make a <div> inside of a <div>": true },
    { "[] are used for Arrays": true },
    { "This Quiz is Awesome!": true },
]

let highScore = 0

let userName = 'No current high score'

let scoreLog = JSON.parse(localStorage.getItem('scoreLog')) || []

for (let i = 0; i < scoreLog.length; i++) {
    highScore = scoreLog[i].highScore
    userName = scoreLog[i].userName
}

document.getElementById('username').innerHTML = `
High Score:&nbsp;${highScore}
User: ${userName}
`


const endGame = () => {
    if (score > highScore) {
        highScore = score
        document.getElementById('lastBtn').addEventListener('click', (event) => {
            


            userName = document.getElementById('lastInput').value
            console.log(userName)

            let scoreObj = {
                highScore: highScore,
                userName: userName
            }


            scoreLog.push(scoreObj)


            localStorage.setItem('scoreLog', JSON.stringify(scoreLog))
        })
    }

}



    let score = 0
    let count = 120
    document.getElementById("div1").textContent = count

    let questionCounter = 0

    function showQ() {
        if (questionCounter < questions.length) {
            let question = Object.keys(questions[questionCounter])
            console.log(question)
            document.getElementById("showq").textContent = question
            document.getElementById("result").innerHTML = ""//added this line to make the green and red boxes go away when next question
        }
        else {

            document.getElementById('leaderboards').innerHTML = `
        <form>
        <p>Game Over!</p>
        <p>Your score: ${score}</p>
<input id="lastInput" placeholder="Enter Name"></input>
<button id="lastBtn">Submit score</button>
</form>
`



        }
    }

    // function for the start quiz button
    function handleStart(event) {
        event.preventDefault()
        // makes displays goes away when u click button
        let startDiv = document.getElementById('startDiv')
        if (startDiv.style.display !== "none") {
            startDiv.style.display = "none"

            let startButtons = document.getElementById('startButtons')
            startButtons.style.display = "block"


        }
        showQ()

        let myTimer = setInterval(() => {
            count--
            if (count <= 0) {
                alert('Time is up!')
                clearInterval(myTimer)
                count = 120
                startDiv.style.display = "block"
                startButtons.style.display = "none"

            }

            document.getElementById('score').textContent = score
            document.getElementById("div1").textContent = count

        }, 1000)
    }






    // this button for start quiz along with above code makes div above jumbotron go away
    document.getElementById("start").addEventListener('click', handleStart)

    document.getElementById('true').addEventListener('click', () => {
        if (questionCounter >= questions) return
        let answer = Object.values(questions[questionCounter])
        if (answer == 'true') {
            score += 10
            document.getElementById('result').innerHTML = `
<div class="alert alert-success" role="alert" id="largeFont">
Right!!
</div>

`
        } else {
            count -= 10
            document.getElementById('result').innerHTML = `
<div class="alert alert-danger" role="alert"id="largeFont">
Wrong!! 
</div>


`

        }
        let delayer = setTimeout(() => {
            questionCounter += 1
            clearTimeout(delayer)
            showQ()
            endGame()  
        }, 400)
         
    })


    document.getElementById('false').addEventListener('click', () => {
        if (questionCounter >= questions) return

        let answer = Object.values(questions[questionCounter])
        if (answer == 'false') {
            score += 10
            document.getElementById('result').innerHTML = `
<div class="alert alert-success" role="alert" id="largeFont">
Right!!
</div>

`

        } else {
            count -= 10
            document.getElementById('result').innerHTML = `
<div class="alert alert-danger" role="alert"id="largeFont">
Wrong!! 
</div>

`

        }

        let delayer = setTimeout(() => {
            questionCounter += 1
            clearTimeout(delayer)
            showQ()
            endGame()
        }, 400)
       
    })


