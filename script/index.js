const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el} </span>`);
    return htmlElements.join(" ");
};

const manageSpinner =(status) =>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadlesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then((json) => displayLesson(json.data))
        .catch(err => console.error("Could not load lessons:", err)); // Error handling
};

const removeActive = () => {
    // Better to select the specific container to avoid affecting other buttons
    const lessonButtons = document.querySelectorAll("#level-container .btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active", "btn-primary")); // assuming active state replaces primary
};

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            if (clickBtn) {
                clickBtn.classList.add("active");
            }
            displayLevelWord(data.data); // Fixed spelling
        });
};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res =await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

};

const displayWordDetails = (word)=> {
    console.log(word);
    const detailsBox =document.getElementById("details-container")
    detailsBox.innerHTML= `
    <div class="space-y-2">
                    <h2 class="text-2xl font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
                </div>

                <div class="space-y-2">
                    <h2 class="font-bold">Meaning</h2>
                    <p> ${word.meaning} </p>
                </div>

                <div class="space-y-2">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="space-y-2">
                    <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>

                   <div class=""> ${createElements(word.synonyms)}</div>
                </div>
    
    `
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (!words || words.length === 0) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-full space-y-3 rounded-xl py-10">
                <img class="mx-auto" src="./assets/alert-error.png" alt="No data">
                <p class="text-[14px] text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-[34px] text-[#292524] font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
            </div>`;
            manageSpinner(false);
        return; // Stop execution if no words
    }

    words.forEach((word) => {
        const card = document.createElement("div");
        // Added optional chaining and fallbacks for safety
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm py-10 px-5 text-center space-y-4 border border-gray-100">
                <h2 class="font-bold text-2xl">${word?.word || "Word পাওয়া যায় নি"}</h2>
                <p class="text-gray-500">Meaning / Pronunciation</p>
                <p class="text-2xl font-semibold font-bangla">
                    "${word?.meaning || "Meaning নাই"} / ${word?.pronunciation || "উচ্চারণ নাই"}"
                </p>

                <div class="flex justify-between items-center pt-4">
                    <button onclick="loadWordDetail(${word.id})" class="btn btn-circle bg-[#1A91FF10] hover:bg-[#1A91FF50] border-none"><i class="fa-solid fa-circle-info text-blue-500"></i></button>
                    <button class="btn btn-circle bg-[#1A91FF10] hover:bg-[#1A91FF50] border-none"><i class="fa-solid fa-volume-high text-blue-500"></i></button>
                </div>
            </div>`;
        wordContainer.append(card);
    });

    manageSpinner(false);
};

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        const btn = document.createElement("button");
        btn.id = `lesson-btn-${lesson.level_no}`;
        btn.onclick = () => loadLevelWord(lesson.level_no);
        btn.className = "btn btn-outline btn-primary lesson-btn";
        btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}`;

        levelContainer.append(btn);
    });
};

loadlesson();