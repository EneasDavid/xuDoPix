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

    static async mostrarDividaPorId(id){
        try{
            const divida=await axios.get(`http://localhost:3000/divida/${id}`);
            return divida.data;
        }catch(error){
            console.error('Erro ao mostrar divida', error);
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
    const idUsuario = localStorage.getItem('id');
    let devedorId = null;

    document.getElementById('devedor').addEventListener('change', (event) => {
        devedorId = event.target.value;
    });

    document.getElementById('cadastro-divida-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementById('cadastro-divida-form'));
        const data = {
            id_devedor: devedorId,
            id_fiador: idUsuario,
            valor:  parseFloat(formData.get('valor')),
            prazo: formData.get('prazo'),
            status: 'false', 
            dataCriacao:new Date(),
        };
        try {
            await axios.post('http://localhost:3000/divida', data);
            window.location.href = "/src/views/afterLogin/dashboard.html";
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
            await this.mostrarDividas();
        } catch (error) {
            console.error('Erro ao excluir dívida:', error);
        }
    }

    static async quitarDivida(id){
        try{
            const data = await this.mostrarDividaPorId(id);
            data.status=true;
            await axios.put(`http://localhost:3000/divida/${id}`, data);
            await this.afterLogin();
        }catch(error){
            console.error('erro ao quitar divida', error);
        }
    }

    static async editarDivida(idDivida) {
        try {
            window.location.href = "./editDivida.html";

            const dividaData = await this.mostrarDividaPorId(idDivida);

            document.getElementById('valor').value = dividaData.valor;
            document.getElementById('prazo').value = dividaData.prazo;
            
            let devedorId = dividaData.id_devedor; 
            
            document.getElementById('devedor').addEventListener('change', (event) => {
                devedorId = event.target.value;
            });
    
            document.getElementById('editar-divida-form').addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(document.getElementById('editar-divida-form'));
                const data = {
                    id_devedor: devedorId,
                    id_fiador: localStorage.getItem('id'),
                    valor: parseFloat(formData.get('valor')),
                    prazo: formData.get('prazo'),
                    status: dividaData.status,
                    dataCriacao: new Date(),
                };
                try {
                    await axios.put(`http://localhost:3000/divida/${idDivida}`, data);
                    window.location.href = "./dashboard.html";
                } catch (error) {
                    console.error('Erro ao editar dívida:', error);
                    alert('Erro ao editar dívida. Por favor, tente novamente mais tarde.');
                }
            });
        } catch (error) {
            console.error('Erro ao carregar dados da dívida para edição:', error);
            alert('Erro ao carregar dados da dívida para edição. Por favor, tente novamente mais tarde.');
        }
    }
    
    static async cadastrarDivida() {
        const idUsuario = localStorage.getItem('id');
        let devedorId = null;
    
        document.getElementById('devedor').addEventListener('change', (event) => {
            devedorId = event.target.value;
        });
    
        document.getElementById('cadastro-divida-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(document.getElementById('cadastro-divida-form'));
            const data = {
                id_devedor: devedorId,
                id_fiador: idUsuario,
                valor: parseFloat(formData.get('valor')),
                prazo: formData.get('prazo'),
                status: 'false', 
                dataCriacao: new Date(),
            };
            try {
                await axios.post('http://localhost:3000/divida', data);
                window.location.href = "/src/views/afterLogin/dashboard.html";
            } catch (error) {
                console.error('Erro ao cadastrar dívida:', error);
                alert('Erro ao cadastrar dívida. Por favor, tente novamente mais tarde.');
            }
        });
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
                
                const quitarCell = document.createElement('td');
                const quitarButton = document.createElement('button');
                quitarButton.textContent = 'Excluir';
                quitarButton.addEventListener('click', () => this.excluirPessoa(pessoa._id));
                quitarCell.appendChild(quitarButton);
                row.appendChild(quitarCell);
                
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao mostrar pessoas:', error);
        }
    }

    static async mostrarDividas() {
        const tableBody = document.getElementById('todos-os-lista');
        if (tableBody === null) return;
        tableBody.innerHTML = '';
        try {
            const dividas = await this.listarDividas();
            if (dividas.length === 0) {
                const noDataRow = document.createElement('tr');
                const noDataCell = document.createElement('td');
                noDataCell.textContent = 'Nenhum dado encontrado';
                noDataCell.colSpan = 6; // Colspan igual ao número de colunas na tabela
                noDataRow.appendChild(noDataCell);
                tableBody.appendChild(noDataRow);
            } else {
                for (const divida of dividas) {
                    const row = document.createElement('tr');
    
                    const valorCell = document.createElement('td');
                    valorCell.textContent = divida.valor;
                    row.appendChild(valorCell);
    
                    const fiadorCell = document.createElement('td');
                    const fiador = await this.mostrarPessoaPorId(divida.id_fiador);
                    fiadorCell.textContent = fiador ? fiador.nome : 'Dado não encontrado';
                    row.appendChild(fiadorCell);
    
                    const devedorCell = document.createElement('td');
                    const devedor = await this.mostrarPessoaPorId(divida.id_devedor);
                    devedorCell.textContent = devedor ? devedor.nome : 'Dado não encontrado';
                    row.appendChild(devedorCell);
    
                    const prazoCell = document.createElement('td');
                    const prazoData = new Date(divida.prazo);
                    const prazoFormatado = prazoData.toLocaleDateString('pt-BR');
                    prazoCell.textContent = prazoFormatado;
                    row.appendChild(prazoCell);
    
                    const quitarCell = document.createElement('td');
                    if (divida.status) {
                        quitarCell.textContent = "ENCERRADA";
                    } else {
                        const quitarButton = document.createElement('button');
                        quitarButton.textContent = 'QUITAR';
                        quitarButton.addEventListener('click', () => this.quitarDivida(divida._id));
                        quitarCell.appendChild(quitarButton);
                    }
                    row.appendChild(quitarCell);
    
                    const excluirCell = document.createElement('td');
                    const excluirButton = document.createElement('button');
                    excluirButton.textContent = 'Excluir';
                    excluirButton.addEventListener('click', () => this.excluirDivida(divida._id));
                    excluirCell.appendChild(excluirButton);
                    row.appendChild(excluirCell);
    
                    tableBody.appendChild(row);
                }
            }
        } catch (error) {
            console.error('Erro ao mostrar dívidas:', error);
            // Em caso de erro, preenche o td com uma mensagem de erro
            const errorRow = document.createElement('tr');
            const errorCell = document.createElement('td');
            errorCell.textContent = 'Erro ao carregar dados';
            errorCell.colSpan = 6; // Colspan igual ao número de colunas na tabela
            errorRow.appendChild(errorCell);
            tableBody.appendChild(errorRow);
        }
    }
       
    static async mostrarDebitos(id) {
        const tableBody = document.getElementById('debito-lista');
        if(tableBody===null) return;
        tableBody.innerHTML = ''; 
        try {
            const dividas = await this.listarDividas();
            for (const divida of dividas) {
                if (divida.id_devedor === id && divida.status===false) {
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
                    situacaoCell.textContent = divida.status ? 'PAGA' : 'EM ABERTO';
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
        if(tableBody===null) return;
        tableBody.innerHTML = ''; 
        try {
            const dividas = await this.listarDividas();
            for (const divida of dividas) {
                if (divida.id_fiador === id && divida.status===false) {
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
    
                    const quitarCell = document.createElement('td');
                    const quitarButton = document.createElement('button');
                    quitarButton.textContent = 'QUITAR';
                    quitarButton.addEventListener('click', () => this.quitarDivida(divida._id));
                    quitarCell.appendChild(quitarButton);
                    row.appendChild(quitarCell);

                    tableBody.appendChild(row);
                }
            }
        } catch (error) {
            console.error('Erro ao mostrar dívidas:', error);
        }
    }

    static async mostrarTodosCreditos(){
        const idUsuario = localStorage.getItem('id');
        const tableBody = document.getElementById('todos-os-credito-lista');
        if(tableBody===null) return;
        tableBody.innerHTML = ''; 
        try {
            const dividas = await this.listarDividas();
            for (const divida of dividas) {
                if (divida.id_fiador === idUsuario) {
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

                    const quitarCell = document.createElement('td');
                    if (divida.status) {
                        quitarCell.textContent = "ENCERRADA";
                    } else {
                        const quitarButton = document.createElement('button');
                        quitarButton.textContent = 'QUITAR';
                        quitarButton.addEventListener('click', () => this.quitarDivida(divida._id));
                        quitarCell.appendChild(quitarButton);
                    }
                    row.appendChild(quitarCell);
                    const editarCell = document.createElement('td');
                    if (!divida.status){
                        const editarButton = document.createElement('button');
                        editarButton.textContent = 'Editar';
                        editarButton.addEventListener('click', () => this.editarDivida(divida._id));
                        editarCell.appendChild(editarButton);
                    }else{
                        editarCell.textContent = 'Indisponivel';
                    }
                    row.appendChild(editarCell);
                    
                    tableBody.appendChild(row);
                }
            }
        } catch (error) {
            console.error('Erro ao mostrar dívidas:', error);
        }
    }

    static async mostrarTodosDebitos(){
        const idUsuario = localStorage.getItem('id');
        const tableBody = document.getElementById('todos-os-debito-lista');
        if(tableBody===null) return;
        tableBody.innerHTML = ''; 
        try {
            const dividas = await this.listarDividas();
            for (const divida of dividas) {
                if (divida.id_devedor === idUsuario) {
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
                    situacaoCell.textContent = divida.status ? 'PAGA' : 'EM ABERTO';
                    row.appendChild(situacaoCell);
    
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

    static async editarPessoa() {
        const idUsuario = localStorage.getItem('id');
        const pessoaData = await this.mostrarPessoaPorId(idUsuario);
        document.getElementById('cpf').value = pessoaData.cpf;
        document.getElementById('nome').value = pessoaData.nome;
        document.getElementById('senha').value = pessoaData.senha;
    
        document.getElementById('editar-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(document.getElementById('editar-form'));
            const data = {
                cpf: formData.get('cpf'),
                nome: formData.get('nome'),
                senha: formData.get('senha')
            };
            try {
                await axios.put(`http://localhost:3000/pessoa/${idUsuario}`, data);
                window.location.href = "./dashboard.html";
            } catch (error) {
                console.error('Erro ao editar usuário:', error);
                alert('Erro ao editar usuário. Por favor, tente novamente mais tarde.');
            }
        });
    }
    
    static async listarPessoasDropDawn() {
        const idUsuario = localStorage.getItem('id');
        try {
          const response = await axios.get('http://localhost:3000/pessoa');
          const pessoas = response.data;
          const dropdown = document.getElementById('devedor');
          dropdown.innerHTML = '<option value="">Selecione um usuário</option>';
          pessoas.forEach(pessoa => {
            if(pessoa._id!=idUsuario){
                const option = document.createElement('option');
                option.value = pessoa._id;
                option.textContent = pessoa.nome;
                dropdown.appendChild(option);    
            }
          });
        } catch (error) {
          console.error('Erro ao listar pessoas:', error);
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
    
                    if (elementoSaldoPositivo) elementoSaldoPositivo.textContent = `Saldo Positivo: + R$ ${saldoPositivo.toFixed(2)}`;
                    else elementoSaldoPositivo.textContent = `Saldo Positivo: R$ 0,00`;
                    if (elementoSaldoNegativo) elementoSaldoNegativo.textContent = `Saldo Negativo: - R$ ${saldoNegativo.toFixed(2)}`;
                    else elementoSaldoNegativo.textContent = `Saldo Negativo: R$ 0,00`;
    
                    const editarButton = document.getElementById('editar');
                    editarButton.addEventListener('click', () => {window.location.href = './upDataUser.html';});                    

                    await this.mostrarDebitos(idUsuario);
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
    
        document.getElementById("user-info").addEventListener("click", function() {
            var infoContainer = this.querySelector(".info-container");
            var downIcon = this.querySelector(".down-icon");
            infoContainer.classList.toggle("active");
            downIcon.classList.toggle("up");
        });
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    Controller.fazerLogin();
    Controller.cadastrarPessoa();
    Controller.cadastrarDivida();
    Controller.editarPessoa();
    Controller.mostrarPessoas();
    Controller.mostrarTodosCreditos();
    Controller.mostrarTodosDebitos();
    Controller.afterLogin();
    Controller.mostrarDividas();
    Controller.listarPessoasDropDawn();
});
