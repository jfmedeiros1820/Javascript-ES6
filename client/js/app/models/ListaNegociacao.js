"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaNegociacao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("ListaNegociacao", ListaNegociacao = function () {
                function ListaNegociacao() {
                    _classCallCheck(this, ListaNegociacao);

                    this._negociacoes = [];
                }

                _createClass(ListaNegociacao, [{
                    key: "adiciona",
                    value: function adiciona(negociacao) {
                        this._negociacoes.push(negociacao);
                    }
                }, {
                    key: "esvazia",
                    value: function esvazia() {
                        this._negociacoes = [];
                    }
                }, {
                    key: "ordena",
                    value: function ordena(criterio) {
                        this._negociacoes.sort(criterio);
                    }
                }, {
                    key: "inverteOrdem",
                    value: function inverteOrdem() {
                        this._negociacoes.reverse();
                    }
                }, {
                    key: "negociacao",
                    get: function get() {
                        return [].concat(this._negociacoes);
                    }
                }, {
                    key: "volumeTotal",
                    get: function get() {
                        return this._negociacoes.reduce(function (total, n) {
                            return total + n.volume;
                        }, 0.0);
                    }
                }]);

                return ListaNegociacao;
            }());

            _export("ListaNegociacao", ListaNegociacao);
        }
    };
});
//# sourceMappingURL=ListaNegociacao.js.map