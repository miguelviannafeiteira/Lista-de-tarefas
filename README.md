Tecnologias utilizadas
 -  React.js
  - JavaScript
  - SASS como pré-processador de CSS
  - HTML
  - clsx lib
  - beautiful drag and drop lib

Nesse projeto criei uma aplicação web que serve como uma lista de tarefas.
A lista de tarefas tem dois temas, o dark e o light, no qual utilizei o hook useState e a lib
clsx para mudar dinamicamente a class do site. Como não possuo API
para este projeto utilizei o localstorage para armazenar as tarefas adicionadas,
e cada item da lista pode ser excluído individualmente, pode ser marcado como concluído
clicando no input, podem ser filtrados entre os que não foram feitos e os que já foram,
e esse que já foram feitos podem ser excluídos com o botão clear completed.
Para criação do formulário de adição da tarefa ao localstorage, utilizei o
hook pessoal useform e o componente input.
Os itens da lista podem ser arrastados para assim mudar a posição na lista e para isso
usei a  lib drag and drop.
