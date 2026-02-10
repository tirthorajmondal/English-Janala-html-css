const loadLevels = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLesson(data.data))
        .catch(err => console.log(err.message))
}

// pronunciation func
const pronunciationWord = (word) => {
    const uttrance = new SpeechSynthesisUtterance(word);
    uttrance.lang = "en-EN";
    window.speechSynthesis.speak(uttrance);
}

const showWordDetails = (id) => {
    console.log('modal', id);
    id.showModal()
}

const loadLevelWord = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        const { data: words } = await res.json()
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
                    <button onclick="my_modal_2.showModal()" class="btn btn-circle cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
                    
                    <button class="btn" onclick="${showWordDetails(modalId)}">open modal</button>
                    <dialog id="${modalId}" class="modal">
                    <div class="modal-box">
                        <h3 class="text-lg font-bold">Hello!</h3>
                        <p class="py-4">Press ESC key or click outside to close</p>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                    </dialog>

                    <button onClick="pronunciationWord('${word?.word}')" class="btn btn-circle"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            `
        wordsContainer.append(wordCard);
    });
}

const displayLesson = lessons => {
    const lavelContainer = document.getElementById('lavel-container')
    lavelContainer.innerHTML = "";

    for (const lesson of lessons) {
        // console.log(lesson);
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>`;

        lavelContainer.append(btnDiv)
    }
}

loadLevels()


