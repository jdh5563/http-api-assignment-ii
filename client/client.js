// Handles displaying responses
const handleResponse = async (response) => {
    const responseText = await response.text();

    console.log(responseText);

    // Parse the json back into a javascript object, and display the data.
    let parsedResponse = JSON.parse(responseText);
    statusCode.innerHTML = `<b>${codes.options[codes.selectedIndex].textContent}</b>`;
    message.textContent = `Message: ${parsedResponse.message}`;
};

const sendPost = async nameForm => {
    //Grab all the info from the form
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    
    const nameField = nameForm.querySelector('#nameField');
    const ageField = nameForm.querySelector('#ageField');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `name=${nameField.value}&age=${ageField.value}`;

    //Make a fetch request and await a response. Set the method to
    //the one provided by the form (POST). Set the headers. Content-Type
    //is the type of data we are sending. Accept is the data we would like
    //in response. Then add our FORM-URLENCODED string as the body of the request.
    let response = await fetch(nameAction, {
    method: nameMethod,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
    });

    //Once we have a response, handle it.
    handleResponse(response);
};

const sendGetOrHead = async userForm => {
    //Grab all the info from the form
    const selectedURL = userForm.querySelector('#urlField').value;
    const selectedMethod = userForm.querySelector('#methodSelect').value;

    //Make a fetch request and await a response. Set the method to
    //the one provided by the form (POST). Set the headers. Content-Type
    //is the type of data we are sending. Accept is the data we would like
    //in response. Then add our FORM-URLENCODED string as the body of the request.
    let response = await fetch(selectedURL, {
    method: selectedMethod,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    });

    //Once we have a response, handle it.
    handleResponse(response);
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
        console.log(e);
        e.preventDefault();
        sendGetOrHead(userForm);
        return false;
    };

    nameForm.submit = addUser;
    userForm.submit = getUser;
};

init();