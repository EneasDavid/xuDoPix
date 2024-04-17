function obterIdUsuario() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get('id');
}

function comprimento() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = 'Bom dia, ';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Boa tarde, ';
    } else {
        greeting = 'Boa noite, ';
    }
    
    const elementoSaudacao = document.getElementById('greeting');
    elementoSaudacao.textContent = greeting;

    const spanNomeUsuario = document.createElement('span');
    spanNomeUsuario.id = 'nome-usuario';
    elementoSaudacao.appendChild(spanNomeUsuario);
}

class Controller {
         
    static async mostrarPessoaPorId(id) {
        try {
            const pessoa = await axios.get(`http://localhost:3000/pessoa/${id}`);
            return pessoa.data;
        } catch (error) {
            console.error('Erro ao mostrar pessoa:', error);
        }
    }

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

    static async listarDividas() {
        try {
            const response = await axios.get(`http://localhost:3000/divida`);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar dívidas:', error);
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
                        window.location.href = `/src/views/afterLogin/dashboard.html`;
                        localStorage.setItem('id', pessoa._id); // Correção: armazenando o ID do usuário no localStorage
                        await this.afterLogin();
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

    static async cadastrarDivida() {
       const id=obterIdUsuario;
        document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
            event.preventDefault();     
            const formData = new FormData(document.getElementById('cadastro-form'));
            const data = {
                devedor: formData.get('devedor'),
                fiador: id,
                valor: parseFloat(formData.get('valor')),
                status: 'false', 
            };
            try {
                const novaDivida = new Divida(data);
                await novaDivida.save();
                window.location.href = "/src/views/dashboard.html";
            } catch (error) {
                console.error('Erro ao cadastrar dívida:', error);
                alert('Erro ao cadastrar dívida. Por favor, tente novamente mais tarde.');
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

    static async excluirDivida(id) {
        try {
            await axios.delete(`http://localhost:3000/divida/${id}`);
            //await this.();
        } catch (error) {
            console.error('Erro ao excluir dívida:', error);
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

    static async mostrarDividas(id) {
        const tableBody = document.getElementById('debito-lista');
        tableBody.innerHTML = ''; 
        try {
            const dividas = await this.listarDividas();
            for (const divida of dividas) {
                if (divida.id_devedor === id) {
                    const row = document.createElement('tr');
    
                    const valorCell = document.createElement('td');
                    valorCell.textContent = divida.valor;
                    row.appendChild(valorCell);
    
                    const devedorCell = document.createElement('td');
                    const prazoData = new Date(divida.prazo);
                    const prazoFormatado = prazoData.toLocaleDateString('pt-BR');
                    devedorCell.textContent = prazoFormatado; 
                    row.appendChild(devedorCell);
    
                    const prazoCell = document.createElement('td');
                    const fiadorNome = await this.mostrarPessoaPorId(divida.id_fiador);
                    prazoCell.textContent = fiadorNome.nome;
                    row.appendChild(prazoCell);                
    
                    const situacaoCell = document.createElement('td');
                    situacaoCell.textContent = divida.status ? 'Pago' : 'Devendo';
                    row.appendChild(situacaoCell);
    
                    tableBody.appendChild(row);
                }
            }
        } catch (error) {
            console.error('Erro ao mostrar dívidas:', error);
        }
    }
    
    static async mostrarCreditos(id) {
        const tableBody = document.getElementById('credito-lista');
        tableBody.innerHTML = ''; 
        try {
            const dividas = await this.listarDividas();
            for (const divida of dividas) {
                if (divida.id_fiador === id) {
                    const row = document.createElement('tr');
    
                    const valorCell = document.createElement('td');
                    valorCell.textContent = divida.valor;
                    row.appendChild(valorCell);
    
                    const devedorCell = document.createElement('td');
                    const prazoData = new Date(divida.prazo);
                    const prazoFormatado = prazoData.toLocaleDateString('pt-BR');
                    devedorCell.textContent = prazoFormatado; 
                    row.appendChild(devedorCell);
    
                    const prazoCell = document.createElement('td');
                    const pessoa = await this.mostrarPessoaPorId(divida.id_devedor);
                    prazoCell.textContent = pessoa.nome;
                    row.appendChild(prazoCell);                
    
                    const excluirCell = document.createElement('td');
                    const excluirButton = document.createElement('button');
                    excluirButton.textContent = 'QUITAR';
                    excluirButton.addEventListener('click', () => this.excluirDivida(divida._id));
                    excluirCell.appendChild(excluirButton);
                    row.appendChild(excluirCell);
    
                    tableBody.appendChild(row);
                }
            }
        } catch (error) {
            console.error('Erro ao mostrar dívidas:', error);
        }
    }

    static async contarDividasAtivas(idUsuario) {
        try {
            const dividas = await this.listarDividas();
            const dividasAtivas = dividas.filter(divida => {
                return (divida.id_devedor === idUsuario || divida.id_fiador === idUsuario) && !divida.status;
            });
            return dividasAtivas;
        } catch (error) {
            console.error('Erro ao contar dívidas ativas:', error);
            throw error;
        }
    }

    static async afterLogin() {
        const idUsuario = localStorage.getItem('id');
        comprimento();
        if (idUsuario) {
            try {
                const pessoa = await this.mostrarPessoaPorId(idUsuario);
                if (pessoa && pessoa.nome) {
                    const elementoNomeUsuario = document.getElementById('nome-usuario');
                    if (elementoNomeUsuario) {
                        elementoNomeUsuario.textContent = pessoa.nome;
                    }
                    const dividasAtivas = await this.contarDividasAtivas(idUsuario);
                    const quantidadeDividasAtivas = dividasAtivas.length;
                    console.log(quantidadeDividasAtivas);
                    // Calcular saldo positivo e negativo com base nas dívidas
                    let saldoPositivo = 0;
                    let saldoNegativo = 0;
    
                    for (const divida of dividasAtivas) {
                        if (divida.id_fiador === idUsuario) {
                            saldoPositivo += divida.valor;
                        } else if (divida.id_devedor === idUsuario) {
                            saldoNegativo += divida.valor;
                        }
                    }
    
                    const elementoCPF = document.getElementById('cpf-usuario');
                    const elementoDividasAtivas = document.getElementById('dividas-ativas');
                    const elementoSaldoPositivo = document.getElementById('saldo-positivo');
                    const elementoSaldoNegativo = document.getElementById('saldo-negativo');

                    elementoCPF.textContent = `CPF: ${pessoa.cpf}`;
    
                    if (elementoDividasAtivas) elementoDividasAtivas.textContent = `Dívidas Ativas: ${quantidadeDividasAtivas}`;
                    else elementoDividasAtivas.textContent = `Dívidas Ativas: 0`;
    
                    if (elementoSaldoPositivo) elementoSaldoPositivo.textContent = `Saldo Positivo: R$ ${saldoPositivo.toFixed(2)}`;
                    else elementoSaldoPositivo.textContent = `Saldo Positivo: R$ 0,00`;
                    if (elementoSaldoNegativo) elementoSaldoNegativo.textContent = `Saldo Negativo: R$ ${saldoNegativo.toFixed(2)}`;
                    else elementoSaldoNegativo.textContent = `Saldo Negativo: R$ 0,00`;
    
                    await this.mostrarDividas(idUsuario);
                    await this.mostrarCreditos(idUsuario);
                } else {
                    console.error('Erro: pessoa não encontrada ou nome não disponível.');
                }
            } catch (error) {
                console.error('Erro ao obter informações da pessoa:', error);
            }
        } else {
            console.error('Erro: ID do usuário não encontrado na URL.');
        }
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    Controller.fazerLogin();
    Controller.cadastrarPessoa();
    Controller.mostrarPessoas();
    Controller.afterLogin();
});
