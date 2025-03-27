document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const welcomeContainer = document.getElementById("welcome-container");
    const gameContainer = document.getElementById("game-container");
    const questionText = document.getElementById("question");
    const letterGrid = document.getElementById("letter-grid");
    const scoreDisplay = document.getElementById("score");
    const livesDisplay = document.getElementById("lives-container");
    const feedback = document.getElementById("feedback");
    const deleteButton = document.getElementById("delete-button");
    const submitButton = document.getElementById("submit-button");
    const answerBox = document.getElementById("answer-box");

    const questions = [
        { question: "It is the process by which organisms break down food into forms that their cells may absorb and use.", answer: "digestion" },
        { question: "It is the biological structure within an organism that acts as protection against diseases.", answer: "immunesystem" },
        { question: "Which organ produces the hormone glucagon and insulin?", answer: "pancreas" },
        { question: "The process by which wastes are eliminated from the body of an animal is called ________.", answer: "excretion" },
        { question: "These are signaling proteins produced by body cells when being attacked by pathogens.", answer: "interferons" },
        { question: "The two upper chambers of heart are called _______.", answer: "atria" },
        { question: "What are the blood vessels that carry blood back to the heart?", answer: "veins" },
        { question: "These are chemical signals by ductless (endocrine) gland that circulate blood to the target cell, tissue, or organ that is distant from the original endocrine gland.", answer: "hormones" },
        { question: "Which part of the brain regulates body temperature, hunger, and thirst?", answer: "hypothalamus" },
        { question: "Which organ is responsible for absorbing most of the nutrients from food?", answer: "smallintestine" },
        { question: "Which hormone regulates growth and development during childhood and adolescence?", answer: "growthhormone" },
        { question: "Which nerve cells transmit signals from the central nervous system to muscles and glands?", answer: "motorneurons" },,
        { question: "Tiny blood vessels where the exchange of oxygen, nutrients, and waste products occurs between the blood and the tissues.", answer: "capillaries" },
        { question: "It is the hormone that stimulates the production in mammary glands of lactating animals.", answer: "oxytocin" },
        { question: "The process by which wastes are eliminated from the body of an animal is called?", answer: "Excretion" },
        { question: "What are the three nitrogenous wastes produced from excretion?", answer: "Urea, uric acid, and creatinine" },
        { question: "The management of water and solute concentrations in the body.", answer: "Osmoregulation" },
        { question: "The excretory structure of mammals.", answer: "Bolus" },
        { question: "Other term for partially-digested food.", answer: "Microvilli" },
        { question: "The inside of the small intestine is lined with millions of hair-like projections called ____________.", answer: "Bodysurface" },
        { question: "In earthworms (annelids) and flatworms (Platyhelminthes) the respiration occurs in their ____________.", answer: "Gills" },
        { question: "Used by aquatic animals to facilitate gas exchange.", answer: "Homeostasis" },
        { question: "Refers to the ability of the body to remain a stable internal environment despite the fluctuations on the external world.", answer: "Urine" },
        { question: "The kidneys filter waste products to the blood, including urea, excess water, and electrolytes. These waste products are then excreted in a form of ____________.", answer: "Allergy" }
    ];
    

    let currentQuestionIndex = 0;
    let score = 0;
    let lives = 3;
    let selectedLetters = "";

    startButton.addEventListener("click", function () {
        welcomeContainer.style.display = "none";
        gameContainer.style.display = "block";
        startGame();
    });

    function startGame() {
        score = 0;
        lives = 3;
        currentQuestionIndex = 0;
        scoreDisplay.innerText = `Score: ${score}`;
        updateLives();
        loadQuestion();
    }

    function loadQuestion() {
        if (lives <= 0) {
            showGameOver();
            return;
        }
        if (currentQuestionIndex >= questions.length) {
            alert("🎉 Congratulations! You completed the game.");
            restartGame();
            return;
        }
        let currentQuestion = questions[currentQuestionIndex];
        questionText.innerText = currentQuestion.question;
        generateLetterGrid(currentQuestion.answer);
    }

    function generateLetterGrid(answer) {
        letterGrid.innerHTML = "";
        selectedLetters = "";
        answerBox.value = "";

        let letters = answer.toUpperCase().split("");
        let additionalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        while (letters.length < 15) {
            let randomLetter = additionalLetters[Math.floor(Math.random() * additionalLetters.length)];
            letters.push(randomLetter);
        }

        letters = letters.sort(() => Math.random() - 0.5);

        letters.forEach(letter => {
            let div = document.createElement("div");
            div.classList.add("letter");
            div.innerText = letter;
            div.onclick = () => toggleLetter(div);
            letterGrid.appendChild(div);
        });
    }

    function toggleLetter(div) {
        if (div.classList.contains("selected")) {
            div.classList.remove("selected");
            selectedLetters = selectedLetters.replace(div.innerText, "");
        } else {
            div.classList.add("selected");
            selectedLetters += div.innerText;
        }
        answerBox.value = selectedLetters;
    }

    function clearSelection() {
        selectedLetters = "";
        answerBox.value = "";
        document.querySelectorAll(".letter.selected").forEach(div => {
            div.classList.remove("selected");
        });
    }

    function checkAnswer() {
        if (selectedLetters.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
            score += 10;
            scoreDisplay.innerText = `Score: ${score}`;
            feedback.innerText = "✅ Correct!";
            feedback.style.color = "green";
            currentQuestionIndex++;
            setTimeout(() => {
                feedback.innerText = "";
                loadQuestion();
            }, 1000);
        } else {
            lives--;
            feedback.innerText = "❌ Wrong!";
            feedback.style.color = "red";
            updateLives();
            if (lives <= 0) {
                setTimeout(showGameOver, 1000);
            }
        }
        clearSelection();
    }

    function updateLives() {
        let hearts = "❤️".repeat(lives) + "💔".repeat(3 - lives);
        livesDisplay.innerText = `Lives: ${hearts}`;
    }

    function showGameOver() {
        alert(`Game Over! Your final score: ${score}`);
        restartGame();
    }

    function restartGame() {
        gameContainer.style.display = "none";
        welcomeContainer.style.display = "block";
    }

    deleteButton.addEventListener("click", clearSelection);
    submitButton.addEventListener("click", checkAnswer);
});
