const editbutton = document.getElementById('editbtn');
const saveBtn = document.getElementById('saveBtn');


editBtn.addEventListener('click', editElements);
saveBtn.addEventListener('click', editElements);

function makeEditable(elementId) {
    const selectElement = document.getElementById(elementId);
    
    if (selectElement) {
        let editableContent;

        switch (selectElement.tagName.toLowerCase()) {
            case 'h1':
            case 'h2':
            case 'h3':

                editableContent = document.createElement('input');
                editableContent.type = 'text';
                editableContent.value = selectElement.textContent;
                break;
            case 'p':
                editableContent = document.createElement('textarea');
                editableContent.textContent =selectElement.textContent;
                break;
            case 'ul':
                editableContent = document.createElement('ul');
                const listItems = selectElement.querySelectorAll('li');
                if (listItems.length > 0) {
                    listItems.forEach(li => {
                        const listItem = document.createElement('li');
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.value = li.textContent;
                        listItem.appendChild(input);
                        editableContent.appendChild(listItem);
                    });
                } else {
                    console.log('No list items found.');
                }
                break;
            default:
                console.log('Unsupported element type.');
                return;
        }

        Array.from(selectElement.attributes).forEach(attr => {
            editableContent.setAttribute(attr.name, attr.value);
        });

        selectElement.parentNode.replaceChild(editableContent, selectElement);
    } else {
        console.log('Element not found.');
    }
}

function updateEditableContent() {
    const storedData = JSON.parse(localStorage.getItem('pageData'));
    const currentPage = detectCurrentPage();
    const saveBtn = document.getElementById('saveBtn');
    const editButton = document.getElementById('editButton');

    if (!storedData || !currentPage) {
        console.error('Error: No stored data or current page detected.');
        return;
    }

    saveButton.style.display = "block";
    editButton.style.display = "none";

    const pageKeys = Object.keys(storedData);
    const numPages = pageKeys.length;

    for (let i = 0; i < numPages; i++) {
        const pageKey = pageKeys[i];
        const pageData = storedData[pageKey];

        if (currentPage === pageKey) {
            const sectionKeys = Object.keys(pageData);
            const numSections = sectionKeys.length;

            for (let j = 0; j < numSections; j++) {
                const sectionKey = sectionKeys[j];
                const sectionData = pageData[sectionKey];

                const elementIds = Object.keys(sectionData);
                const numElements = elementIds.length;

                for (let k = 0; k < numElements; k++) {
                    const elementId = elementIds[k];
                    editableContent(elementId);
                }
            }
        }
    }
}

function editableContent(id) {
    const element = document.getElementById(id);
    
    if (element) {
        const tagName = element.tagName.toLowerCase();
        
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = element.textContent;
            
            // Copy attributes
            Array.from(element.attributes).forEach(attr => {
                input.setAttribute(attr.name, attr.value);
            });
            
            // Replace the element with input
            element.parentNode.replaceChild(input, element);
        } else if (['p', 'span'].includes(tagName)) {
            const textarea = document.createElement('textarea');
            textarea.value = element.textContent;
            
            // Copy attributes
            Array.from(element.attributes).forEach(attr => {
                textarea.setAttribute(attr.name, attr.value);
            });
            
            // Replace the element with textarea
            element.parentNode.replaceChild(textarea, element);
        } else {
            console.log('Element is not a supported type for conversion.');
        }
    } else {
        console.log('Element with id ' + id + ' not found.');
    }
}

function editElements() {
    const currentPage = findCurrentPage();

    // Check the current page and convert elements accordingly
    switch (currentPage) {
        case 'index':
            editableContent("page1P1");
            editableContent("page1H1");
            editableContent("page1H2P1");
            editableContent("page1H2P2");
            editableContent("page1H2P3");
            editableContent("page1H2P4");
            editableContent("page1LIST1");
            editableContent("page1H2P5");
            editableContent("page1H2P6");
            editableContent("page1H3");
            editableContent("page1H3P1");
            editableContent("page1H3P2");
            editableContent("page1H3P3");
            editableContent("page1H3P4");
            editableContent("page1H4");

            
            break;
        case 'introduction':
            editableContent("page2H1");
            editableContent("page2H1P1");
            editableContent("page2H2");
            editableContent("page2H2P1");
            editableContent("page2H3");
            editableContent("page2H3P1");
            break;



        case 'department':
            editableContent("page3H1");
            editableContent("page3P1");
            editableContent("page3H2");

            break;

        case 'leopards':
            editableContent("page4H1");
            editableContent("page4H1P1");
            editableContent("page4H2");
            editableContent("page4H3");
            editableContent("page4H3P1");
            editableContent("page4H4");
            editableContent("page4H4P1");
            editableContent("page4H5");
            editableContent("page4H5P1");
            editableContent("page4H6");
            editableContent("page4H6P1");
            editableContent("page4H7");
            editableContent("page4H7P1");
            editableContent("page4H8");
            editableContent("page4H9");
            editableContent("page4H9P1");
            editableContent("page4H10");
            editableContent("page4H10P1");
            editableContent("page4H11");
            editableContent("page4H11P1");
            editableContent("page4H12");
            editableContent("page4H12P1");
            editableContent("page4H13");
            editableContent("page4H13P1");
            editableContent("page4H14");
            editableContent("page4H14P1");
            break;
        case 'animals':
            editableContent("page5H1");
            editableContent("page5H2");
            editableContent("page5H2P1");
            editableContent("page5H3");
            editableContent("page5H4");
            editableContent("page5H4P1");
            editableContent("page5H5");
            editableContent("page5H5P1");
            editableContent("page5H6");
            editableContent("page5H6P1");
            editableContent("page5H7");
            editableContent("page5H7P1");
            editableContent("page5H8");
            editableContent("page5H8P1");
            editableContent("page5H9");
            editableContent("page5H9P1");
            editableContent("page5H10");
            editableContent("page5H10P1");
            editableContent("page5H11");
            editableContent("page5H11P1");
            editableContent("page5H12");
            editableContent("page5H12P1");
            editableContent("page5H13");
            editableContent("page5H13P1");
            editableContent("page5H14");
            
            break;
        case 'yala':
            
            break;
        default:
            console.log('No elements to convert on this page.');
            break;
    }
}


//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
//1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
//1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

// // Step 1: Add a Save Button
// const saveButton = document.getElementById('saveBtn');

// // Step 2: Event Listener for Save Button
// saveBtn.addEventListener('click', saveEditedContent);

// // Step 3: Function to Save Edited Content
// function saveEditedContent() {
//     const storedData = JSON.parse(localStorage.getItem('pageData'));
//     const currentPage = findCurrentPage();

//     if (!storedData || !currentPage) {
//         console.error('Error: No stored data or current page detected.');
//         return;
//     }

//     const pageKeys = Object.keys(storedData);
//     const numPages = pageKeys.length;

//     for (let i = 0; i < numPages; i++) {
//         const pageKey = pageKeys[i];
//         const pageData = storedData[pageKey];

//         if (currentPage === pageKey) {
//             const sectionKeys = Object.keys(pageData);
//             const numSections = sectionKeys.length;

//             for (let j = 0; j < numSections; j++) {
//                 const sectionKey = sectionKeys[j];
//                 const sectionData = pageData[sectionKey];

//                 const elementIds = Object.keys(sectionData);
//                 const numElements = elementIds.length;

//                 for (let k = 0; k < numElements; k++) {
//                     const elementId = elementIds[k];
//                     const editedContent = document.getElementById(elementId).value;
//                     // Save the edited content back to local storage
//                     sectionData[elementId] = editedContent;
//                 }
//             }
//         }
//     }

//     // Update the stored data in local storage
//     localStorage.setItem('pageData', JSON.stringify(storedData));
    
//     // Optionally, you can inform the user that the edits are saved
//     alert('Edits saved successfully!');
// }



// Step 1: Add a Save Button
const saveButton = document.getElementById('saveBtn');

// Step 2: Event Listener for Save Button
saveButton.addEventListener('click', saveEditedContent);

// Step 3: Function to Save Edited Content
function saveEditedContent() {
    const storedData = JSON.parse(localStorage.getItem('pageData'));
    const currentPage = findCurrentPage();

    if (!storedData || !currentPage) {
        console.error('Error: No stored data or current page detected.');
        return;
    }

    const pageKeys = Object.keys(storedData);
    const numPages = pageKeys.length;

    for (let i = 0; i < numPages; i++) {
        const pageKey = pageKeys[i];
        const pageData = storedData[pageKey];

        if (currentPage === pageKey) {
            const sectionKeys = Object.keys(pageData);
            const numSections = sectionKeys.length;

            for (let j = 0; j < numSections; j++) {
                const sectionKey = sectionKeys[j];
                const sectionData = pageData[sectionKey];

                const elementIds = Object.keys(sectionData);
                const numElements = elementIds.length;

                for (let k = 0; k < numElements; k++) {
                    const elementId = elementIds[k];
                    const editedContent = document.getElementById(elementId).value;
                    // Save the edited content back to local storage
                    sectionData[elementId] = editedContent;
                }
            }
        }
    }

    // Update the stored data in local storage
    localStorage.setItem('pageData', JSON.stringify(storedData));
    
    // Optionally, you can inform the user that the edits are saved
    alert('Edits saved successfully!');
}

//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000