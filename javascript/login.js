// script.js

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Faz a requisição POST para a API de autenticação
        const response = await fetch('https://lcapistran25.pythonanywhere.com/api/v1/authentication/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token; // Altere "token" se a resposta tiver outro nome de campo

            // Armazena o token no localStorage
            localStorage.setItem('authToken', token);

            alert('Login bem-sucedido!');
            // Redirecionar ou realizar outras ações necessárias após o login
        } else {
            alert('Erro de autenticação. Verifique suas credenciais.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar fazer login.');
    }
});
