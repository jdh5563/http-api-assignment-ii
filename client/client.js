const content = document.querySelector('#content');
let h1;
let p;

// Handles displaying responses
const handleResponse = async (response, method) => {
    p.innerHTML = ``;

    // If there is a body, retrieve it and display it
    if(method != 'head' && response.status != 204){
        const responseJSON = await response.json();
        p.innerHTML = JSON.stringify(responseJSON.message);

        console.log(responseJSON);
    }

    // Display the status code name
    switch(response.status){
        case 200:
            h1.innerHTML = `<b>Success</b>`;
            break;
        case 201:
            h1.innerHTML = `<b>Created</b>`;
            break;
        case 204:
            h1.innerHTML = `<b>Updated (No Content)</b>`;
            break;
        case 400:
            h1.innerHTML = `<b>Bad Request</b>`;
            return;
        case 404:
            h1.innerHTML = `<b>Not Found</b>`;
            return;
    }
};

// Send a post request with the (hopefully) entered information, then handle the response
const sendPost = async nameForm => {
    //Grab all the info from the form
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    
    const nameField = nameForm.querySelector('#nameField');
    const ageField = nameForm.querySelector('#ageField');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `name=${nameField.value}&age=${ageField.value}`;

    // Fetch a response
    let response = await fetch(nameAction, {
    method: nameMethod,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
    });

    //Once we have a response, handle it.
    handleResponse(response, nameMethod);
};

// Send a get/head request for the list of users, then handle the response
const sendGetOrHead = async userForm => {
    //Grab all the info from the form
    const selectedURL = userForm.querySelector('#urlField').value;
    const selectedMethod = userForm.querySelector('#methodSelect').value;

    // Fetch a response
    let response = await fetch(selectedURL, {
    method: selectedMethod,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    });

    //Once we have a response, handle it.
    handleResponse(response, selectedMethod);
};

// Override the functionality of the submit buttons to send our requests
const init = () => {
    const nameForm = document.querySelector('#nameForm');
    const userForm = document.querySelector('#userForm');

    const addUser = e => {
        e.preventDefault();
        sendPost(nameForm);
        return false;
    };

    const getUser = e => {
        e.preventDefault();
        sendGetOrHead(userForm);
        return false;
    };

    nameForm.addEventListener('submit', addUser);
    userForm.addEventListener('submit', getUser);

    h1 = document.createElement('h1');
    p = document.createElement('p');

    content.appendChild(h1);
    content.appendChild(p);
};

init();