let questions = [ // Json in einem Array
    { //Beginn der ersten Frage.
        "question": "Wer hat HTML erfunden",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    { //Beginn der zweiten Frage.
        "question": "platzhalter",
        "answer_1": "platzhalter",
        "answer_2": "platzhalter",
        "answer_3": "platzhalter",
        "answer_4": "platzhalter",
        "right_answer": 2
    }
];

let rightQuestions = 0; //Variable wieviele Fragen richtig beantwortet wurden.
let currentQuestion = 0; // weist der Variabel "currentQuestion" den Wert 0 zu (0 weil erste Stelle im Array 0 ist)
let AUDIO_SUCCESS = new Audio('audio/success.mp3'); // succes.mp3 wird der Variable zugeordnet
let AUDIO_FAIL = new Audio('audio/wrong.mp3'); // wrong.mp3 wird der Variable zugeordnet.

function init() { //initialisiert automatisch die Anzahl der gesamten Fragen und die Funktion showQuestion()
    document.getElementById('all-questions').innerHTML = questions.length; //zeigt die Anzahl aller verfügbaren Fragen an.
    showQuestion();
}

function showQuestion() { //Diese Funktion überträgt die Werte aus dem JSON auf die HTML Card.
    if (gameIsOver()) {  //Abfrage der Funktion gameIsOver().
        showEndscreen(); //showEndscreen() wird ausgeführt.
    } else {
        updateProgressBar(); //updateProgressBar() wurd ausgeführt.
        updateToNextQuestion(); //showNextQuestion() wird ausgeführt.
    }
}

function gameIsOver() { //Diese Funktion prüft die Variablen und gibt 'True' oder 'False' aus.
    return currentQuestion >= questions.length; //Abfrage ob die Variable "currentQuestion" größer ist als die Variable "questions.lenght"
}

function showEndscreen() {
    document.getElementById('endScreen').style = ''; // das style tag des Elementes mit der ID 'endScreen' wird entfernt.
    document.getElementById('questionBody').style = 'display: none'; // dem Element mit der ID 'questionBody' wird der css befehl 'display: none' hinzugefügt.
    document.getElementById('amountOfQuestions').innerHTML = questions.length; // zeigt im Endscreen die Anzahl aller Fragen aus dem Array an.
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions; //zeigt im Endscreen die Anzahl der richtig beantworteten Fragen an.
    document.getElementById('header-image').src = 'img/trophy.jpg'; //Ändert das Bild vom Quiz in ein anderes Bild.
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length; //berechnet die Prozentzahl der aktuellen Frage durch alle Fragen.
    percent = Math.round(percent * 100); // Porzentzahl wird auf volle Zahlen gerundet.
    document.getElementById('progress-bar').innerHTML = `${percent} %`; //Anzeige der aktuellen Prozentzahl in der Leiste.
    document.getElementById('progress-bar').style = `width: ${percent}%`; //der Wert von 'width' in dem tag 'style' wird auf die Prozent angepasst.
}

function updateToNextQuestion() {
    let question = questions[currentQuestion]; // weißt der Varbialbe 'question' den Wert der Variable 'questions[currentQuestion] zu.
    document.getElementById('question-number').innerHTML = currentQuestion + 1; //currentQuestion wird auf den Wert 1 festgelegt (arrays starten ja bei 0).
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) { //Diese Funktion selektiert, welche Frage angeklickt worden ist. Durch (selection) wird automatisch die jeweils angeklickte Antwort registriert.
    let question = questions[currentQuestion]; //der Variable question wird das Array 'questions' zugeteilt und unter [curentQuestion] den aktuellen Container aus dem JSON
    let selectedQuestionNumber = selection.slice(-1); //In der Variable 'selectedQuestionNumber' ist die Letzte Zahl aus der Variable 'selection' gespeichert. (selection könnte auch answer_3 sein)
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { //If-else Abfrage ob der Wert von 'selectedQuestionNumber dem Wert von 'question['right_answer'] entspricht. Also ist die Angewählte Frage auch die richtige Frage.
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play(); // Spielt den Sound der Variable ab.
        rightQuestions++; // Der Wert der Variable 'rightQuestions' wird um 1 erhöht.
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger'); //parentNode bearbeitet das Element was dem angeklickten übergeordnet ist.
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play(); // Spielt den Sound der Variable ab.
    }
    document.getElementById('next-button').disabled = false; //aktiviert den vorab deaktiverten Button.
}

function nextQuestion() {
    currentQuestion++; // Die Variable wird um 1 erhöht (Aus dem Array zB von 0 auf 1).
    showQuestion();
    document.getElementById('next-button').disabled = true; // Button wird wieder deaktiviert.
    resetAnswers(); //führ die Funktion resetAnswers() aus.
}

function resetAnswers() { //Funktion deaktiviert die Farben der richtigen und falschen Antwort auf der nächsten Karte.
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger'); // entfernt die rote Farbe von Frage 1
    document.getElementById('answer_1').parentNode.classList.remove('bg-success'); // entfernt die grüne Farbe von Frage 1
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger'); // entfernt die rote Farbe von Frage 2
    document.getElementById('answer_2').parentNode.classList.remove('bg-success'); // entfernt die grüne Farbe von Frage 2
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger'); // entfernt die rote Farbe von Frage 3
    document.getElementById('answer_3').parentNode.classList.remove('bg-success'); // entfernt die grüne Farbe von Frage 3
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger'); // entfernt die rote Farbe von Frage 4
    document.getElementById('answer_4').parentNode.classList.remove('bg-success'); // entfernt die grüne Farbe von Frage 4
}

function restartGame() { // Funktion für den Button im Endscreen um das Spiel neu zu starten.
    document.getElementById('header-image').src = 'img/Group 5.png';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
    document.getElementById('endScreen').style = 'display: none'; // endScreen ausblenden.
    document.getElementById('questionBody').style = '';// questionBody wieder anzeigen.
}
