const api = require('./api-bcb')
const axios = require('axios')
const { application } = require('express')

jest.mock('axios')

test ('getCotacao', ()=>{
    const res = {
        data: {
            value: [{
                cotacaoVenda: 3.90
            }]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url').then(resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('getExtractCotacao', () => {
    const res = {
        data: {
            value: [{
                cotacaoVenda: 3.90
            }]
        }
    }
    const cotacao = api.extractCotacao(res)
    expect(cotacao).toBe(3.90)
})

describe ('getToday', () => {

    const RealDate = Date
    
    function mockDate (date){
        global.Date = class extends RealDate {
            constructor (){
                return new RealDate(date)
            }
        }
    }

    afterEach(()=>{
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2022-01-01T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('1-1-2022')
    })
})

test('getUrl', () => {
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () => {
    const getToday = jest.fn()
    const getUrl = jest.fn()
    const getCotacaoAPI = jest.fn()
    const extractCotacao = jest.fn()
    getToday.mockReturnValue('01-01-2022')
    getUrl.mockReturnValue('url')
    getCotacaoAPI.mockResolvedValue({
        data: {
            value: [{
                cotacaoVenda: 3.90
            }]
        }
    })
    extractCotacao.mockReturnValue(3.90)
    api.pure
    .getCotacao({getToday, getUrl, getCotacaoAPI,extractCotacao}) () 
    .then( res => {
        expect(res).toBe(3.9)
    })
    

})

test('getCotacao', () => {
    const getToday = jest.fn()
    const getUrl = jest.fn()
    const getCotacaoAPI = jest.fn()
    const extractCotacao = jest.fn()
    getToday.mockReturnValue('01-01-2022')
    getUrl.mockReturnValue('url')
    getCotacaoAPI.mockResolvedValue(Promise.reject('err'))
    extractCotacao.mockReturnValue(3.90)
    api.pure
    .getCotacao({getToday, getUrl, getCotacaoAPI,extractCotacao}) () 
    .then( res => {
        expect(res).toBe('')
    })
    

})