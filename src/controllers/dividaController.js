import Divida from "../schemas/DividaSchema.js";

class DividaController{
    static async criarDivida(req,res){
        try{
            const novaDivida = await Divida.create(req.body);
            res.status(201).json({message: "Divida criada com sucesso", divida: novaDivida});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Falha ao crirar divida`});
        }
    }

    static async listarDividas(req,res){
        try{
            const dividas = await Divida.find({});
            res.status(200).json(dividas);
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Falha na listagem de dividas`});
        }
    }

    static async listarDividaPorId(req,res){
        try{
            const id = req.params.id;
            const dividas = await Divida.fin({ pessoa: id});
            res.status(200).json(dividas);
        }catch(erro){   
            res.status(500).json({message: `${erro.message} - Falha na listagem de dividas`}); 
        }
    }

    static async atualizarDivida(req,res){
        try{
            const id = req.params.id;
            await Divida.findByIdAndUpdate(id, req.body);    
            res.status(200).json({message: "Divida atualizada"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Erro ao atualizar divida`}); 
        }
    }

    static async deletarDivida(req,res){
        try{
            const id = req.params.id;
            await Divida.findByIdAndDelete(id);
            res.status(200).json({message: "Divida deletada"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - Falha na listagem de dividas`}); 
        }
    }
    /*
        @description: Método para pagar uma dívida atraves do ID
                    onde é verifiado se a dívida existe e se ela já foi paga
                    se a dívida existir e não estiver paga, atualiza-se o 
                    campo status para true
        @endpoint: /divida/:id
        @method: PUT
        @params: id
        @return: mensagem de sucesso ou erro
    */
    static async pagarDivida(req, res){
        try {
            const id = req.params.id;
            const divida = await Divida.findById(id);
            if (!divida) return res.status(404).json({ message: "Dívida não encontrada" });
            if (divida.status) return res.status(400).json({ message: "Esta dívida já foi paga" });    
            await Divida.findByIdAndUpdate(id, { status: true });
            res.status(200).json({ message: "Dívida está paga" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao pagar dívida` });
        }
    }
    }
export default DividaController;