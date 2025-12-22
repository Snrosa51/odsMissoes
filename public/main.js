// =======================
// API base (mesmo domínio)
// =======================
const API_BASE = '/api';

// Cache
let missoesCache = [];

// Elementos
const selMissao = document.getElementById("missaoSelect");
const listaAcoesDiv = document.getElementById("listaAcoes");
const missaoDetalhesDiv = document.getElementById("missaoDetalhes");
const statusRegistroDiv = document.getElementById("statusRegistro");
const rankingConteudoDiv = document.getElementById("rankingConteudo");

const btnRecarregarMissoes = document.getElementById("btnRecarregarMissoes");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnMostrarRanking = document.getElementById("btnMostrarRanking");

// =======================
// 1) Carregar missões
// =======================
// public/main.js

async function carregarMissoes() {
  const select = document.getElementById("missaoSelect");
  const listaAcoes = document.getElementById("listaAcoes");

  select.innerHTML = "<option value=''>Selecione uma missão...</option>";
  listaAcoes.innerHTML = "";

  try {
    const resp = await fetch("/api/missoes");
    const missoes = await resp.json();

    missoes.forEach(missao => {
      const option = document.createElement("option");
      option.value = missao.id;
      option.textContent = missao.nome;
      option.dataset.acoes = JSON.stringify(missao.acoes);
      select.appendChild(option);
    });

    select.onchange = () => {
      listaAcoes.innerHTML = "";
      const opt = select.selectedOptions[0];
      if (!opt || !opt.dataset.acoes) return;

      const acoes = JSON.parse(opt.dataset.acoes);

      acoes.forEach(acao => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="checkbox" value="${acao.id}">
          ${acao.nome}
        `;
        listaAcoes.appendChild(label);
      });
    };

  } catch (error) {
    console.error(error);
    select.innerHTML = "<option>Erro ao carregar missões</option>";
  }
}

async function registrarResposta() {
  const nome = document.getElementById("nome").value.trim();
  const serie = document.getElementById("serie").value;
  const missaoId = document.getElementById("missaoSelect").value;

  const checkboxes = document.querySelectorAll("#listaAcoes input[type=checkbox]");
  const acoes = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const status = document.getElementById("statusRegistro");

  if (!nome || !serie || !missaoId || acoes.length === 0) {
    status.textContent = "Preencha todos os campos e selecione ao menos uma ação.";
    status.className = "status erro";
    return;
  }

  try {
    const resp = await fetch("/api/respostas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, serie, missaoId, acoes })
    });

    const data = await resp.json();

    status.textContent = `Registro realizado! Pontos: ${data.pontos}`;
    status.className = "status ok";

    document.querySelectorAll("#listaAcoes input").forEach(cb => cb.checked = false);

  } catch (error) {
    console.error(error);
    status.textContent = "Erro ao registrar ação.";
    status.className = "status erro";
  }
}

async function carregarRanking() {
  const container = document.getElementById("rankingContainer");
  container.innerHTML = "Carregando ranking...";

  try {
    const resp = await fetch("/api/ranking");
    const ranking = await resp.json();

    if (ranking.length === 0) {
      container.innerHTML = "Sem registros ainda.";
      return;
    }

    let html = `
      <table>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Série</th>
          <th>Pontos</th>
        </tr>
    `;

    ranking.forEach((item, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nome}</td>
          <td>${item.serie}</td>
          <td>${item.pontos}</td>
        </tr>
      `;
    });

    html += "</table>";
    container.innerHTML = html;

  } catch (error) {
    console.error(error);
    container.innerHTML = "Erro ao carregar ranking.";
  }
}

// eventos
document.addEventListener("DOMContentLoaded", () => {
  carregarMissoes();

  document.getElementById("btnRegistrar")
    .addEventListener("click", registrarResposta);

  document.getElementById("btnRanking")
    .addEventListener("click", carregarRanking);
});
// Inicialização

carregarMissoes();
registrarResposta();
carregarRanking();
