const loadlesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("active"));

};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLavelWord(data.data);
        });

};

const displayLavelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length === 0) {
        wordContainer.innerHTML = `
        
    <div class="text-center col-span-full space-y-3 rounded-xl py-10">

      <img class="mx-auto" src="./assets/alert-error.png" alt="">
   
    <p class="text-[14px] text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    
    <h2 class="text-[34px] text-[#292524] font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
  
    </div>
        
        `
    }

    words.forEach((word) => {
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm py-10 px-5 text-center space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "Word পাওয়া যায় নি"}</h2>
            <p>Meaning /Pronounciation</p>
            <p class="text-2xl font-semibold font-bangla">"${word.meaning ? word.meaning : "Meaning পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "Pronuciation পাওয়া যায় নি"}"</p>

            <div class="flex justify-between items-center ">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>

            </div>
            </div>
        `;

        wordContainer.append(card);

    });

};

const displayLesson = (lessons) => {
    const lavelcontainer = document.getElementById("level-container");
    lavelcontainer.innerHTML = "";
    for (let lesson of lessons) {

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
             <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"> 
             <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
             </button>
    `;

        lavelcontainer.append(btnDiv);


    }

};

loadlesson();