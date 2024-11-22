// Função para obter uma receita pelo ID e atualizar o HTML
async function fetchRecipeById(recipeId) {
    try {
      // URL base da API
      const apiUrl = `https://lcapistran25.pythonanywhere.com/api/v1/recipes/${recipeId}`;
      
      // Fazendo a requisição para a API
      const response = await fetch(apiUrl);
      
      // Verificando se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro ao buscar a receita');
      }
      
      // Convertendo a resposta para JSON
      const recipe = await response.json();
      
      // Atualizando o HTML com os dados da receita
      document.getElementById('recipe-title').textContent = recipe.name || 'Título não disponível';
      document.getElementById('recipe-image').src = recipe.image || '';
      document.querySelector('.recipe-description').textContent = recipe.description || 'Descrição não disponível';
      document.getElementById('recipe-category').textContent = recipe.name_category || 'Categoria não disponível';
      document.getElementById('recipe-origin').textContent = recipe.name_country || 'Origem não disponível';
      
      // Preenchendo os ingredientes
      const ingredientsList = document.getElementById('recipe-ingredients');
      ingredientsList.innerHTML = '';
      if (recipe.ingredients) {
        recipe.ingredients.split('\r\n').forEach(ingredient => {
          const li = document.createElement('li');
          li.textContent = ingredient;
          ingredientsList.appendChild(li);
        });
      } else {
        ingredientsList.innerHTML = '<li>Ingredientes não disponíveis</li>';
      }
      
      // Preenchendo os passos do preparo
      const stepsList = document.getElementById('recipe-steps');
      stepsList.innerHTML = '';
      if (recipe.preparation) {
        recipe.preparation.split('\r\n\r\n').forEach(step => {
          const li = document.createElement('li');
          li.textContent = step;
          stepsList.appendChild(li);
        });
      } else {
        stepsList.innerHTML = '<li>Modo de preparo não disponível</li>';
      }
  
      // Exibindo o modal da receita
      document.getElementById('recipe-container').classList.remove('hidden');
  
    } catch (error) {
      console.error('Erro:', error);
    }
  }
  
  // Função para fechar o modal
  function closeModal() {
    document.getElementById('recipe-container').classList.add('hidden');
    window.history.back();
  }
  
  // Extraindo o ID da receita da query string da URL
  function getRecipeIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }
  
  // Inicializar a página ao carregar
  document.addEventListener('DOMContentLoaded', () => {
    const recipeId = getRecipeIdFromUrl();
    if (recipeId) {
      fetchRecipeById(recipeId);
    }
  });
  
