const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia').API_KEY
const sentenceBoundaryDetection = require('sbd')
async function robot(content){
    console.log(`\n\t\t 🤖 \tBeep Beep\t 🤖\n\n Buscando Informações sobre : \"${content.PrefixTerm} ${content.searchTerm}\"\n`)
    await fetchContentFromWikipedia(content)
    sanitizedContent(content)
    breakContentIntoSentences(content) 
    
    async function fetchContentFromWikipedia(content){
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
        var contentInput = {
            "articleName": content.searchTerm,
            "lang": content.langPreference
        }
        const wikipediaResponse = await wikipediaAlgorithm.pipe(contentInput);
        const wikipediaContent = wikipediaResponse.get()
        
        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizedContent(content){
        const withoutBlankLinesAndMardown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMardown)
        
        content.sourceContentSanitized = withoutDatesInParentheses

        function removeBlankLinesAndMarkdown(text){
            const allLines = text.split('\n');
            
            const withoutBlankLinesAndMardown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')){
                    return false
                }
                return true
            })
            return withoutBlankLinesAndMardown.join(' ')
        }

        function removeDatesInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
          }
    }
    function breakContentIntoSentences(content){
        content.sentences = []

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence)=> {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: [],
            })
        })
    }
    
}
//no caso eu teria que utilizar um try catch
module.exports = robot