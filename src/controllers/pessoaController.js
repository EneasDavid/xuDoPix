static async listarLivroPorId(req, res) {
    try {
        const id = req.params.id; // Pega o ID do link
        const livroEncontrado = await Livro.findById(id); // Usa o método do mongoose para procurar o livro usando o id
        res.status(200).json(livroEncontrado); // Retorna o livro encontrado
    } catch (erro) {
        res.status(500).send({ message: `${erro.message} - falha na requisição do livro` });
    }
}

static async cadastrarLivro(req, res) {
    try {
        const novoLivro = await Livro.create(req.body); // Pegando as informações do body da requisição para gerar um novo livro usando o Livro.create
        res.status(201).json({ message: "Livro criado com sucesso", livro: novoLivro });
    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - Falha ao cadastrar o Livro` });
    }
}

static async atualizarLivro(req, res) {
    try {
        const id = req.params.id;
        await Livro.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Livro atualizado" });
    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - Erro ao atualizar o livro` });
    }
}