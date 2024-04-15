async function listarPessoas() {
    try {
        const response = await axios.get('http://localhost:3000/pessoa');
        const pessoas = response.data;
        mostrarPessoas(pessoas);
        return pessoas;
    } catch (error) {
        console.error('Erro ao listar pessoas:', error);
        throw error;
    }
}

function mostrarPessoas(pessoas) {
    const tableBody = document.getElementById('pessoas-lista');
    tableBody.innerHTML = ''; // Limpa o conteúdo anterior

    pessoas.forEach(pessoa => {
        const row = document.createElement('tr');
        const nomeCell = document.createElement('td');
        nomeCell.textContent = pessoa.nome;
        row.appendChild(nomeCell);
        const cpfCell = document.createElement('td');
        cpfCell.textContent = pessoa.cpf;
        row.appendChild(cpfCell);
        tableBody.appendChild(row);
    });
}

listarPessoas();
