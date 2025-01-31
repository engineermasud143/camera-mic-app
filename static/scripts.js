const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const recordButton = document.getElementById('record');
const stopButton = document.getElementById('stop');
const audio = document.getElementById('audio');
const imageForm = document.getElementById('imageForm');
const audioForm = document.getElementById('audioForm');
let mediaRecorder;
let audioChunks = [];

// Request access to the camera and microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        video.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audio.src = audioUrl;
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById('audioData').value = reader.result;
                audioForm.submit();
            };
            reader.readAsDataURL(audioBlob);
            audioChunks = [];
        };
    })
    .catch(error => {
        console.error("Error accessing media devices.", error);
    });

// Capture the photo
captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('imageData').value = reader.result;
            imageForm.submit();
        };
        reader.readAsDataURL(blob);
    });
});

// Start recording audio
recordButton.addEventListener('click', () => {
    mediaRecorder.start();
});

// Stop recording audio
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
});