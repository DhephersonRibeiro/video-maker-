const readline = require('readline-sync');
const robots = {
    text: require('./robots/text.js')
}
async function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm();
    content.langPreference = askAndReturnLangPreference();
    content.PrefixTerm = askAndReturnPrefixe();

    await robots.text(content)

    function askAndReturnSearchTerm(){
        
        return readline.question('\nInsira um termo para ser pesquisado na Wikipédia : ');
    }
    function askAndReturnLangPreference(){

        langs = ['en','pt'];
        const selectedLangIndex = readline.keyInSelect(langs,' escolha uma opção de lingua:')
        const selectedLangText = langs[selectedLangIndex]

    return selectedLangText;
    }
    function askAndReturnPrefixe(){
        prefixes = ['quem é','o que é','a historia de '];
        const selectedPrefixedIndex = readline.keyInSelect(prefixes,' escolha uma opção :')
        const selectedPrefixedText = prefixes[selectedPrefixedIndex]

    return selectedPrefixedText;
    }
    console.log(`\n\t\t\t 🤖\tBeep Beep\t🤖\n\n\n`)
}

start();