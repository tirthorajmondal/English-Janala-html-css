const createElement = (arr) => {
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
                    <p class="">${meaning}</p>
                    </div>
                    <div class="my-4">
                    <p class="font-semibold text-lg">Parts of Speech</p>
                    <p class="">${partsOfSpeech}</p>
                    </div>
                </div>
                <div class="mb-4">
                    <p class="font-semibold text-lg">Example</p>
                    <p class="">${sentence}</p>
                </div>
                <div class="">
                    <h3 class="font-siliguri font-semibold">সমার্থক শব্দ গুলো</h3>
                    <div class="flex gap-4">
                        ${createElement(synonyms)}
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

const handleGetStarted = (e) => {
    e.preventDefault()
    const form = e.target;

    console.log('submited');
}

loadLevels()


