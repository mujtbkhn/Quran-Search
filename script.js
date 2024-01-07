const btnQuotes = document.getElementById('btn-quotes');
const btnNewVerse = document.getElementById('new-verse');
const btnNextVerse = document.getElementById('next-verse');
const btnPreviousVerse = document.getElementById('previous-verse');
const quotesDiv = document.getElementById('quotes');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const searchVerse = document.getElementById('search-verse');

let data; // Declare data at the global level
let currentSurahIndex;
let currentVerseIndex;

async function fetchData() {
    const response = await fetch("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json");
    data = await response.json();
}

async function searchFromQuran(e) {
    if (!data) await fetchData(); // Ensure data is fetched before searching

    const searchTerm = e.target.value.toLowerCase();

    const filteredData = data.filter((surah) => {
        return (
            surah.id.toString().toLowerCase().includes(searchTerm) ||
            surah.transliteration.toLowerCase().includes(searchTerm)
        );
    });

    if (filteredData.length > 0) {
        // Display the first result if there is a match
        currentSurahIndex = data.indexOf(filteredData[0]);
        currentVerseIndex = Math.floor(Math.random() * data[currentSurahIndex].verses.length);
        displayVerse();
    } else {
        // Display a message if no matching surah is found
        quotesDiv.textContent = 'Surah not found';
    }
}

async function searchVerseFromQuran(e) {
    if (!data) await fetchData(); // Ensure data is fetched before searching

    const searchTerm = e.target.value.toLowerCase();

    const currentSurah = data[currentSurahIndex]

    const filteredVerses = currentSurah.verses.filter((verse) => {
        return (
            verse.id.toString().toLowerCase().includes(searchTerm) 
        );
    });

    if (filteredVerses.length > 0) {
        currentVerseIndex = currentSurah.verses.indexOf(filteredVerses[0])
        displayVerse();
    } else {
        // Display a message if no matching surah is found
        quotesDiv.textContent = 'Verse not found';
    }
}

async function generateRandomVerses() {
    if (!data) await fetchData(); // Ensure data is fetched before generating verses

    // Generate a random index to select a random surah
    currentSurahIndex = Math.floor(Math.random() * data.length);
    currentVerseIndex = Math.floor(Math.random() * data[currentSurahIndex].verses.length);

    displayVerse();
}

function generateNewVerse() {
    if (!data) return; // Return if data is not available

    // Select a new random verse index within the current surah
    currentVerseIndex = Math.floor(Math.random() * data[currentSurahIndex].verses.length);

    displayVerse();
}

function generateNextVerse() {
    if (!data) return; // Return if data is not available

    // Select the next verse or loop back to the first verse if it's the last one
    currentVerseIndex = (currentVerseIndex + 1) % data[currentSurahIndex].verses.length;

    displayVerse();
}

function generatePreviousVerse() {
    if (!data) return; // Return if data is not available

    // Select the next verse or loop back to the first verse if it's the last one
    currentVerseIndex = (currentVerseIndex - 1 + data[currentSurahIndex].verses.length) % data[currentSurahIndex].verses.length;

    displayVerse();
}

function displayVerse() {
    const randomVerse = data[currentSurahIndex].verses[currentVerseIndex];
    const surahTransliteration = data[currentSurahIndex].transliteration;
    const surahTranslation = data[currentSurahIndex].translation;
    const totalVerses = data[currentSurahIndex].total_verses;

    // Update the displayed verse
    const paragraphQuote = document.createElement('p');
    paragraphQuote.innerHTML = `Surah: ${currentSurahIndex + 1}<br>`;
    paragraphQuote.innerHTML += `Surah Transliteration: ${surahTransliteration}<br>`;
    paragraphQuote.innerHTML += `Surah Translation: ${surahTranslation}<br>`;
    paragraphQuote.innerHTML += `Total Verses: ${totalVerses}<br>`;
    paragraphQuote.innerHTML += `Verse: ${randomVerse.id}<br>`;
    paragraphQuote.innerHTML += `Translation: ${randomVerse.translation}`;

    paragraphQuote.style.color = 'white';

    quotesDiv.innerHTML = '';
    quotesDiv.appendChild(paragraphQuote);

}

btnQuotes.addEventListener('click', () => {
    generateRandomVerses();
});

btnNewVerse.addEventListener('click', () => {
    generateNewVerse();
});
btnPreviousVerse.addEventListener('click', () => {
    generatePreviousVerse();
});
btnNextVerse.addEventListener('click', () => {
    generateNextVerse();
});
window.addEventListener('load', () => {
    quotesDiv.textContent = generateRandomVerses()
})
searchInput.addEventListener('input', (e) => {
    searchFromQuran(e); // Trigger search when the input changes
});
searchVerse.addEventListener('input', (e) => {
    searchVerseFromQuran(e); // Trigger search when the input changes
});
// searchBtn.addEventListener('click', () => {
//     searchFromQuran({ target: searchInput }); // Trigger search on button click
// });