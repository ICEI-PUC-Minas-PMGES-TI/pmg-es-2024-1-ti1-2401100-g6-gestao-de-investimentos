var answers = {};

var question_one = document.getElementById('question-1');
var question_two = document.getElementById('question-2');
var question_three = document.getElementById('question-3');
var question_four = document.getElementById('question-4');
var question_five = document.getElementById('question-5');

function storeAnswer(question_number, event) {
    if (event.target.type === 'radio') {
        console.log(event.target.value);
        answers['question' + question_number] = parseInt(event.target.value);
        console.log(answers);
    }
}

question_one.addEventListener('click', function (event) {
    storeAnswer(1, event)
})
question_two.addEventListener('click', function (event) {
    storeAnswer(2, event)
})
question_three.addEventListener('click', function (event) {
    storeAnswer(3, event)
})
question_four.addEventListener('click', function (event) {
    storeAnswer(4, event)
})
question_five.addEventListener('click', function (event) {
    storeAnswer(5, event)
})

function totalScore() {
    var total_score =
        answers.question1 +
        answers.question2 +
        answers.question3 +
        answers.question4 +
        answers.question5;

    return total_score;
}

function getInvestmentProfile() {
    var answerCounts = { a: 0, b: 0, c: 0 };

    for (var question in answers) {
        var answer = answers[question];
        if (answer === 1) {
            answerCounts['a']++;
        } else if (answer === 2) {
            answerCounts['b']++;
        } else if (answer === 3) {
            answerCounts['c']++;
        }
    }


    if (answerCounts['a'] >= 3) {
        return "Conservador";
    } else if (answerCounts['c'] >= 3) {
        return "Agressivo";
    } else if (answerCounts['b'] >= 3) {
        return "Moderado";
    } else if (answerCounts['b'] === 2 && answerCounts['c'] >= 1) {
        return "Moderadamente Agressivo";
    } else if (answerCounts['a'] === 2 && answerCounts['c'] >= 1) {
        return "Conservador Agressivo";
    } else {
        return "Moderado"; 
    }
}

var submit1 = document.getElementById('submit1');
var submit2 = document.getElementById('submit2');
var submit3 = document.getElementById('submit3');
var submit4 = document.getElementById('submit4');
var submit5 = document.getElementById('submit5');

function nextQuestion(question_number) {
    var current_question_number = question_number - 1;
    var question_number = question_number.toString();
    var current_question_number = current_question_number.toString();

    var el = document.getElementById('question-' + question_number);
    var el2 = document.getElementById('question-' + current_question_number);

    el.style.display = "block";
    el2.style.display = "none";
}

submit1.addEventListener('click', function () {
    if (!answers.hasOwnProperty('question1')) {
        alert('Por favor, selecione uma resposta para a pergunta 1 antes de prosseguir.');
        return;
    }
    nextQuestion(2);
    growProgressBar('50%');
})
submit2.addEventListener('click', function () {
    if (!answers.hasOwnProperty('question2')) {
        alert('Por favor, selecione uma resposta para a pergunta 2 antes de prosseguir.');
        return;
    }
    nextQuestion(3);
    growProgressBar('75%');
})
submit3.addEventListener('click', function () {
    if (!answers.hasOwnProperty('question3')) {
        alert('Por favor, selecione uma resposta para a pergunta 3 antes de prosseguir.');
        return;
    }
    nextQuestion(4);
    growProgressBar('100%');
})
submit4.addEventListener('click', function () {
    if (!answers.hasOwnProperty('question4')) {
        alert('Por favor, selecione uma resposta para a pergunta 4 antes de prosseguir.');
        return;
    }
    nextQuestion(5);
    growProgressBar('125%');
})
submit5.addEventListener('click', function () {
    if (!answers.hasOwnProperty('question5')) {
        alert('Por favor, selecione uma resposta para a pergunta 5 antes de prosseguir.');
        return;
    }
    nextQuestion(6);
    growProgressBar('150%');

    var investmentProfile = getInvestmentProfile();
    /*document.getElementById("printscoreinfo").innerHTML = "Seu perfil de investimento é: " + investmentProfile;*/
    document.getElementById("printtotalscore").innerHTML = investmentProfile;
})

function growProgressBar(percentage_width) {
    var bar = document.getElementById("progress_bar");
    bar.style.width = percentage_width;
}
