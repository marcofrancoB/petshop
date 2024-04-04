function registrarServico() {
    var servico = document.getElementById("servico").value;
    var valor = parseFloat(document.getElementById("valor").value);
    var categoria = document.getElementById("categoria").value;

    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, insira um valor numérico válido para o valor em R$.");
        return;
    }
    
    var servicos = JSON.parse(localStorage.getItem("servicos")) || [];
    servicos.push({ servico: servico, valor: valor, categoria: categoria });
    
    localStorage.setItem("servicos", JSON.stringify(servicos));
    
    alert("Serviço registrado com sucesso!");
    
    console.log("Serviço registrado com sucesso.");
}

function gerarRelatorio() {
    var servicos = JSON.parse(localStorage.getItem("servicos")) || [];
    var divRelatorio = document.getElementById("relatorio");
    divRelatorio.innerHTML = "<h2>Relatório</h2>";
    
    if (servicos.length > 0) {
        var categorias = {};
        servicos.forEach(function(servico, index) {
            if (!categorias[servico.categoria]) {
                categorias[servico.categoria] = [];
            }
            categorias[servico.categoria].push({ index: index, servico: servico });
        });
        var relatorio = "";
        for (var categoria in categorias) {
            relatorio += "<h3>" + categoria + "</h3><ul>";
            categorias[categoria].forEach(function(item) {
                relatorio += "<li class='service-item'>" + item.servico.servico + " - R$ " + (item.servico.valor ? item.servico.valor.toFixed(2) : "0.00") +
                    " <button class='delete-button' onclick='excluirServico(" + item.index + ")'>Excluir</button></li>";
            });
            relatorio += "</ul>";
        }
        divRelatorio.innerHTML += "<div class='blue-report'>" + relatorio + "</div>";
    } else {
        divRelatorio.innerHTML += "<p>Nenhum serviço registrado ainda.</p>";
    }
}

function limparRelatorio() {
    var divRelatorio = document.getElementById("relatorio");
    divRelatorio.innerHTML = "";
}

function excluirServico(index) {
    var servicos = JSON.parse(localStorage.getItem("servicos")) || [];
    servicos.splice(index, 1);
    localStorage.setItem("servicos", JSON.stringify(servicos));
    gerarRelatorio();
    alert("Serviço excluído com sucesso!");
}