const form = document.getElementById('form'); // Pegando o formulário no HTML
form.addEventListener('submit', handleSubmit); // Escutando o evento de Submit do formulário

function handleSubmit(event) {
  event.preventDefault(); // Tirando o comportamento padrão do submit

  const gender = getSelectedValue('gender'); // Pegando o index selecionado no Gênero
  const age = getInputNumberValue('age'); // Pegando o value em Age
  const weight = getInputNumberValue('weight'); // Pegando o value em Peso
  const height = getInputNumberValue('height'); // Pegando o value em Altura
  const activityLevel = getSelectedValue('activity_level'); // Pegando o index selecionado no tipo de atividade

  const taxaMetabolicaBasal = Math.round(
    gender === 'female'
      ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
      : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
  );

  const maintenance = Math.round(taxaMetabolicaBasal * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  const layout = `
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${taxaMetabolicaBasal} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
        </li>
      </ul>
    </div>
  `;

  const result = document.getElementById('result');

  result.innerHTML = layout;
};

function getInputNumberValue (id) { // Criando a função que buscar os elementos do tipo text/number no HTML pelo ID e retorna o value convertido para Number.
  return Number(document.getElementById(id).value);
}

function getSelectedValue(id) { // Criando a função para buscar os elementos do tipo select no HTML e retornar o elemento selecionado através do index.
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}