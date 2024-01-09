let questions = [ // Json in einem Array
    { //Beginn der ersten Frage.
        "question": "Wer hat HTML erfunden",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "platzhalter",
        "answer_1": "platzhalter",
        "answer_2": "platzhalter",
        "answer_3": "platzhalter",
        "answer_4": "platzhalter",
        "right_answer": 2
    }
];


let currentQuestion = 0; // weist der Variabel "currentQuestion" den Wert 0 zu (0 weil erste Stelle im Array 0 ist)

function init(){ //initialisiert automatisch die Anzahl der gesamten Fragen und die Funktion showQuestion()
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() { //Diese Funktion überträgt die Werte aus dem JSON auf die HTML Card
    let question = questions[currentQuestion]; 

document.getElementById('questiontext').innerHTML = question['question'];
document.getElementById('answer_1').innerHTML = question['answer_1'];
document.getElementById('answer_2').innerHTML = question['answer_2'];
document.getElementById('answer_3').innerHTML = question['answer_3'];
document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection){ //Diese Funktion selektiert, welche Frage angeklickt worden ist. Durch (selection) wird automatisch die jeweils angeklickte Antwort registriert.
    let question = questions[currentQuestion]; //der Variable question wird das Array 'questions' zugeteilt und unter [curentQuestion] den aktuellen Container aus dem JSON
    console.log('selected answer is', selection) //Konsolenausgabe um die Auswahl funktioniert.
    let selectedQuestionNumber = selection.slice(-1); //In der Variable 'selectedQuestionNumber' ist die Letzte Zahl aus der Variable 'selection' gespeichert. (selection könnte auch answer_3 sein)
    console.log('SelectedQuestinNumer is ',selectedQuestionNumber) //Konsolenausgabe ob die richtige Zahl von 'answer_' ausgewählt wurde.
    console.log('Current question is', question['right_answer']) //Konsolenausgabe als Abfrage, welche Antwort die richtige Wäre

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { //If-else Abfrage ob der Wert von 'selectedQuestionNumber dem Wert von 'question['right_answer'] entspricht. Also ist die Angewählte Frage auch die richtige Frage.
        console.log('Richtige Antwort'); //Konsolenausgabe, wenn die Antwort richtig ausgewählt wurde.
        document.getElementById(selection).parentNode.classList.add('bg-success');
    } else {
        console.log('falsche Antwort'); //Konsolenausgabe, wenn die Antwort falsch ausgewählt wurde.
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}