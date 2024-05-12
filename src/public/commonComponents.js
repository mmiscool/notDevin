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

/**
 * Dynamically creates a form in the specified container based on the provided data schema.
 * @param {Object} schema The data schema defining form fields.
 * @param {string} containerId The ID of the div container where the form will be appended.
 */
export function generateForm(schema, containerId) {
    const form = document.getElementById(containerId);
    if (!form) {
        console.error(`Container with ID ${containerId} not found.`);
        return;
    }



    Object.entries(schema).forEach(([key, details]) => {
        // test if an element with the key already exists
        if (document.getElementById(key)) {
            //skip this iteration
            return;
        }



        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';

        const label = document.createElement('label');
        label.htmlFor = key;
        label.textContent = details.label;
        wrapper.appendChild(label);

        let input;
        if (details.widget === 'input') {
            input = document.createElement('input');
            input.type = 'text';
        } else if (details.widget === 'textarea') {
            input = document.createElement('textarea');

            // make text area always the the height required to show all the text inside it. 





            // add event listener to adjust the height of the textarea any time it's content changes
            input.addEventListener('change', resizeTextarea);
            input.addEventListener('resize', resizeTextarea);
            input.addEventListener('keydown', resizeTextarea);
            input.addEventListener('keyup', resizeTextarea);

        }

        input.id = key;
        input.name = key;
        input.disabled = !details.userEditable;
        input.placeholder = details.description;

        if (!details.userEditable) {
            input.setAttribute('readonly', true);
        }

        wrapper.appendChild(input);
        form.appendChild(wrapper);
    });
}



const resizeTextarea = function () {
    console.log(`resizing textarea ${this.id}`)
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight + 10) + 'px';

};

export function updateElementValues(data) {
    Object.entries(data).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
            element.value = value;
            // manually trigger the change event
            resizeTextarea.call(element);
        }
    });
}