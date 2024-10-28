function handleFileSelection() {
    const fileInput = document.getElementById('videoFile');
    const videoPreview = document.getElementById('videoPreview');
    const fileUploadLabel = document.getElementById('fileUploadLabel');

    const file = fileInput.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        videoPreview.src = url;
        videoPreview.style.display = 'block';
        fileUploadLabel.classList.add('has-video');
    }
}

function uploadVideo() {
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];
    const loadingText = document.getElementById('loadingText');
    const resultContainer = document.getElementById('resultContainer');
    const scoreCell = document.getElementById('scoreCell');
    const commentCell = document.getElementById('commentCell');

    if (!file) {
        alert('請選擇影片檔案！');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    loadingText.style.display = 'block';
    resultContainer.style.display = 'none';

    fetch('http://54.150.30.200:5000/upload_video', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('上傳失敗：' + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        loadingText.style.display = 'none';
        resultContainer.style.display = 'block';
        scoreCell.textContent = result.score;
        commentCell.textContent = result.comment;
    })
    .catch(error => {
        loadingText.style.display = 'none';
        console.error('錯誤:', error);
        alert('分析過程中發生錯誤，請稍後再試。');
    });
}

function resetFileSelection() {
    const fileInput = document.getElementById('videoFile');
    const videoPreview = document.getElementById('videoPreview');
    const resultContainer = document.getElementById('resultContainer');
    const scoreCell = document.getElementById('scoreCell');
    const commentCell = document.getElementById('commentCell');
    const fileUploadLabel = document.getElementById('fileUploadLabel');

    fileInput.value = '';
    videoPreview.style.display = 'none';
    resultContainer.style.display = 'none';
    scoreCell.textContent = '';
    commentCell.textContent = '';

    fileUploadLabel.classList.remove('has-video');
}
