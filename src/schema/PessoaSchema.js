import { Double } from "mongodb";
import mongoose from "mongoose";

const pessoaSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    senha: { type: String, required: true },
    saldoNegativo: { type: Double },
    saldoPositivo: { type: Double }
}, { versionKey: false });

const pessoa = mongoose.model("pessoas", pessoaSchema);
export default pessoa;