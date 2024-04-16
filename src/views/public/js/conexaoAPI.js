class PessoaController {
    static async listarPessoas() {
        try {
            const response = await axios.get('http://localhost:3000/pessoa');
            const pessoas = response.data;
            return pessoas;
        } catch (error) {
            console.error('Erro ao listar pessoas:', error);
            throw error;
        }
    }

    static async fazerLogin(cpf, senha) {
        document.getElementById('login-form').addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const formData = new FormData(document.getElementById('login-form'));
            const data={
                cpf:formData.get('cpf'),
                senha:formData.get('password'),
            };
            try {
                const pessoas = await this.listarPessoas();
                const pessoa = pessoas.find(p => p.cpf === data.cpf);
                if (pessoa) {
                    if (pessoa.senha === data.senha) {
                        console.log('Login bem-sucedido:', pessoa);
                        // Serializar o objeto JSON e passá-lo como uma string na URL
                        window.location.href = `/src/views/afterLogin/dashboard.html?id=${pessoa._id}`;
                    } else alert('CPF ou senha incorretos. Por favor, tente novamente.');
                } else alert('CPF ou senha incorretos. Por favor, tente novamente.');
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                throw error;
            }
        });
    }

    static async cadastrarPessoa() {
        document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
            event.preventDefault(); 
            const formData = new FormData(document.getElementById('cadastro-form'));
            const data = {
                cpf: formData.get('cpf'),
                nome: formData.get('nome'),
                senha: formData.get('senha')
            };
            try {
                await axios.post('http://localhost:3000/pessoa', data);
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
            await this.mostrarPessoas();
        } catch (error) {
            console.error('Erro ao excluir pessoa:', error);
        }
    }

    static async mostrarPessoas() {
        const tableBody = document.getElementById('pessoas-lista');
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados
        try {
            const pessoas = await this.listarPessoas();
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
        } catch (error) {
            console.error('Erro ao mostrar pessoas:', error);
        }
    }

    static async mostrarPessoaPorId(id) {
        try {
            const pessoa = await axios.get(`http://localhost:3000/pessoa/${id}`);
            return pessoa.data;
        } catch (error) {
            console.error('Erro ao mostrar pessoa:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PessoaController.fazerLogin();
    PessoaController.cadastrarPessoa();
    PessoaController.mostrarPessoas();
    PessoaController.mostrarPessoaPorId();
});
