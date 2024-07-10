document.addEventListener('DOMContentLoaded', function() {
    const letsDoItButton = document.getElementById('letsDoItButton');
    const questionTitle = document.getElementById('questionTitle');
    const questionContent = document.getElementById('questionContent');
    const previousQuestionButton = document.getElementById('previousQuestionButton');
    const progressBar = document.getElementById('progressBar');
    const mainSection = document.getElementById('mainSection');
    const containerSection = document.getElementById('containerSection')

   
    let logArray = [];
    const questions = [
        {
            title: 'Enter your name',
            type: 'text'
        },
        {
            title: 'I could not seem to experience any positive feeling at all',
            type: 'checkbox',
            options: [
                { label: 'Never', value: 'never' },
                { label: 'Sometimes', value: 'sometimes' },
                { label: 'Often', value: 'often' },
                { label: 'Almost always', value: 'almost always' }
            ]
        },
        {
            title: 'I prefer watching a video to reading.',
            type: 'radio',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ]
        },
        {
            title: 'I can play sports',
            type: 'radio',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ]
        },
        {
            title: 'Please describe your morning routine',
            type: 'text'
        },
        {
            title: 'I felt that I was rather touchy',
            type: 'checkbox',
            options: [
                { label: 'Never', value: 'never' },
                { label: 'Sometimes', value: 'sometimes' },
                { label: 'Often', value: 'often' },
                { label: 'Almost always', value: 'almost always' }
            ]
        },
        {
            title: 'I felt I was close to panic',
            type: 'checkbox',
            options: [
                { label: 'Never', value: 'never' },
                { label: 'Sometimes', value: 'sometimes' },
                { label: 'Often', value: 'often' },
                { label: 'Almost always', value: 'almost always' }
            ]
        },
        {
            title: 'I found it difficult to relax',
            type: 'checkbox',
            options: [
                { label: 'Never', value: 'never' },
                { label: 'Sometimes', value: 'sometimes' },
                { label: 'Often', value: 'often' },
                { label: 'Almost always', value: 'almost always' }
            ]
        },
        {
            title: 'I felt that I had nothing to look forward to',
            type: 'checkbox',
            options: [
                { label: 'Never', value: 'never' },
                { label: 'Sometimes', value: 'sometimes' },
                { label: 'Often', value: 'often' },
                { label: 'Almost always', value: 'almost always' }
            ]
        },
        {
            title: 'While reading a story I can imagine the situation of it',
            type: 'radio',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ]
        },
        {
            title: 'Was the questionnaire accurate?',
            type: 'radio',
            options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ]
        }
    ];

    let currentQuestionIndex = -1;
    previousQuestionButton.style.display = 'none';
    
    function updateProgressBar() {
        const progress = (currentQuestionIndex + 1) / questions.length * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function showNextQuestion() {
        if (currentQuestionIndex >= 0) {
            const currentQuestion = questions[currentQuestionIndex];
            let isValid = false;

            if (currentQuestion.type === 'checkbox') {
                const checkedCheckboxes = document.querySelectorAll('input[name="answer"]:checked');
                const selectedValues = [];
                checkedCheckboxes.forEach(checkbox => selectedValues.push(checkbox.value));
                logArray[currentQuestionIndex] = selectedValues;
                isValid = checkedCheckboxes.length > 0;
                if (!isValid) {
                    alert('Please select at least one option before proceeding.');
                    return;
                }
            } else if (currentQuestion.type === 'radio') {
                const checkedRadios = document.querySelectorAll('input[name="answer"]:checked');
                const selectedValue = checkedRadios.length > 0 ? checkedRadios[0].value : null;
                logArray[currentQuestionIndex] = selectedValue;
                isValid = checkedRadios.length > 0;
                if (!isValid) {
                    alert('Please select an answer before proceeding.');
                    return;
                }
            } else if (currentQuestion.type === 'text') {
                const textInput = document.querySelector('input[name="answer"]');
                logArray[currentQuestionIndex] = textInput.value;
                isValid = textInput.value.trim() !== '';
                if (!isValid) {
                    alert('Please provide an answer before proceeding.');
                    return;
                }
            }
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionTitle.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.title}`;
            renderQuestion(currentQuestion);
            if (currentQuestionIndex > 0) {
                previousQuestionButton.style.display = 'inline-block';
            } else {
                previousQuestionButton.style.display = 'none';
            }

            if (currentQuestionIndex === questions.length - 1) {
                const nextQuestionButton = document.getElementById('nextQuestionButton');
                nextQuestionButton.textContent = 'Submit Answers';
                nextQuestionButton.removeEventListener('click', showNextQuestion);
                nextQuestionButton.addEventListener('click', submitAnswers);
            }
            updateProgressBar();
            
        } else {
            alert('You have completed all questions!');
        }
    }

    function submitAnswers() {
        let allQuestionsAnswered = true;

        questions.forEach((question, index) => {
            let isValid = false;

            if (question.type === 'checkbox') {
                const checkedCheckboxes = document.querySelectorAll(`#questionContent input[name="answer"]:checked`);
                isValid = checkedCheckboxes.length > 0;
            } else if (question.type === 'radio') {
                const checkedRadios = document.querySelectorAll(`#questionContent input[name="answer"]:checked`);
                isValid = checkedRadios.length > 0;
            } else if (question.type === 'text') {
                const textInput = document.querySelector('#questionContent input[name="answer"]');
                isValid = textInput && textInput.value.trim() !== '';
            }

            if (!isValid) {
                allQuestionsAnswered = false;
            }
        });

        if (!allQuestionsAnswered) {
            alert('Please answer all questions before submitting.');
            return;
        }

        console.log('Responses:', logArray);
        clearPageAndDisplayResponses();
    }

    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            const currentQuestion = questions[currentQuestionIndex];
            questionTitle.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.title}`;
            renderQuestion(currentQuestion);
            if (currentQuestionIndex > 0) {
                previousQuestionButton.style.display = 'inline-block';
            } else {
                previousQuestionButton.style.display = 'none';
            }
        }
    }

    function renderQuestion(question) {
        questionContent.innerHTML = '';
        const questionElement = document.createElement('p');
        questionContent.appendChild(questionElement);

        if (question.type === 'text') {
            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.name = 'answer';
            inputElement.style.width = '100%';
            inputElement.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
            inputElement.style.padding = '8px';
            inputElement.style.marginTop = '10px';
            questionContent.appendChild(inputElement);
        } else {
            question.options.forEach(option => {
                const label = document.createElement('label');
                label.style.display = 'flex';
                label.style.alignItems = 'center';

                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.alignItems = 'center';
                container.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
                container.style.padding = '8px';
                container.style.marginBottom = '10px';

                const inputElement = document.createElement('input');
                inputElement.type = question.type === 'checkbox' ? 'checkbox' : 'radio';
                inputElement.name = 'answer';
                inputElement.value = option.value;

                const textSpan = document.createElement('span');
                textSpan.textContent = option.label;
                textSpan.style.marginLeft = '8px';

                container.appendChild(inputElement);
                container.appendChild(textSpan);

                label.appendChild(container);
                questionContent.appendChild(label);
            });
        }
        const nextQuestionButton = document.createElement('button');
        nextQuestionButton.textContent = 'Next Question';
        nextQuestionButton.id = 'nextQuestionButton';
        nextQuestionButton.addEventListener('click', showNextQuestion);
        questionContent.appendChild(nextQuestionButton);
    }

    letsDoItButton.addEventListener('click', function() {
        showNextQuestion();
        letsDoItButton.style.display = 'none';
        questionTitle.style.fontSize = "20px";
        mainSection.style.backgroundImage = 'url("https://framerusercontent.com/images/3urAVubihvc9H784Rj5nboLozC4.png")'; 
    });

    function clearPageAndDisplayResponses() {
        containerSection.innerHTML = '';
    
        const thankYouMessage = document.createElement('div');
        thankYouMessage.textContent = 'Thank you for completing the questionnaire!';
        thankYouMessage.classList.add('thank-you-message');
        containerSection.appendChild(thankYouMessage);
    
        const table = document.createElement('table');
        table.classList.add('response-table');
        const headerRow = document.createElement('tr');
        const thQuestion = document.createElement('th');
        thQuestion.textContent = 'Question';
        const thAnswer = document.createElement('th');
        thAnswer.textContent = 'Answer';
        headerRow.appendChild(thQuestion);
        headerRow.appendChild(thAnswer);
        table.appendChild(headerRow);
    
        questions.forEach((question, index) => {
            const row = document.createElement('tr');
            const tdQuestion = document.createElement('td');
            tdQuestion.textContent = question.title;
            const tdAnswer = document.createElement('td');
            tdAnswer.textContent = Array.isArray(logArray[index]) ? logArray[index].join(', ') : logArray[index];
            row.appendChild(tdQuestion);
            row.appendChild(tdAnswer);
            table.appendChild(row);
        });
    
        containerSection.appendChild(table);
    
        logArray = [];
        currentQuestionIndex = -1;
    }
    

    previousQuestionButton.addEventListener('click', showPreviousQuestion);
});
