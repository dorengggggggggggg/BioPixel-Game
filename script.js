const questions = [
    // Easy Mode
    { question: "What is the process of changing food into a simple substance for use by the cells?", answer: "DIGESTION" },
    { question: "Which system is responsible for the exchange of oxygen and carbon dioxide between the air and the cells?", answer: "RESPIRATORYSYSTEM" },
    { question: "A complex communication network in the body, responsible for receiving, processing and responding to stimuli, controlling bodily functions, and enabling thoughts, feelings, and actions.", answer: "NERVOUSSYSTEM" },
    { question: "Pumps blood throughout the body, supplying oxygen and nutrients to tissues and organs.", answer: "HEART" },
    { question: "Where does the exchange of gases take place?", answer: "LUNGS" },
    { question: "A complex network of cells, tissues, and organs that defends the body against infections and diseases by recognizing and destroying harmful substances and abnormal cells.", answer: "IMMUNESYSTEM" },
    { question: "Used by aquatic animals to facilitate gas exchange.", answer: "GILLS" },
    { question: "Which gas is essential for animals to survive?", answer: "OXYGEN" },
    { question: "A fluid that carries oxygen, nutrients, hormones, and waste products.", answer: "BLOOD" },
    { question: "The majority of nutrient absorption occurs in the _____", answer: "SMALLINTESTINE" },

    // Medium Mode
    { question: "The inside of the small intestine is lined with millions of hair-like projections called ___", answer: "VILLI" },
    { question: "Moves from the blood capillaries into the alveoli to be exhaled.", answer: "CARBONDIOXIDE" },
    { question: "The exchange of oxygen and carbon dioxide between the blood and body cells.", answer: "INTERNALRESPIRATION" },
    { question: "A network of tubes that carry blood throughout the body.", answer: "BLOODVESSELS" },
    { question: "Refers to the ability of the body to remain in a stable internal environment despite the fluctuations in the external world.", answer: "HOMEOSTASIS" },
    { question: "Tiny blood vessels where the exchange of oxygen, nutrients, and waste products occurs between the blood and the tissues.", answer: "CAPILLARIES" },
    { question: "Which organ plays a crucial role in maintaining the balance of water, salt, and other substances in the body fluids that surround cells?", answer: "KIDNEY" },
    { question: "The kidneys filter waste products to the blood, including urea, excess water, and electrolytes. These waste products are then excreted in a form of ___________", answer: "URINE" },
    { question: "What is called the chemical messengers produced by glands that travel through the bloodstream to regulate various bodily functions, including growth, development, metabolism, and reproduction?", answer: "HORMONES" },

    // Hard Mode
    { question: "Consequences of failing homeostasis.", answer: "DEATHANDDISEASE" },
    { question: "An overreaction of the immune system to harmless substances.", answer: "ALLERGY" },
    { question: "This is a more specific and long-lasting immune response that develops over time through exposure to pathogens.", answer: "ADAPTIVEIMMUNITY" },
    { question: "What is the hormone that prepares the body for 'fight or flight' situations?", answer: "ADRENALINE" },
    { question: "Controls involuntary functions like heart rate, digestion, and breathing.", answer: "AUTONOMICNERVOUSSYSTEM" },
    { question: "Also known as the body's 'blood cell factory,' producing red blood cells, white blood cells, and platelets, which are essential for oxygen transport, fighting infection, and blood clotting.", answer: "BONEMARROW" },
    { question: "What is it called when the body maintains water and salt balance?", answer: "OSMOREGULATION" }
];

let currentQuestionIndex = 0;
let selectedLetters = "";
let score = 0;

function loadQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    generateLetterGrid(questions[currentQuestionIndex].answer);
}

function generateLetterGrid(answer) {
    let grid = document.getElementById("letter-grid");
    grid.innerHTML = "";
    let letters = answer.replace(/ /g, "").split(""); // Remove spaces when creating grid
    
    // Add random extra letters to increase difficulty
    const extraLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while (letters.length < 12) {
        letters.push(extraLetters[Math.floor(Math.random() * extraLetters.length)]);
    }
    
    // Shuffle letters randomly
    letters = letters.sort(() => Math.random() - 0.5);

    letters.forEach(letter => {
        let div = document.createElement("div");
        div.classList.add("letter");
        div.innerText = letter;
        div.onclick = () => selectLetter(div);
        grid.appendChild(div);
    });
}

function selectLetter(element) {
    if (!element.classList.contains("selected")) {
        element.classList.add("selected");
        selectedLetters += element.innerText;
        document.getElementById("selected-word").innerText = selectedLetters;
    }
}

function submitAnswer() {
    let correctAnswer = questions[currentQuestionIndex].answer;
    
    if (selectedLetters === correctAnswer) {
        document.getElementById("feedback").innerText = "✅ Correct!";
        score += 10;
        document.getElementById("score").innerText = score;
        
        // Move to the next question only if the answer is correct
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            selectedLetters = "";
            loadQuestion();
        } else {
            document.getElementById("question").innerText = "🎉 Game Over! Final Score: " + score;
            document.getElementById("letter-grid").innerHTML = "";
        }
    } else {
        document.getElementById("feedback").innerText = "❌ Wrong! Try again.";

        // 🔹 RESET selected letters so the user can try again
        selectedLetters = "";
        document.getElementById("selected-word").innerText = selectedLetters;

        // 🔹 REMOVE the "selected" class from all letter buttons
        let letters = document.querySelectorAll(".letter");
        letters.forEach(letter => letter.classList.remove("selected"));
    }
}




function startGame() {
    document.getElementById("start-screen").style.display = "none"; 
    document.getElementById("game-container").style.display = "block"; 
    loadQuestion();
}

// Start the game
loadQuestion();

function deleteLetter() {
    if (selectedLetters.length > 0) {
        selectedLetters = selectedLetters.slice(0, -1); // Remove last letter
        document.getElementById("selected-word").innerText = selectedLetters;

        let selectedDivs = document.querySelectorAll(".letter.selected");
        if (selectedDivs.length > 0) {
            selectedDivs[selectedDivs.length - 1].classList.remove("selected");
        }
    }
}
