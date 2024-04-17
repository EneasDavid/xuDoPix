import mongoose from "mongoose";

const dividaSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    devedor: { type: mongoose.Schema.Types.ObjectId, ref: "pessoas", required: true },
    fiador: { type: mongoose.Schema.Types.ObjectId, ref: "pessoas", required: true },
    valor: { type: Number, required: true },
    status: { type: Boolean, default: false },
    dataCriacao: { type: Date, default: Date.now },
}, { versionKey: false });

const dividaModel = mongoose.model("dividas", dividaSchema);
export default dividaModel;
