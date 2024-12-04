const XLSX = require("xlsx");
const fs = require('fs/promises');

class SheetsConverter {

    async #getPrivateXLSX (file) {
        const workbook = XLSX.read(file);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const privateRawData = XLSX.utils.sheet_to_json(sheet, {header: 1});

        return privateRawData
    }

    #transformPrivateRows (privateRows) {
        const removeTitleRow = (rs) => rs.slice(2);
         
        return removeTitleRow(privateRows)
        .map(([date, category, card, description, moneyWithSigne, currency, money]) => {
            return {
                date,
                money,
                category,
                card,
                description,
                moneyWithSigne,
                currency
            }
        })
    }

    async extractPrivateData (filename) {
        const privateRows = await this.#getPrivateXLSX(filename);
        return this.#transformPrivateRows(privateRows);
    }

    async convertModelToMoneyManagerData (modelRows) {
        const columns = Object.keys(modelRows[0])
        const rows = modelRows.map((row) => Object.values(row))
        const tsvData = [columns, ...rows].map(row => row.join('\t')).join('\n');
        const fileName = 'moneyManagerSheet' + new Date().toLocaleString('nl') + '.tsv'
        await fs.writeFile('./uploads/' + fileName, tsvData);
        return fileName
    }

}

module.exports = SheetsConverter
