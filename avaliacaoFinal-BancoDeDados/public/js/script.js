axios.defaults.baseURL = "http://localhost:8080";

function login() {
    const dados = localStorage.dados;
    if (!dados) {
        alert("User not Found, Sign up for Heavy!");
        return;
    }
    usuario = JSON.parse(dados);
    // console.log(usuario);
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    if (email.value == usuario.email && password.value == usuario.password) {
        location.href = "recados.html";
    } else {
        alert("User not Found, Sign up for Heavy!");
    }
}

let usuario = {};
let notas = [];

function sign() {
    const criarEmail = document.getElementById("criarEmail");
    const criarPassword = document.getElementById("criarPassword");
    const repeatPassword = document.getElementById("repeatPassword");

    const email = criarEmail.value;
    const pass = criarPassword.value;
    const conf = repeatPassword.value;

    if (email.length < 5 || pass.length < 5 || conf != pass) {
        alert("Invalid Data");
        return;
    }

    usuario.email = email;
    usuario.password = pass;

    localStorage.dados = JSON.stringify(usuario);
    alert("Created User");
    location.href = "entrar.html";
}

async function adicionarNotas() {
    let id = document.getElementById("id_recado");
    let descricao = document.getElementById("descricao");
    let detalhamento = document.getElementById("detalhamento");

    let recado = {
        descricao: descricao.value,
        detalhamento: detalhamento.value
    };

    if (!id.value) {
        await axios.post("/heavy", recado);
    } else {
        await axios.put(`/heavy/${id.value}`, recado);
    }

    listarNotas();
    detalhamento.value = "";
    descricao.value = "";
    id.value = "";
}

async function listarNotas() {
    const listagem = document.getElementById("listagem");

    let notas = await axios.get("/heavy");

    if (!notas.data.dados) {
        return;
    }

    listagem.innerHTML = "";

    for (let i in notas.data.dados) {
        const nota = notas.data.dados[i];
        let criardiv = `<div id="recado" class="row mt-1">`;

        const botoes = `<button class="btn btn-outline-dark" onclick="deletarNota('${nota.id}')">Excluir</button>
                      <button class="btn btn-outline-light" onclick="editarNota('${nota.id}')">Editar</button>`;

        listagem.innerHTML += `${criardiv}
            <div class="fluid-container">     
                <div class="row">
                    <div class="col-1">${nota.id}</div>
                    <div class="col-2 offset-1">${nota.descricao}</div>
                    <div class="col-3 offset-1">${nota.detalhamento}</div>
                    <div class="col-2 offset-1">${botoes}</div>
                </div>    
            </div>`;
    }
    document.getElementById("descricao").focus();
}

async function editarNota(nota) {
    const { data } = await axios.get(`/heavy/${nota}`);

    document.getElementById("descricao").value = data.dados.descricao;
    document.getElementById("detalhamento").value = data.dados.detalhamento;
    document.getElementById("id_recado").value = data.dados.id;

    listagem.innerHTML += "";
}

async function deletarNota(nota_id) {
    const res = await axios.delete(`/heavy/${nota_id}`);

    listagem.innerHTML += `${nota_id}`;

    listarNotas();
}

function adicionarNotasKey(event) {
    if (event.keyCode == 13) {
        adicionarNotas();
    }
}

function logOut() {
    location.href = "entrar.html";
}