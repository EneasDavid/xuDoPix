async function cadastrarPessoa(event){
    event.preventDefault(); 
    
    const formData = new FormData(document.getElementById('cadastro-form'));
    try {
        const response = await axios.post('http://localhost:3000/pessoa',{
            cpf:formData.get('cpf'),
            nome:formData.get('nome'),
            senha:formData.get('senha'),
    });
        alert('Usuário criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        alert('Erro ao criar usuário. Por favor, tente novamente mais tarde.');
    }
}
document.getElementById('cadastro-form').addEventListener('submit', cadastrarPessoa);
