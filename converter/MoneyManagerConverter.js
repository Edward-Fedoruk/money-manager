class MoneyManagerConverter {
    constructor() {}

    #PRIVATE_CATEGORY_TO_MONEY_MANAGER_MAP = {
      'Restaurants, cafes, bars': ['🍜 Food', 'Eating out'],
      'Pharmacies': ['🧘🏼 Health', 'Medicine'],
      'Supermarkets and groceries': ['🍜 Food', 'Supermarket'],
      'Payments by details': ['Other'],
      'Entertainment': ['🚲 Entertainment'],
      'Transfers': [null],
      'Medical services': ['🧘🏼 Health', 'Medicine'],
      'Taxi': ['🚖 Transport', 'Taxi'],
      'Beauty': ['💄 Beauty', 'Hairdresse'],
      'Enrollment': ['💰 Salary'],
      'Services': ['Other'],
      'Education': ['📙 Education'],
      'Tourism': ['Other'],
      'Transfer crediting': ['Other'],
      'Cash withdrawal': [null],
      'Books and stationery': ['📙 Education'],
      'Digital goods': ['Other'],
      'Transfer to my card': [null],
      'Home and repair': ['🪑 Household', 'Appliances'],
      'Watches and jewelry': ['Other'],
      'Other': ['Other'],
      'Utilities and Internet': ['🪑 Household', 'The Internet'],
      'Savings': [null],
      'Mobile top-up': ['Other'],
      'Flowers': ['🎁 Gift'],
      'Cinema': ['🚲 Entertainment'],
      'Budget payments': ['Other'],
      'Clothes and shoes': ['🧥 Apparel'],
      'Restaurants, cafes, bar': ['🍜 food', 'Eating out']
    }

    mapCategoryToCategoryKey (category) {
        const categoryWithoutLastComma = category[category.length - 1] === ',' ? category.slice(0, category.length - 1) : category;
        return categoryWithoutLastComma;
    }

    convertDate (inputDate) {
        const [datePart, timePart] = inputDate.split(' ');

        const [day, month, year] = datePart.split('.');

        const date = new Date(`${year}-${month}-${day}T${timePart}`);

        const padZero = (num) => num.toString().padStart(2, '0');

        const formattedMonth = padZero(date.getMonth() + 1);
        const formattedDay = padZero(date.getDate());
        const formattedYear = date.getFullYear();
        const formattedHours = padZero(date.getHours());
        const formattedMinutes = padZero(date.getMinutes());
        const formattedSeconds = padZero(date.getSeconds());

        return `${formattedMonth}/${formattedDay}/${formattedYear} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    convertMoneyAmount (money) {
        return money;
    }

    incomeExpenseType (money) {
       return money < 0 ? 'Expense' : 'Income';
    }

    convertCurrency (currency) {
        return currency
    }

    convertCategory (category) {
        const moneyManagerCategory = this.#PRIVATE_CATEGORY_TO_MONEY_MANAGER_MAP[this.mapCategoryToCategoryKey(category)] ?? [null]

        return moneyManagerCategory
    }

    convertDescriptionToNote  (description, additionalNot = '') { return `${description} ${additionalNot}` }

    convertRow (row) {
        const dateColumn = this.convertDate(row.date)
        const accountColumn = this.addAccount()
        const [categoryColumn, subCategoryColumn] = this.convertCategory(row.category)
        const noteColumn = this.convertDescriptionToNote(row.description, categoryColumn === null ? 'SHOULD RECHECK TRANSACTION' : '')
        const amountColumn = this.convertMoneyAmount(row.money)
        const currencyColumn = this.convertCurrency(row.currency)
        const accountAmountColumn = this.convertMoneyAmount(row.money)
        const typeColumn = this.incomeExpenseType(row.moneyWithSigne)

        return {
            'Date': dateColumn,
            'Account': accountColumn,
            'Category': categoryColumn,
            'Subcategory':subCategoryColumn,
            'Note': noteColumn,
            'UAH': amountColumn,
            'Income/Expense': typeColumn,
            'Description': '',
            'Amount': accountAmountColumn,
            'Currency': currencyColumn,
        }
    }

    addAccount () {
        return 'Private universal'
    }
}

module.exports = MoneyManagerConverter
