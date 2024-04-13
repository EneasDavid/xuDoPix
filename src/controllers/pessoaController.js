import Pessoa from '../models/PessoaSchema.js'

class PessoaController{
    static async criarPessoa(req,res){
        try{
            const novaPessoa = await Pessoa.create(req.body);
            res.status(201).json({message: "Usuário criado com sucesso", pessoa: novaPessoa});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Falha ao criar usuário`});
        }
    }

    static async listarPessoas(req,res){
        try{
            const geral = await Pessoa.find({});
            res.status(200).json(geral); 

        }catch(erro){
            res.status(500).json({message: `${erro.message} - Não foi pssível listar os usuários`});
        }
    }

    static async listarPessoaPorId(req,res){
        try{
            const id = req.params.id;
            const pessoaEncontrada = await Pessoa.findById(id);
            res.status(200).json(pessoaEncontrada);
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Não foi possível encontrar o usuário`});
        }
    }

    static async atualizarPessoa(req,res){
        try{
            const id = req.params.id;
            await Pessoa.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Usuário atualizado"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Erro ao efeturar atualização`});
        }
    }

    static async deletarPessoa(req,res){
        try{
            const id = req.params.id;
            await Pessoa.findByIdAndDelete(id);
            res.status(200).json({message: "Usuário deletado"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Erro ao deletar usuário`});
        }
    }
}