document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });

    // Quiz logic
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const progressBar = document.getElementById('progress_bar');
    const resultSection = document.getElementById('result');
    let currentQuestion = 0;
    let score = 0;

    quizQuestions[currentQuestion].classList.add('active');
    progressBar.innerHTML = '<div style="width: 0%"></div>';

    function showNextQuestion() {
        quizQuestions[currentQuestion].classList.remove('active');
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            quizQuestions[currentQuestion].classList.add('active');
            progressBar.innerHTML = `<div style="width: ${(currentQuestion / (quizQuestions.length - 1)) * 100}%"></div>`;
        } else {
            showResult();
        }
    }

    function showResult() {
        const profileType = document.getElementById('printtotalscore');
        const profileDescription = document.getElementById('printscoreinfo');
        
        if (score <= 8) {
            profileType.textContent = 'Conservative Investor';
            profileDescription.textContent = 'You prefer to preserve your capital and are risk-averse. Stability and safety are your main priorities.';
        } else if (score <= 12) {
            profileType.textContent = 'Moderate Investor';
            profileDescription.textContent = 'You have a balanced approach to investing, seeking a mix of growth and security. You are comfortable with a moderate level of risk.';
        } else {
            profileType.textContent = 'Aggressive Investor';
            profileDescription.textContent = 'You are willing to take high risks for the potential of higher returns. You aim for significant growth over the long term.';
        }

        resultSection.style.display = 'block';
        progressBar.innerHTML = '<div style="width: 100%"></div>';
    }

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            const questionNumber = parseInt(this.id.replace('submit', ''), 10);
            const answer = document.querySelector(`input[name="question${questionNumber}"]:checked`);

            if (answer) {
                score += parseInt(answer.value, 10);
                showNextQuestion();
            } else {
                alert('Please select an answer.');
            }
        });
    });

    document.querySelector('.retake-button').addEventListener('click', function() {
        currentQuestion = 0;
        score = 0;
        quizQuestions.forEach(question => question.classList.remove('active'));
        quizQuestions[currentQuestion].classList.add('active');
        resultSection.style.display = 'none';
        progressBar.innerHTML = '<div style="width: 0%"></div>';
    });
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Default open tab
document.getElementsByClassName("tab-button")[0].click();
