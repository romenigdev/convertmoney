const axios  = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    const realDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    return realDate
}

const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async() => {
    try{
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao

    }catch(err){
        console.log('ERRO > '+err)
        return ''
    }
}

module.exports = {
    getCotacaoAPI,
    extractCotacao,
    getUrl,
    getToday,
    getCotacao: getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao}),
    pure: {
        getCotacao
    }
}