// URL da API do TheMealDB
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

// URL da API do LibreTranslate
const TRANSLATE_URL = "https://libretranslate.com/translate";

// Função para traduzir texto usando LibreTranslate
const translateMeal = (text) => {
    console.log('Tentando traduzir:', text);
    return fetch(TRANSLATE_URL, {
        method: 'POST',
        body: JSON.stringify({
            q: text,
            source: 'en',
            target: 'pt',
            format: 'text'
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta da tradução:', data);
        if (data.translatedText) {
            return data.translatedText;
        }
        return text;
    })
    .catch(error => {
        console.error('Erro na tradução:', error);
        return text;
    });
};

// Listener para o botão "Gerar Plano de Refeições"
document.getElementById('generateMealPlan').addEventListener('click', generateMealPlan);

// Função para buscar e exibir o plano de refeições
function generateMealPlan() {
    console.log('Iniciando geração do plano de refeições');
    const mealDisplay = document.getElementById('mealDisplay');
    mealDisplay.innerHTML = '';  // Limpar conteúdo anterior

    const mealNumbers = ['Primeira refeição', 'Segunda refeição', 'Terceira refeição', 'Quarta refeição', 'Quinta refeição', 'Sexta refeição', 'Sétima refeição'];

    // Buscar uma refeição aleatória para cada número de refeição
    mealNumbers.forEach((mealNumber, index) => {
        console.log(`Buscando refeição para ${mealNumber}`);
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                console.log(`Dados recebidos para ${mealNumber}:`, data);
                const meal = data.meals[0];

                if (meal && meal.strMeal) {
                    console.log(`Traduzindo nome da refeição: ${meal.strMeal}`);
                    translateMeal(meal.strMeal).then(translatedMealName => {
                        console.log(`Nome traduzido: ${translatedMealName}`);
                        const ingredientPromises = [];
                        for (let i = 1; i <= 20; i++) {
                            const ingredient = meal[`strIngredient${i}`];
                            const measure = meal[`strMeasure${i}`];
                            if (ingredient) {
                                ingredientPromises.push(translateMeal(`${measure} ${ingredient}`));
                            }
                        }

                        Promise.all(ingredientPromises).then(translatedIngredients => {
                            console.log(`Ingredientes traduzidos para ${mealNumber}:`, translatedIngredients);
                            const mealHtml = `
                                <div class="meal-item">
                                    <div class="meal-header">
                                        <h3 class="meal-number">${mealNumber}</h3>
                                        <h4 class="meal-name">${translatedMealName}</h4>
                                    </div>
                                    <div class="meal-content">
                                        <div class="meal-image-container">
                                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                        </div>
                                        <div class="meal-details">
                                            <p><strong>Categoria:</strong> ${meal.strCategory}</p>
                                            <p><strong>Origem:</strong> ${meal.strArea}</p>
                                        </div>
                                        <div class="meal-ingredients">
                                            <h4>Ingredientes:</h4>
                                            <ul>
                                                ${translatedIngredients.map(ing => `<li>${ing}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                    <a href="${meal.strSource}" target="_blank" class="recipe-link">Ver Receita Completa</a>
                                </div>
                            `;
                            console.log(`HTML gerado para ${mealNumber}:`, mealHtml);
                            mealDisplay.innerHTML += mealHtml;
                        });
                    });
                } else {
                    console.error('Nome da refeição não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar refeição:', error);
            });
    });
}
