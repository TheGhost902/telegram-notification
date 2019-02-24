function formHandler(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    var nameInput = form[0];
    var numberInput = form[1];
    var button = form[2];

    button.addEventListener('click', function() {
        if (nameInput.value === '' || numberInput.value === '') {
            alert('Заполните все поля!');
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/form', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: nameInput.value,
            number: numberInput.value
        }));
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) return console.log('error: ' + xhr.status + ' : ' + xhr.statusText);

            alert(xhr.responseText);
        }

        nameInput.value = '';
        numberInput.value = '';
    });
}

for (var i = 0; document.forms.length > i; i++) {
    formHandler(document.forms[i]);
}