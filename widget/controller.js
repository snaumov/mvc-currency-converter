import {convertApi, allCurrenciesApi} from './constants';

export class Controller {
    constructor(model) {
        this.model = model;
    }

    init() {
        Promise.all([
            this.fetchCurrencies(),
            this.fetchRate(this.model.data.from, this.model.data.to)
        ])
            .then(([rates, rate]) => this.model.updateData({...this.model.data, currencies: Object.keys(rates), rate}));
    }

    fetchRate(from, to) {
        return new Promise((res) => {
            fetch(`${convertApi}${from}_${to}`)
                .then(data => data.json())
                .then(data => {res(data.results[`${from}_${to}`].val)})
        })
    }

    fetchCurrencies() {
        return new Promise((res) => {
            fetch(`${allCurrenciesApi}`)
                .then(res => res.json())
                .then(data => res(data.results))
        })
    }

    handleInputChange(input, newAmount) {
        if(input === 'from') {
            this.model.updateData({...this.model.data, fromAmount: newAmount, toAmount: newAmount * this.model.data.rate})
        }

        if(input === 'to') {
            this.model.updateData({...this.model.data, toAmount: newAmount, fromAmount: newAmount * (1 / this.model.data.rate)})
        }
    }

    handleSelectChange(select, newValue) {
        if(select === 'from') {
            this.fetchRate(newValue, this.model.data.to)
                .then(rate => this.model.updateData({...this.model.data, from: newValue, rate, toAmount: this.model.data.fromAmount * rate}));
        }

        if(select === 'to') {
            this.fetchRate(this.model.data.from, newValue)
                .then(rate => this.model.updateData({...this.model.data, to: newValue, rate, fromAmount: this.model.data.toAmount * (1 / rate)}));
        }
    }
}