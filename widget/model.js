export class Model {
    constructor() {
        this.subscribers = [];
        this.data = {
            'from': 'USD',
            'to': 'EUR',
            'fromAmount': 0,
            'toAmount': 0,
            'rate': 0,
            currencies: ['USD', 'EUR']
        };
    }

    addSubscriber(subscriber) {
        this.subscribers.push(subscriber);
    }

    notify() {
        this.subscribers.forEach(sub => sub(this.data));
    }

    updateData(newData) {
        this.data = newData;
        this.notify();
    }


}