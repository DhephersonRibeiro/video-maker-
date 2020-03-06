const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia').API_KEY

async function robot(content){
    console.log(`\n\t\t 🤖 \tBeep Beep\t 🤖\n\n Buscando Informações sobre : \"${content.PrefixTerm} ${content.searchTerm}\"\n`)
    await fetchContentFromWikipedia(content)//baixar o texto!!
    //sanitizedContent(content) // limpar o texto!!
    //breakContentIntoSentences(content) // quebrar o texto em sequencias!!
    
    async function fetchContentFromWikipedia(content){
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
        var contentInput = {
            "articleName": content.searchTerm,
            "lang": content.langPreference
        }
        const wikipediaResponse = await wikipediaAlgorithm.pipe(contentInput);
        const wikipediaContent = wikipediaResponse.get()
        console.log(wikipediaContent)
    }
}
module.exports = robot