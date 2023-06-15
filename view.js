class MainPage {
  constructor() {
	let avialable_currencies = ["USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG",
    "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN",
    "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNH", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK",
	"DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP",
    "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK",
    "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR",
	"LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
	"NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD",
    "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "STN", "SVC", "SYP",
    "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES",
    "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "YER", "ZAR", "ZMW", "ZWL"];
	
	clearBody();
	
    this.currencies = avialable_currencies;
    this.createCurrencySelect();
    this.createNextButton();
    this.createPageContainer();
  }
  
  createCurrencySelect() {
    this.currencySelect = document.createElement('select');
    for (let i = 0; i < this.currencies.length; i++) {
      const currencyOption = document.createElement('option');
      currencyOption.value = this.currencies[i];
      currencyOption.innerText = this.currencies[i];
      this.currencySelect.appendChild(currencyOption);
    }
  }
  
  createNextButton() {
    this.nextButton = document.createElement('button');
    this.nextButton.innerText = 'Далее';
    this.nextButton.addEventListener('click', () => {
      const selectedCurrency = this.currencySelect.value;
      const ratesTable = new ExchangeRatesTable(selectedCurrency);
	  ratesTable.generateTable();
    });
  }
  
  createPageContainer() {
    this.pageContainer = document.createElement('div');
    this.pageContainer.appendChild(document.createElement('p')).innerText = 'Выберите валюту:';
    this.pageContainer.appendChild(this.currencySelect);
    this.pageContainer.appendChild(document.createElement('br'));
	this.pageContainer.appendChild(document.createElement('br'));
    this.pageContainer.appendChild(this.nextButton);
    document.body.appendChild(this.pageContainer);
  }
}


class ExchangeRatesTable {
  constructor(baseCurrency) {
    clearBody();
    this.baseCurrency = baseCurrency;
    this.rateContainer = document.createElement('div');
    this.rateContainer.setAttribute('id', 'rate-container');
    document.body.appendChild(this.rateContainer);
  }

  generateTable() {
    const table = document.createElement('table');
    table.setAttribute('border', '3px');

    const exchangeRates = getAllExchangeRates(this.baseCurrency);

    const header = table.createTHead();
    const row = header.insertRow();
    const headers = ['Currency', 'Exchange Rate'];

    headers.forEach((headerText) => {
      const headerRow = document.createElement('th');
      const textNode = document.createTextNode(headerText);
      headerRow.appendChild(textNode);
      row.appendChild(headerRow);
    });

    const tBody = table.createTBody();

    let sortedCurrencies = Object.keys(exchangeRates);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'sort-alphabetically';
    checkbox.addEventListener('click', () => {
		if (checkbox.checked) {
			let sortedExchangeRates = Object.entries(exchangeRates).sort((a, b) => b[1] - a[1]);
			sortedCurrencies = sortedExchangeRates.map(i => i[0]);
		} else {
			sortedCurrencies = sortedCurrencies.sort();
		}
      this.updateTable(tBody, sortedCurrencies, exchangeRates);
    });

    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'sort-alphabetically';
    checkboxLabel.textContent = 'Сортировать по значению';

    this.rateContainer.appendChild(checkbox);
    this.rateContainer.appendChild(checkboxLabel);

    this.updateTable(tBody, sortedCurrencies, exchangeRates);

    this.rateContainer.appendChild(table);
  }

  updateTable(tBody, sortedCurrencies, exchangeRates) {
    tBody.innerHTML = '';

    sortedCurrencies.forEach((currency) => {
      const row = tBody.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      cell1.textContent = currency;
      cell2.textContent = exchangeRates[currency];
    });
  }
}


function clearBody(){
	const body = document.getElementsByTagName('body')[0];
	while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
}


//просто main функция для красоты
(function(){
	const nameInput = document.getElementById('name-input');
	const nextButton = document.getElementById('next-button');

	nextButton.addEventListener('click', function() {
		const userName = nameInput.value;
		document.title = `Привет, ${userName}!`;
		new MainPage();
    });
}());

//const exchangeRatesTable = new ExchangeRatesTable('USD');
//exchangeRatesTable.generateTable();