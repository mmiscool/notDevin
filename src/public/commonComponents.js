export function spinner_insert() {

    const spinnerString = `
    <div id="spinner" class="overlay">
        <svg class="spinner" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_0XTQ{transform-origin:center;animation:spinner_y6GP .75s linear infinite}@keyframes spinner_y6GP{100%{transform:rotate(360deg)}}</style><path class="spinner_0XTQ" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"/></svg>
    </div>
    `
    return document.body.insertAdjacentHTML('beforeend', spinnerString);

}

spinner_insert();

export function spinner_hide() {
    document.getElementById("spinner").style.display = "none";
}

export function spinner_show() {
    document.getElementById("spinner").style.display = "block";
}



let projectName = new URLSearchParams(window.location.search).get('projectName');
window.projectName = projectName;
console.log(projectName);

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
        } else if (details.widget === 'monaco-editor') {
            input = document.createElement('monaco-editor');
            input.setAttribute('language', 'javascript');
            input.setAttribute('value', '');
            input.style.height = '500px';
        }

        else if (details.widget === 'textarea') {
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
    this.style.height = (this.scrollHeight + 30) + 'px';

};

export function updateElementValues(data) {
    Object.entries(data).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
            element.value = value;
            // manually trigger the change event
            if (element.tagName === 'TEXTAREA') resizeTextarea.call(element);
        }
    });
}
// widgets.generateAllFunctionsButton.addEventListener("click", function_generate_all);
// function function_generate_all() {
//     const functionNameList = widgets.functionNameList.options;
//     for (let i = 0; i < functionNameList.length; i++) {
//         const functionName = functionNameList[i].value;
//         sendToApi("function_generate", { functionName: functionName }, false);
//     }
// }



export function updateSelectOptions(selectID, options) {
    const select = document.getElementById(selectID);
    // Clear existing options
    select.innerHTML = '';
    select.size = options.length + 1;

    // Loop through the array of options
    options.forEach(function (optionText) {
        // Create a new option element
        var option = document.createElement('option');

        // Set the text content and value of the option
        option.textContent = optionText;
        option.value = optionText;
        console.log(select, option);
        // Add the option to the select element
        select.appendChild(option);
    });
}














class MonacoEditor extends HTMLElement {
    constructor() {
        super();
        this.editor = null;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                #container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
            </style>
            <div id="container"></div>
        `;
    }

    connectedCallback() {
        this.loadMonacoEditor();
    }

    loadMonacoEditor() {
        const container = this.shadowRoot.getElementById('container');
        const value = this.getAttribute('value') || '';

        require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' }});
        require(['vs/editor/editor.main'], () => {
            this.editor = monaco.editor.create(container, {
                value: value,
                language: 'javascript',
                automaticLayout: true
            });

            this.editor.onDidChangeModelContent(() => {
                this.setAttribute('value', this.editor.getValue());
            });
        });
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && this.editor && oldValue !== newValue) {
            this.editor.setValue(newValue);
        }
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(newValue) {
        this.setAttribute('value', newValue);
    }
}

customElements.define('monaco-editor', MonacoEditor);