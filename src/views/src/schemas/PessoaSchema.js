import mongoose from "mongoose";

const pessoaSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId },
    cpf: { type: String, required: true },
    nome: { type: String, required: true },
    senha: { type: String, required: true },
}, { versionKey: false });

const pessoaModel = mongoose.model("pessoas", pessoaSchema);
export default pessoaModel;