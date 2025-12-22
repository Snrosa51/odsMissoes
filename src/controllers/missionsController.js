// src/controllers/missionsController.js

exports.getMissoes = async (req, res) => {
  try {
    const missoes = [
      {
        id: "ODS3",
        nome: "ODS 3 – Saúde e Bem-estar",
        acoes: [
          { id: "D1", nome: "Lavar as mãos regularmente (antes das refeições e após usar o banheiro)" },
          { id: "D2", nome: "Manter unhas limpas e cortadas" },
          { id: "D3", nome: "Usar garrafa de água individual e limpa" }
        ]
      },
      {
        id: "ODS4",
        nome: "ODS 4 – Educação de Qualidade",
        acoes: [
          { id: "A1", nome: "Jogar o lixo no lugar certo (papel, plástico, orgânico)" },
          { id: "A2", nome: "Fazer o dever de casa do dia" },
          { id: "A3", nome: "Ler um livro da biblioteca por 30 minutos ou mais" }
        ]
      }
    ];

    res.json(missoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao carregar missões" });
  }
};

