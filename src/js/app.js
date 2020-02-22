/* eslint-disable class-methods-use-this */
class Widget {
  constructor(url) {
    this.url = url;
  }

  DOMInit() {
    const elWidget = document.createElement('div');
    elWidget.id = 'widget';
    elWidget.innerHTML = `
      <ul class="widget-list">
      </ul>
    `;
    document.body.appendChild(elWidget);
  }

  init() {
    this.DOMInit();
    this.widgetList = document.querySelector('.widget-list');
    this.events();
  }

  addMsg(message) {
    const {
      field, msg, date, id,
    } = JSON.parse(message);
    this.itemMesage = document.createElement('li');
    this.itemMesage.className = 'li-msg';
    this.itemMesage.dataset.id = id;
    this.itemMesage.innerHTML = `
    <span class="${field} img-action"></span>
    <div class="block-msg">
    <span class="item-date">${this.printData(date)}</span>
    <p class="item-msg">${msg}</p>
    </div>
    `;
    console.log(this.widgetList);
    this.widgetList.appendChild(this.itemMesage);
  }

  events() {
    // http://localhost:7070/sse
    const eventSource = new EventSource(this.url);

    eventSource.addEventListener('open', (evt) => {
      console.log(evt);
      console.log('connected');
    });

    eventSource.addEventListener('error', (evt) => {
      console.log(evt);
      console.log('error');
    });

    eventSource.addEventListener('comment', (evt) => {
      this.addMsg(evt.data);
      console.log(evt.data);
    });
  }

  printData(valueDate) {
    const itemDate = new Date(valueDate);
    const date = this.convertDate(itemDate.getDate());
    const month = this.convertDate(itemDate.getMonth() + 1);
    const year = this.convertDate(itemDate.getFullYear());
    const hours = this.convertDate(itemDate.getHours());
    const minut = this.convertDate(itemDate.getMinutes());
    const second = this.convertDate(itemDate.getSeconds());
    const itemCreated = `${hours}:${minut}:${second} ${date}.${month}.${year}`;
    return itemCreated;
  }

  convertDate(value) {
    const rValue = value < 10 ? `0${value}` : value;
    return rValue;
  }
}

const testW = new Widget('https://ahj-8-1-1.herokuapp.com/sse');
testW.init();
