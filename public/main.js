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
async function carregarMissoes() {
  try {
    selMissao.innerHTML = `<option>Carregando...</option>`;

    const resp = await fetch(`${API_BASE}/missions`);
    if (!resp.ok) throw new Error('Erro ao buscar missões');

    missoesCache = await resp.json();

    selMissao.innerHTML = `<option value="">Selecione uma missão</option>`;
    missoesCache.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.titulo;
      opt.textContent = m.titulo;
      selMissao.appendChild(opt);
    });

    statusRegistroDiv.textContent = 'Missões carregadas com sucesso';
    statusRegistroDiv.className = 'status ok';
  } catch (err) {
    console.error(err);
    statusRegistroDiv.textContent = 'Erro ao carregar missões';
    statusRegistroDiv.className = 'status erro';
  }
}

// =======================
// 2) Atualizar ações
// =======================
function atualizarAcoesDaMissao() {
  listaAcoesDiv.innerHTML = '';
  missaoDetalhesDiv.textContent = '';

  const missao = missoesCache.find(m => m.titulo === selMissao.value);
  if (!missao) return;

  missaoDetalhesDiv.innerHTML = `
    <strong>${missao.descricao}</strong>
    <span class="ods-badge">ODS ${missao.odsNumero}</span>
  `;

  (missao.Acaos || []).forEach((a, i) => {
    const label = document.createElement('label');
    const cb = document.createElement('input');

    cb.type = 'checkbox';
    cb.value = a.descricao;

    label.appendChild(cb);
    label.appendChild(document.createTextNode(a.descricao));
    listaAcoesDiv.appendChild(label);
  });
}

// =======================
// 3) Registrar resposta
// =======================
async function registrarAcao() {
  const nome = document.getElementById('nome').value.trim();
  const serie = document.getElementById('serie').value.trim();
  const missaoTitulo = selMissao.value;

  const acoes = [...listaAcoesDiv.querySelectorAll('input:checked')]
    .map(cb => cb.value);

  if (!nome || !serie || !missaoTitulo || !acoes.length) {
    statusRegistroDiv.textContent = 'Preencha todos os campos';
    statusRegistroDiv.className = 'status erro';
    return;
  }

  try {
    const resp = await fetch(`${API_BASE}/respostas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, serie, missao_titulo: missaoTitulo, acoes })
    });

    const json = await resp.json();
    if (!resp.ok) throw new Error(json.error);

    statusRegistroDiv.textContent = `Resposta registrada! Pontos: ${json.pontos}`;
    statusRegistroDiv.className = 'status ok';

    carregarRanking();
  } catch (err) {
    console.error(err);
    statusRegistroDiv.textContent = 'Erro ao registrar resposta';
    statusRegistroDiv.className = 'status erro';
  }
}

// =======================
// 4) Ranking
// =======================
async function carregarRanking() {
  try {
    const resp = await fetch(`${API_BASE}/ranking`);
    const lista = await resp.json();

    if (!lista.length) {
      rankingConteudoDiv.innerHTML = '<em>Nenhum registro</em>';
      return;
    }

    rankingConteudoDiv.innerHTML = lista.map((r, i) => `
      <p>${i + 1}º ${r.nome} - ${r.pontos} pts</p>
    `).join('');
  } catch (err) {
    console.error(err);
    rankingConteudoDiv.textContent = 'Erro ao carregar ranking';
  }
}

// =======================
// Eventos
// =======================
selMissao.addEventListener('change', atualizarAcoesDaMissao);
btnRecarregarMissoes.addEventListener('click', carregarMissoes);
btnRegistrar.addEventListener('click', registrarAcao);
btnMostrarRanking.addEventListener('click', carregarRanking);

// Inicialização
carregarMissoes();
carregarRanking();
