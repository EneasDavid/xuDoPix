class PessoaController {
    static async listarPessoas() {
        try {
            const response = await axios.get('http://localhost:3000/pessoa');
            const pessoas = response.data;
            this.mostrarPessoas(pessoas);
            return pessoas;
        } catch (error) {
            console.error('Erro ao listar pessoas:', error);
            throw error;
        }
    }

    static async cadastrarPessoa(event) {
        document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const formData = new FormData(document.getElementById('cadastro-form'));
            const data = {
                cpf: formData.get('cpf'),
                nome: formData.get('nome'),
                senha: formData.get('senha')
            };
            try {
                const response = await axios.post('http://localhost:3000/pessoa', data);
                window.location.href = "/src/views/index.html";
                await this.listarPessoas();
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                alert('Erro ao criar usuário. Por favor, tente novamente mais tarde.');
            }
        });
    }

    static async excluirPessoa(id) {
        try {
            await axios.delete(`http://localhost:3000/pessoa/${id}`);
            await this.listarPessoas();
        } catch (error) {
            console.error('Erro ao excluir pessoa:', error);
        }
    }

    static mostrarPessoas(pessoas) {
        const tableBody = document.getElementById('pessoas-lista');
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        pessoas.forEach(pessoa => {
            const row = document.createElement('tr');
            
            const nomeCell = document.createElement('td');
            nomeCell.textContent = pessoa.nome;
            row.appendChild(nomeCell);
            
            const cpfCell = document.createElement('td');
            cpfCell.textContent = pessoa.cpf;
            row.appendChild(cpfCell);
            
            const senhaCell = document.createElement('td');
            senhaCell.textContent = pessoa.senha;
            row.appendChild(senhaCell);
            
            const excluirCell = document.createElement('td');
            const excluirButton = document.createElement('button');
            excluirButton.textContent = 'Excluir';
            excluirButton.addEventListener('click', () => this.excluirPessoa(pessoa._id));
            excluirCell.appendChild(excluirButton);
            row.appendChild(excluirCell);
            
            tableBody.appendChild(row);
        });
    }
}

// Para cadastrar uma pessoa
PessoaController.cadastrarPessoa();

// Para listar pessoas
PessoaController.listarPessoas();
