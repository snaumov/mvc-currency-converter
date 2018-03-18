export class Widget {
    constructor(widgetModel, widgetController) {
        this.widget = document.createElement('div');
        this.widget.innerHTML =
            `<div class="widget">
                <h3>Currency Converter</h3>
                <form class="widget__form">
                    <span class="widget__input"><input value='0' /><select></select></span>
                    <span class="widget__input"><input value='0' /><select></select></span>
                </form>
            </div>`;
        const [firstInput, secondInput] = this.widget.getElementsByTagName('input');
        const [firstSelect, secondSelect] = this.widget.getElementsByTagName('select');
        this.firstInput = firstInput;
        this.secondInput = secondInput;
        this.firstSelect = firstSelect;
        this.secondSelect = secondSelect;
        this.firstInput.addEventListener('input', e => widgetController.handleInputChange('from', Number(e.target.value)));
        this.secondInput.addEventListener('input', e => widgetController.handleInputChange('to', Number(e.target.value)));
        this.firstSelect.addEventListener('change', e => widgetController.handleSelectChange('from', e.target.value));
        this.secondSelect.addEventListener('change', e => widgetController.handleSelectChange('to', e.target.value));
        this.currencies = widgetModel.data.currencies;
        this.render = this.render.bind(this);
        widgetModel.addSubscriber(this.render);
    }

    render(data = {}) {
        if (data.currencies && (this.currencies.length !== data.currencies.length)) {
            data.currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.innerHTML = `<option value="${currency}">${currency}</option>`;
                const option2 = document.createElement('option');
                option2.innerHTML = `<option value="${currency}">${currency}</option>`;
                this.firstSelect.appendChild(option1);
                this.secondSelect.appendChild(option2);
            });
        }
        this.firstInput.value = data.fromAmount || 0;
        this.secondInput.value = data.toAmount || 0;
        this.firstSelect.value = data.from;
        this.secondSelect.value = data.to;
        return this.widget;
    }
}