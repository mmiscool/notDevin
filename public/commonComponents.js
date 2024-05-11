export function spinner_insert() {

    const spinnerString = `
    <div id="spinner" class="overlay">
        <svg class="spinner" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_0XTQ{transform-origin:center;animation:spinner_y6GP .75s linear infinite}@keyframes spinner_y6GP{100%{transform:rotate(360deg)}}</style><path class="spinner_0XTQ" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"/></svg>
    </div>
    `
    return document.body.insertAdjacentHTML('beforeend', spinnerString);

}

export function spinner_hide() {
    document.getElementById("spinner").style.display = "none";
}

export function spinner_show() {
    document.getElementById("spinner").style.display = "block";
}



let projectName = new URLSearchParams(window.location.search).get('projectName');
window.projectName = projectName;



export function adjustTextareaHeight(textarea) {
    // Reset the height to 'auto' to get the correct scroll height
    textarea.style.height = 'auto';
    // Set the height of textarea to its scroll height
    textarea.style.height = `${textarea.scrollHeight + 15}px`;
}
export function setupTextareaAdjustment() {
    // Select all textarea elements on the page
    const textareas = document.querySelectorAll('textarea');

    // Iterate through each textarea
    textareas.forEach(textarea => {
        // Initially adjust the height
        adjustTextareaHeight(textarea);

        // Attach an input event listener to adjust height whenever the content changes
        textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
        //handle window resize
        window.addEventListener('resize', () => adjustTextareaHeight(textarea));
    });
}
