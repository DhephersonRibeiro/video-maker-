const readline = require('readline-sync');

function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm();
    content.PrefixTerm = askAndReturnPrefixe();

    function askAndReturnSearchTerm(){
        
        return readline.question('\nInsira um termo para ser pesquisado na Wikipédia : ');
    }
    function askAndReturnPrefixe(){
        prefixes = ['quem é','o que é','a historia de '];
        const selectedPrefixedIndex = readline.keyInSelect(prefixes,' escolha uma opção :')
        const selectedPrefixedText = prefixes[selectedPrefixedIndex]

    return selectedPrefixedText;
    }
    console.log(`\n\t\t 🤖 \tBeep Beep\t 🤖\n\n Buscando Informações sobre : \"${content.PrefixTerm} ${content.searchTerm}\"\n`)
}

start();