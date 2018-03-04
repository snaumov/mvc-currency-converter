export class Widget {
    constructor(widgetModel, widgetController) {
        this.widgetController = widgetController;
        this.widget = document.createElement('div');
        this.widget.innerHTML =
            `<div class="widget">
                <h3>Currency Converter</h3>
                <form class="widget__form">
                    <span class="widget__input"><input id='rub' value='0' /><span>RUB</span></span>
                    <span class="widget__input"><input id='usd' value='0' /><span>USD</span></span>
                </form>
            </div>`;
        const [rubInput, usdInput] = this.widget.getElementsByTagName('input');
        this.rubInput = rubInput;
        this.usdInput = usdInput;
        this.rubInput.addEventListener('input', e => this.widgetController.handleChange('RUB', Number(e.target.value)));
        this.usdInput.addEventListener('input', e => this.widgetController.handleChange('USD', Number(e.target.value)));
        this.render = this.render.bind(this);
        widgetModel.addSubscriber(this.render);
    }

    render(data = {}) {
        this.rubInput.value = data.RUB || 0;
        this.usdInput.value = data.USD || 0;
        return this.widget;
    }
}