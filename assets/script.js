const baseURL = "http://localhost:3000/publicacoes";

async function findAllPublicacoes() {
  const response = await fetch(`${baseURL}/todas-publicacoes`);

  const publicacoes = await response.json();

  publicacoes.forEach(function (publicacao) {
    document.querySelector(".Publicacoes").insertAdjacentHTML(
      "beforeEnd",
      `

      <div class="PublicacaoContainer">
        <div class="PublicacaoHeader">
          <img src="${publicacao.foto}" alt="">

          <div class="NomeAndHora">
            <h2>${publicacao.nome}</h2>
            <h3>${publicacao.dataHora}</h3>
          </div>
        </div>

        <div class="PublicacaoMain">
          <h3>${publicacao.texto}</h3>
        </div>
      </div>
      `
    );
  });
}

async function findByIdPublicacoes() {
  const id = document.querySelector("#idPublicacao").value;

  const response = await fetch(`${baseURL}/publicacao/${id}`);
  const publicacao = await response.json();

  const publicacaoEscolhidaDiv = document.querySelector(
    "#publicacaoEscolhidaDiv"
  );

  publicacaoEscolhidaDiv.innerHTML = `
      <h2 id="PublicacaoEscolhida">Publicação Escolhida</h2>

      <div class="PublicacaoContainer">
        <div class="PublicacaoHeader">
          <img src="${publicacao.foto}" alt="">

          <div class="NomeAndHora">
            <h2>${publicacao.nome}</h2>
            <h3>${publicacao.dataHora}</h3>
          </div>
        </div>

        <div class="PublicacaoMain">
          <h3>${publicacao.texto}</h3>
        </div>
    </div>
  `;
}

async function abrirModal() {
  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#nome").value = "";
  document.querySelector("#texto").value = "";
  document.querySelector("#foto").value = "";
}

async function createPublicacao() {
  const nome = document.querySelector("#nome").value;
  const texto = document.querySelector("#texto").value;
  const foto = document.querySelector("#foto").value;

  const publicacao = {
    nome,
    texto,
    foto,
  };

  const response = await fetch(baseURL + "/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(publicacao),
  });

  const novaPublicacao = await response.json();

  const html = `<div class="PublicacaoContainer">
  <div class="PublicacaoHeader">
  <img src="${novaPublicacao.foto}" alt="">

    <div class="NomeAndHora">
      <h2>${novaPublicacao.nome}</h2>
      <h3>${novaPublicacao.dataHora}</h3>
    </div>
  </div>

  <div class="PublicacaoMain">
    <h3>${novaPublicacao.texto}</h3>
  </div>
</div>`;

  document.getElementById(".Publicacoes").insertAdjacentHTML("beforeend", html);
  fecharModalCadastro();
  document.location.reload(true);
}

findAllPublicacoes();
