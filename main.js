

const user = {
    "users": [
        {
            "username": "admin",
            "password": "admin",
            "role": "admin",
            "email": "admin@admin.com"
        },
        {
            "username": "user",
            "password": "user",
            "role": "site_user",
            "email": "user@user.com"
        }
    ]
};

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeSpan = document.querySelector('.close');
const submitBtn = document.getElementById('submitBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorDiv = document.getElementById('error');
const usersTable=document.getElementById('usersTasble')

    // Show the modal
    loginBtn.onclick = () => {
        loginModal.style.display = 'block';
    };


    // Close the modal
    closeSpan.onclick = () => {
        loginModal.style.display = 'none';
    };

    // Close the modal if user clicks anywhere outside of it
    window.onclick = (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    };

    // Function to check the credentials
    const authenticateUser = () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
         
        
        const isValidUser = user.users.some(user => user.username === username && user.password === password);

        if (isValidUser) {
            alert('Login Successful!');
            loginBtn.style.display = 'none';
            logoutBtn.style.display="block";
            loginModal.style.display='none';
            document.getElementById("usersTable").style.display = "block";
            // Here, you could also redirect the user or change the UI to show they're logged in.
        } else {
            errorDiv.style.display = 'block';
        }
    };

    



    // Attempt to login when the login button is clicked
    submitBtn.addEventListener('click', authenticateUser);

  
// Function to log out the user
const logoutUser = () => {
    // Hide the logout button and show the login button again
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'block';
    usersTableBody.display='block';


    // Optionally, clear any stored authentication details (for real applications, handle securely)
    // For example purposes only; real auth systems will need more secure handling
    alert('Logout Successful!');

    // Clear input fields
    usernameInput.value = '';
    passwordInput.value = '';
    errorDiv.style.display = 'none'; // Hide the error message if it was visible

    // Close the modal if it was open
    loginModal.style.display = 'none';
};

// Attach the logoutUser function to the logout button click event
logoutBtn.onclick = logoutUser;

// Function to check if the user is logged in
const checkLoggedIn = () => {
    // Check if the user is already logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // Initially set the display based on login status
    loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
};

// Call the checkLoggedIn function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', checkLoggedIn);

// Other parts of your code...


// Event listener to ensure the DOM is fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
    fetchAndStoreJSON('main.json', 'website', () => {
        // Once data is fetched and stored, then load the website content
        LoadWebsite();
    });
});

// Function to fetch JSON data and store in local storage
function fetchAndStoreJSON(jsonFile, storageKey, callback) {
    fetch(jsonFile.trim())
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem(storageKey, JSON.stringify(data));
            console.log(`JSON data fetched from ${jsonFile} and stored in local storage with key ${storageKey}`);
            if (callback) callback();
        })
        .catch(error => console.error('There was a problem fetching the JSON:', error));
}

// Function to load website content from local storage
function LoadWebsite() {
    const websiteData = JSON.parse(localStorage.getItem('website'));
    const currentPage = findCurrentPage();
    console.log('Current Page:', currentPage);

    if (websiteData && websiteData[currentPage]) {
        const pageData = websiteData[currentPage];
        for (const elementKey in pageData) {
            const elementContent = pageData[elementKey];
            const element = document.getElementById(elementKey);
            if (element) {
                element.innerHTML = elementContent;
            }
        }
    } else {
        console.error('Page data not found in local storage or current page identifier is incorrect.');
    }
}

function findCurrentPage() {
    // Get the current URL
    const url = window.location.href;
  
    // Find the last '/' in the URL
    const lastSlashIndex = url.lastIndexOf('/');
  
    // Extract the page name from the URL
    let currentPage = url.substring(lastSlashIndex + 1);
  
    // Remove the '.html' extension if present
    currentPage = currentPage.replace('.html', '');
  
    return currentPage;
}

// Function to handle newsletter form submission
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Capture user input
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Proceed with storage and display logic
    const registrations = JSON.parse(localStorage.getItem('newsletterRegistrations')) || [];
    registrations.push({ username, email });
    localStorage.setItem('newsletterRegistrations', JSON.stringify(registrations));

    alert('Thank you for registering for our newsletter!');
    document.getElementById('newsletterForm').reset();
    displayRegisteredUsers();
});

// Function to display registered users (Visible only to admin)
function displayRegisteredUsers() {
    const usersTableBody = document.querySelector('#usersTable tbody');
    usersTableBody.innerHTML = '';

    const registrations = JSON.parse(localStorage.getItem('newsletterRegistrations')) || [];
    registrations.forEach(({ username, email }) => {
        let row = usersTableBody.insertRow();
        row.insertCell(0).textContent = username;
        row.insertCell(1).textContent = email;
    });

    // Show the table only if the user is logged in as admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const registeredUsersDiv = document.getElementById('registeredUsers');
    registeredUsersDiv.style.display = isAdmin ? 'block' : 'none';
}

// Call displayRegisteredUsers on page load to immediately show the registered users if the admin is logged in
document.addEventListener('DOMContentLoaded', displayRegisteredUsers);



// function findCurrentPage() {
//     // Get the current URL
//     const url = window.location.href;
//     const lastSlashIndex = url.lastIndexOf('/');
//     let currentPage = url.substring(lastSlashIndex + 1);
//     currentPage = currentPage.replace('.html', '');
  
//     return currentPage;
// }

function findCurrentPage() {
    // Get the current URL name
    const url = window.location.href;
    // Remove the .html extension from the url name
    const pageName = url.substring(url.lastIndexOf('/') + 1).replace('.html', '');
    return pageName;
}

function updateEditableContent() {
    const storedData = JSON.parse(localStorage.getItem('pageData'));
    const currentPage = detectCurrentPage();
    const saveButton = document.getElementById('saveButton');
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

//---------------------------------------------------------------------
// const registrationForm = document.getElementById('registrationForm');
// const userTableBody = document.getElementById('userTableBody');

// registrationForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission

//     // Get form data
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;

//     // Create a new row in the table with the user's data
//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//         <td>${username}</td>
//         <td>${email}</td>
//     `;

//     // Append the new row to the table body
//     userTableBody.appendChild(newRow);

//     // Clear form fields
//     document.getElementById('username').value = '';
//     document.getElementById('email').value = '';

//     // Display the table (visible only to admin)
//     document.getElementById('registeredUsers').style.display = 'block';
// });

// // Function to check if the user is logged in as admin
// function checkAdminLoggedIn() {
//     const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
//     const isAdmin = user.users.some(u => u.role === 'admin' && u.username === 'admin');
//     if (isLoggedIn && isAdmin) {
//         document.getElementById('registeredUsers').style.display = 'block';
//     }
// }

// // Call the checkAdminLoggedIn function when the DOM content is loaded
// document.addEventListener('DOMContentLoaded', checkAdminLoggedIn);



// const registrationForm = document.getElementById('registrationForm');
// const userTableBody = document.getElementById('userTableBody');

// registrationForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission

//     // Get form data
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;

//     // Create a new row in the table with the user's data
//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//         <td>${username}</td>
//         <td>${email}</td>
//     `;

//     // Append the new row to the table body
//     userTableBody.appendChild(newRow);

//     // Clear form fields
//     document.getElementById('username').value = '';
//     document.getElementById('email').value = '';
// });

// // Function to check if the user is logged in as admin
// function checkAdminLoggedIn() {
//     const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
//     const isAdmin = user.users.some(u => u.role === 'admin' && u.username === 'admin');
//     if (isLoggedIn && isAdmin) {
//         document.getElementById('registeredUsers').style.display = 'block';
//     }
// }

// // Call the checkAdminLoggedIn function when the DOM content is loaded
// document.addEventListener('DOMContentLoaded', checkAdminLoggedIn);


// Add this inside your existing JavaScript code

// Function to handle newsletter form submission

document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Immediate console log to verify input capture
    console.log('Captured username:', name);
    console.log('Captured email:', email);

    const registrations = JSON.parse(localStorage.getItem('newsletterRegistrations')) || [];
    registrations.push({ name, email });

    // Log what we're about to save
    console.log('Saving registrations:', registrations);

    localStorage.setItem('newsletterRegistrations', JSON.stringify(registrations));

    alert('Thank you for registering for our newsletter!');
    document.getElementById('newsletterForm').reset();
    displayRegisteredUsers(); // Call display function
});

function displayRegisteredUsers() {
    const usersTableBody = document.querySelector('#usersTable tbody');
    usersTableBody.innerHTML = ''; // Clear existing entries

    const registrations = JSON.parse(localStorage.getItem('newsletterRegistrations')) || [];
    registrations.forEach(({ name, email }) => {
        let row = usersTableBody.insertRow();
        row.insertCell(0).textContent = name; // Ensure this matches the captured username
        row.insertCell(1).textContent = email;
    });

    // Log for debugging: Show current state of registrations
    console.log('Displaying registrations:', registrations);

    document.getElementById('registeredUsers').style.display = 'block';
}

// Directly call displayRegisteredUsers on page load to ensure it works without submission
document.addEventListener('DOMContentLoaded', displayRegisteredUsers);



//11111111111111111111111111111111111111111111111111111111111111111
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000


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