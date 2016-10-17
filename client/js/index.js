var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

var tbody = document.querySelector('table tbody');

var form = document.querySelector('.form');

form.addEventListener('submit', function(event){

    let n1 = new Negociacao(new Date(), 5, 700);

    event.preventDefault();

    var tr = document.createElement('tr');

    campos.forEach(function(campo){
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume);

    tbody.appendChild(tr);

    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();
});
// let cria variáveis com escopo de bloco
let n1 = new Negociacao(new Date(), 5, 700);
n1._quantidade = 100000;

console.log(n1.data);
console.log(n1.quantidade);
console.log(n1.valor);
console.log(n1.volume);

for(let i = 0; i <= 100; i++){
    console.log(i);
}
