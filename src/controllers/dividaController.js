import Pessoa from "../models/PessoaSchema.js";
import Divida from "../models/DividaSchema.js";

class DividaController{
    static async criarDivida(req,res){
        try{
            const novaDivida = await Divida.create(req.body);
            res.status(201).json({message: "Divida criada com sucesso", divida: novaDivida});
        }catch(erro){
            res.status(500).json({message: `$ {erro.message} - Falha ao crirar divida`});
        }
    }

    static async listarDividas(req,res){
        try{
            const id = req.params.id;
            const dividas = await Divida.fin({ pessoa: id});
            res.status(200).json(dividas);
        }catch(erro){   
            res.status(500).json({message: `$ {erro.message} - Falha na listagem de dividas`}); 
        }
    }

    static async atualizarDivida(req,res){
        try{
            const id = req.paras.id;
            await Divida.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Divida atualizada"});
        }catch(erro){
            res.status(500).json({message: `$ {erro.message} - Erro ao atualizar divida`}); 
        }
    }

    static async deletarDivida(req,res){
        try{
            const id = req.params.id;
            await Divida.findByIdAndDelete(id);
            res.status(200).json({message: "Divida deletada"});
        }catch(erro){
            res.status(500).json({message: `$ {erro.message} - Falha na listagem de dividas`}); 
        }
    }

    static async pagarDivida(req, res){
        try {
            const { id, valorPagamento } = req.body;
            const divida = await Divida.findById(id); 
            if (!divida) {
                return res.status(404).json({ message: "Divida não encontrada" });
            }

            divida.valor -= valorPagamento;
            await divida.save();
    
            await Pessoa.findByIdAndUpdate(divida.devedor, { $inc: { saldoNegativo: -valorPagamento } }); 
            await Pessoa.findByIdAndUpdate(divida.fiador, { $inc: { saldoPositivo: valorPagamento } }); 
    
            res.status(200).json({ message: "Divida paga com sucesso" });
        } catch (erro){
            res.status(500).json({ message: `${erro.message} - Falha ao pagar divida` });
        }
    }
}