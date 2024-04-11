async function conectaNaDatabase() {
    mongoose.connect("mongodb+srv://admin:def@cluster0.uvmwiwx.mongodb.net/livraria?retryWrites=true&w=majority");
    return mongoose.connection;
}

export default conectaNaDatabase;