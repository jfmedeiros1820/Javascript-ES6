class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacao = new Bind(new ListaNegociacao(), new NegociacoesView($('#negociacoesView')), 'adiciona','esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';

        this._service = new NegociacaoService();

        this._init();
    }

    _init(){

        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaNegociacao.adiciona(negociacao)))
            .catch(error => {
                console.log(error);
                this._mensagem.texto = error;
            });

        setInterval(() => {
            this.importaNegociacoes()
        }, 3000);
    }

    adiciona(event){
        
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacao.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaCampos();
            })
            .catch(erro => this._mensagem.texto = erro);

    }

    importaNegociacoes(){

        this._service
            .importa(this._listaNegociacao.negociacao)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacao.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga(){

        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacao.esvazia();
            })
            .catch(error => this._mensagem.texto = error);
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
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value));
    }
}