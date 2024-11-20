// Função para carregar a sidebar dinamicamente
async function loadSidebar() {
    const sidebarContainer = document.getElementById("sidebar-container");
    
    try {
        const response = await fetch("/html/sidebar.html"); // Caminho para o arquivo sidebar.html
        if (response.ok) {
            const sidebarHtml = await response.text();
            sidebarContainer.innerHTML = sidebarHtml;
            loadSidebarCSS(); // Carrega o CSS da sidebar
            initializeSidebar(); // Inicializa a lógica da sidebar
        } else {
            console.error("Erro ao carregar a sidebar:", response.status);
            sidebarContainer.innerHTML = "<p>Erro ao carregar a sidebar.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar o conteúdo da sidebar:", error);
        sidebarContainer.innerHTML = "<p>Erro ao carregar a sidebar.</p>";
    }
}

// Função para carregar o CSS da sidebar dinamicamente
function loadSidebarCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/sidebar.css"; // Caminho para o arquivo sidebar.css
    document.head.appendChild(link);
}

// Função para inicializar a lógica da sidebar após o carregamento
function initializeSidebar() {
    const navItems = document.querySelectorAll(".sidebar .nav-item");

    // Recupera o item ativo salvo no localStorage
    const activeItemIndex = localStorage.getItem("activeNavItem");

    // Aplica o estado ativo ao item salvo
    if (activeItemIndex !== null && navItems[activeItemIndex]) {
        navItems[activeItemIndex].classList.add("active");
    }

    // Adiciona evento de clique a todos os itens da sidebar
    navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            // Remove a classe "active" de todos os itens
            navItems.forEach(nav => nav.classList.remove("active"));

            // Adiciona a classe "active" ao item clicado
            item.classList.add("active");

            // Salva o índice do item ativo no localStorage
            localStorage.setItem("activeNavItem", index);
        });
    });
}

// Carrega a sidebar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", loadSidebar);
