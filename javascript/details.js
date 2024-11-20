// Função para abrir o modal e carregar os dados
function openModal(recipe) {
    document.getElementById("recipe-title").textContent = recipe.name;
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-description").textContent = recipe.description;
    document.getElementById("recipe-category").textContent = recipe.name_category;
    document.getElementById("recipe-origin").textContent = recipe.name_origin;
  
    const ingredientsList = document.getElementById("recipe-ingredients");
    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
  
    const stepsList = document.getElementById("recipe-steps");
    stepsList.innerHTML = "";
    recipe.steps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      stepsList.appendChild(li);
    });
  
    document.getElementById("recipe-container").classList.remove("hidden");
  }
  
  // Função para fechar o modal
  function closeModal() {
    document.getElementById("recipe-container").classList.add("hidden");
  }
  
  // Função para buscar dados da API
async function fetchRecipe() {
    try {
      // Substitua a URL abaixo pela URL real da sua API
      const token = localStorage.getItem("authToken");
      const recipeId = localStorage.getItem("recipeId");
      if (!token) {
          throw new Error("Token de autenticação não encontrado.");
      }
      const response = await fetch(`http://localhost:8000/api/v1/recipes/1`, // Corrigido a interpolação da URL
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json", 
            }
        }
      );
  
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API.");
      }
      
      // Converte a resposta para JSON
      const recipe = await response.json();
  
      // Chama a função para abrir o modal com os dados
      openModal(recipe);
    } catch (error) {
      console.error("Erro ao carregar a receita:", error);
      alert("Não foi possível carregar os dados da receita.");
    }
  }
  
  // Chama a função para buscar os dados da API
  fetchRecipe();
  