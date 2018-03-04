export class Model {
    constructor() {
        this.subscribers = [];
        this.data = {
            'rub': 0,
            'usd': 0
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