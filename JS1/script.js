// Função para criar uma tabela
function createTable(tableIndex) {
    // document.write("<h3>Tabela " + tableIndex + "</h3>");
    document.write("<table>");
    // Cabeçalho da tabela
    document.write("<tr><th colspan='2'>Produtos de: " + tableIndex + " </th></tr>");
    // Corpo da tabela
    for (var i = 1; i <= 11; i++) {
        document.write("<tr>");
        document.write("<td>"+ tableIndex +"x" + (i - 1) + "</td>");
        document.write("<td>" + (tableIndex*(i-1)) + "</td>");
        document.write("</tr>");
    }
    document.write("</table>");
}
document.write("<div>");
// Criar as 10 tabelas
for (var i = 1; i <= 10; i++) {
    createTable(i);
}

document.write("</div>");
