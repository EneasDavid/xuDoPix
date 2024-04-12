import { Double } from "mongodb";
import mongoose from "mongoose";


const dividaSchema = new mongoose.Schema({
    devedor: { type: mongoose.Schema.Types.ObjectId, ref: "pessoas", required:true },
    fiador: { type: mongoose.Schema.Types.ObjectId, ref: "pessoas", required:true },
    valor: { type: Double, required:true },
    dataCriacao: { type: Date,default: Date.now },
}, { versionKey: false });

const divida = mongoose.model("dividas", dividaSchema);
export default divida;
