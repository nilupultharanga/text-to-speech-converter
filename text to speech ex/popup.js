// Create a new SpeechSynthesisUtterance object
const speech = new SpeechSynthesisUtterance();

// Initialize an array to hold the voices
let voices = [];

// Select the dropdowns and button
const voiceSelect = document.getElementById("voiceSelect");
const speedSelect = document.getElementById("speedSelect");
const toggleSpeechBtn = document.getElementById("toggleSpeech");

// Populate the voices array and the select options when voices change
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    // Set the default voice to the first one
    speech.voice = voices[0];

    // Clear existing options
    voiceSelect.innerHTML = '';

    // Populate select options with voice names
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
};

// Update the selected voice when the dropdown changes
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Update the speech rate when the speed dropdown changes
speedSelect.addEventListener("change", () => {
    speech.rate = parseFloat(speedSelect.value);
});

// Toggle speech on button click
toggleSpeechBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        // If currently speaking, cancel the speech
        window.speechSynthesis.cancel();
        toggleSpeechBtn.innerHTML = '<img src="images/play.png"> Listen';
    } else {
        // Set the text for speech synthesis
        speech.text = document.querySelector("textarea").value;
        // Speak the text
        window.speechSynthesis.speak(speech);
        toggleSpeechBtn.innerHTML = '<img src="images/stop.png"> Stop';
    }
});

// Reset the button to "Listen" when speech ends
speech.addEventListener("end", () => {
    toggleSpeechBtn.innerHTML = '<img src="images/play.png"> Listen';
});
