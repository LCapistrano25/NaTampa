document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

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
            const token = data.access; // Ajuste se a chave for diferente
            const userId = data.user.id
            const name = data.user.first_name
            // Armazena o token e tempo de expiração no localStorage
            const expirationTime = 3600; // 1 hora (em segundos)
            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenExpiry', Date.now() + expirationTime * 1000);
            localStorage.setItem('userId', userId);
            localStorage.setItem('name', name);
            
            // Limpa mensagens de erro
            errorMessage.style.display = 'none';

            // Redireciona para a página principal
            window.location.href = '/html/home.html';
        } else {
            // Exibe erro de autenticação
            errorMessage.textContent = 'Erro de autenticação. Verifique suas credenciais.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro:', error);
        errorMessage.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
        errorMessage.style.display = 'block';
    }
});
