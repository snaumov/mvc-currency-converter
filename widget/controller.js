const baseApi = 'https://api.fixer.io/latest?base=';
const RUB = 'RUB';
const USD = 'USD';

export class Controller {
    constructor(model) {
        this.model = model;
    }

    fetchData(baseCurrency, currencyAmount) {
        return new Promise((res) => {
            if(baseCurrency === RUB) {
                fetch(`${baseApi}${baseCurrency}&symbols=${USD}`)
                    .then(res => res.json())
                    .then(data => res({[USD]: data.rates[USD] * currencyAmount}));
            }
            else {
                fetch(`${baseApi}${baseCurrency}&symbols=${RUB}`)
                    .then(res => res.json())
                    .then(data => res({[RUB]: data.rates[RUB] * currencyAmount}))
            }
        })
    }

    handleChange(currency, newAmount) {
        this.fetchData(currency, newAmount)
            .then((data) => this.model.updateData({[currency]: newAmount, ...data}))
    }
}