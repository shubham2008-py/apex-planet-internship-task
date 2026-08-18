// --- 1. Image Carousel Logic ---
const images = [
    "https://picsum.photos/id/10/600/350",
    "https://picsum.photos/id/11/600/350",
    "https://picsum.photos/id/12/600/350"
];

let currentImgIndex = 0;
const imgElement = document.getElementById("carousel-img");

document.getElementById("prev-btn").addEventListener("click", () => {
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    imgElement.src = images[currentImgIndex];
});

document.getElementById("next-btn").addEventListener("click", () => {
    currentImgIndex = (currentImgIndex + 1) % images.length;
    imgElement.src = images[currentImgIndex];
});


// --- 2. Interactive Quiz Logic ---
const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
        answer: 1
    }
];

let currentQIndex = 0;
let score = 0;

function loadQuiz() {
    const currentQuiz = quizData[currentQIndex];
    document.getElementById("question-text").innerText = currentQuiz.question;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQuiz.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.classList.add("opt-btn");
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex) {
    if (selectedIndex === quizData[currentQIndex].answer) {
        score++;
    }
    
    currentQIndex++;
    if (currentQIndex < quizData.length) {
        loadQuiz();
    } else {
        document.getElementById("quiz-container").innerHTML = `<h3>Quiz Completed!</h3><p class="score">Your Score: ${score}/${quizData.length}</p>`;
    }
}

loadQuiz();


// --- 3. Public API Fetch Logic ---
const jokeBtn = document.getElementById("fetch-joke-btn");
const jokeSetup = document.getElementById("joke-setup");
const jokeDelivery = document.getElementById("joke-delivery");

async function fetchJoke() {
    jokeSetup.innerText = "Loading joke...";
    jokeDelivery.innerText = "";
    
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart");
        const data = await response.json();
        
        jokeSetup.innerText = data.setup;
        jokeDelivery.innerText = data.delivery;
    } catch (error) {
        jokeSetup.innerText = "Failed to load joke. Try again!";
        console.error("API Error:", error);
    }
}

jokeBtn.addEventListener("click", fetchJoke);