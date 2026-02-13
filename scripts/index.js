const createHtmlElement = (arr) => {
    console.log(arr);
    const elements = arr.map(item => `<span class="btn bg-sky-200">${item}</span>`)
    return elements.join(" ");

}
const loadLevels = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLesson(data.data))
        .catch(err => console.log(err.message))
}

// remove all active class
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"))
}
const loadWordDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    const { data: word } = await res.json()
    showWordDetails(word)
}

// show details
const showWordDetails = (wordObj) => {
    console.log(wordObj);
    const { level, word, meaning, partsOfSpeech, points, pronunciation, sentence, synonyms } = wordObj;
    const container = document.getElementById("details-container")
    container.innerHTML = `
                <h2 class="text-2xl font-bold">${word} (<i class="fa-solid fa-microphone-lines"></i> : <span class="font-siliguri">${pronunciation})</span></h2>
                <div class="flex justify-between items-start w-11/12">
                    <div class="my-4">
                    <p class="font-semibold text-lg">Meaning</p>
                    <p class="text-sm">${meaning}</p>
                    </div>
                    <div class="my-4">
                    <p class="font-semibold text-lg">Parts of Speech</p>
                    <p class="text-sm">${partsOfSpeech}</p>
                    </div>
                </div>
                <div class="mb-4">
                    <p class="font-semibold text-lg">Example</p>
                    <p class="text-sm">${sentence}</p>
                </div>
                <div class="">
                    <h3 class="font-siliguri font-semibold">সমার্থক শব্দ গুলো</h3>
                    <div class="flex gap-4 flex-wrap">
                        ${createHtmlElement(synonyms)}
                    </div>
                </div>
                <button class="btn btn-primary mt-6">Complete Learning</button>`
    document.getElementById("modal_id").showModal()
}

// pronunciation func
const pronunciationWord = (word) => {
    const uttrance = new SpeechSynthesisUtterance(word);
    uttrance.lang = "en-EN";
    window.speechSynthesis.speak(uttrance);
}


const loadLevelWord = async (id) => {
    try {

        const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        const { data: words } = await res.json()

        // set active class 
        removeActive()
        const lessonBtn = document.getElementById(`lesson-btn-${id}`)
        lessonBtn.classList.add('active')
        displayLevelWords(words);

    } catch (error) {
        console.log(error);
    }
}
const displayLevelWords = (words) => {
    const wordsContainer = document.getElementById("words-container")
    // wordsContainer.innerHTML = "You didn't select any lesson"

    words.length == 0 ? wordsContainer.innerHTML = "no data found for this lesson" : wordsContainer.innerHTML = ""
    words.forEach(word => {
        const modalId = `modal-${word.id}`;
        const wordCard = document.createElement("div");
        wordCard.classList = "p-4 flex flex-col justify-center items-center bg-white rounded-xl text-center"
        wordCard.innerHTML = `
                <h2 class="text-2xl font-bold">${word.word}</h2>
                <p class="my-3">meaning/pronunciation</p>
                <p class="font-siliguri font-semibold text-2xl"><span class=${word.meaning == null && 'text-red-600'}>${word.meaning}</span> / ${word.pronunciation}</p>
                <div class="flex justify-between w-10/12 mx-auto mt-8">
                    <button onclick="loadWordDetails(${word.id})" class="btn btn-circle cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
                    
                    <button onClick="pronunciationWord('${word?.word}')" class="btn btn-circle"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            `
        wordsContainer.append(wordCard);
    });
}
// const func = (param) => console.log(param);
const displayLesson = lessons => {
    const lavelContainer = document.getElementById('lavel-container')
    lavelContainer.innerHTML = "";

    for (const lesson of lessons) {
        const btnDiv = document.createElement("div")
        // btnDiv.id = `div-${lesson.level_no}`
        // btnDiv.onclick = () => func('tirtho')
        btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>`;

        lavelContainer.append(btnDiv)
    }
}
const loadFaqData = () => {
    data = [
        {
            "id": 1,
            "question": "How can I start learning English on this website?",
            "answer": "You can start by exploring our beginner lessons, interactive exercises, and quizzes. We also offer structured courses to guide you step by step."
        },
        {
            "id": 2,
            "question": "Is this website free to use?",
            "answer": "Yes, our website offers free access to basic lessons, vocabulary practice, and quizzes. Some advanced courses may require registration."
        },
        {
            "id": 3,
            "question": "Do I need to create an account?",
            "answer": "No, you can access many resources without an account. However, creating an account allows you to track your progress and save your achievements."
        },
        {
            "id": 4,
            "question": "How can I build my English vocabulary?",
            "answer": "You can improve your vocabulary by practicing daily word lists, taking quizzes, using flashcards, and participating in interactive exercises."
        },
        {
            "id": 5,
            "question": "Do you offer certificates for completed courses?",
            "answer": "Yes, we provide certificates for learners who successfully complete our structured courses and final assessments."
        }
    ]


    showFAQ(data)
}

const showFAQ = (data) => {
    console.log(data);
    const faqContainer = document.getElementById('faq');
    // faqContainer.innerHTML = ""
    data.forEach(item => {
        const qaDiv = document.createElement("div");
        qaDiv.innerHTML = `
                <div tabindex="0" class="collapse collapse-plus bg-base-100 border-base-300 border">
                <div class="collapse-title font-semibold">${item.question}</div>
                <div class="collapse-content text-sm">
                    ${item.answer}
                </div>
            </div>`
        faqContainer.append(qaDiv);
    })




    // faqContainer.append();

}


const handleGetStarted = (e) => {
    e.preventDefault()
    const form = e.target;

    console.log('submited');
}

loadLevels()
loadFaqData()


