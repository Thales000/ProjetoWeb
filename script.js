//login API
            
document.querySelector('#btn-login').addEventListener('click', function() {

    document.querySelector('.msg-login').innerHTML = '';

    let xmlhttp = new XMLHttpRequest();

    let usuario = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    };

    if (email.value.length < 4) { //E-mail com menos de 4 caracteres

        document.querySelector('.msg-login').innerHTML = 'E-mail incorreto!';

    } else if(password.value.length < 4) { //Senha com menos de 4 caracteres

        document.querySelector('.msg-login').innerHTML = 'Senha incorreta!';

    } else {

        xmlhttp.open('POST', 'https://reqres.in/api/login', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.addEventListener('load', function () {

            if(xmlhttp.readyState === 4 && xmlhttp.status === 200) { //Quando dá certo
                
                const token = JSON.parse(xmlhttp.responseText);
                localStorage.setItem('on', token.token);

                verificarToken();

            } else { //E-mail que não existe

                document.querySelector('.msg-login').innerHTML = 'E-mail inexistente!';

            }
        });
        xmlhttp.send(JSON.stringify(usuario));
    }
});

//Local Storage verificação

function verificarToken(){
    if(localStorage.getItem('on') == "undefined" || localStorage.getItem('on') == null){
        document.querySelector('.btn-shibe').disabled = true;
        document.querySelector('#btn-login').disabled = false;
        document.querySelector('#btn-login').innerHTML = 'Login';
    } else {
        document.querySelector('.btn-shibe').disabled = false;
        document.querySelector('#btn-login').disabled = true;
        document.querySelector('#btn-login').innerHTML = 'Logado';
    }
}

//shibe API

let container = document.querySelector('.shibe-container');

document.querySelector('.btn-shibe').addEventListener('click', function(){
    container.removeChild(container.firstChild);
    axios.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
        .then(function(resp) {
            var img = document.createElement('img');
            img.src = resp.data[0];
            container.appendChild(img);
        });
});

// verificação token inicial

verificarToken();