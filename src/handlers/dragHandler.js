export const dragHandler = (app, handleFileDrop) => {
    
    const dropArea = app;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function highlight() {
        dropArea.style.opacity = "0.5";
    }

    function unhighlight() {
        dropArea.style.opacity = "1";
    }

    function handleDrop(event) {
        handleFileDrop(event)
    }
}