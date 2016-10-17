class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacao = new Bind(new ListaNegociacao(), new NegociacoesView($('#negociacoesView')), 'adiciona','esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';
    }

    adiciona(event){
        
        event.preventDefault();
        this._listaNegociacao.adiciona(this._criaNegociacao())
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaCampos();
    }

    importaNegociacoes(){
        let service = new NegociacaoService();

        service
            .obterNegociacoes()
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacao.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga(){

        this._listaNegociacao.esvazia();
        this._mensagem.texto = 'Negociações limpas com sucesso';
    }

    ordena(coluna){
        if(this._ordemAtual == coluna) {
            this._listaNegociacao.inverteOrdem();
        } else {
            this._listaNegociacao.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _limpaCampos(){

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    _criaNegociacao(){
        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value);
    }
}