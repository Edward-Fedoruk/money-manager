const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('myFile'), async (req, res) => {
    try {
        const MoneyManagerConverter = require('./MoneyManagerConverter');
        const SheetsConverter = require('./SheetsConverter');

        const moneyManagerConverter = new MoneyManagerConverter();
        const sheetsConverter = new SheetsConverter()
        const proccessedFileName = await sheetsConverter.extractPrivateData(req.file.buffer)
            .then(privateRows => {
                const moneyManagerModel = privateRows.map(r => moneyManagerConverter.convertRow(r))
                return sheetsConverter.convertModelToMoneyManagerData(moneyManagerModel)
            })
        const filePath = path.join(__dirname, 'uploads', proccessedFileName);

        res.setHeader('Content-Disposition', `attachment; filename="${proccessedFileName}"`);
        res.setHeader('Content-Type', 'text/tab-separated-values');;
        res.sendFile(filePath, err => {
            if (err) {
                console.log(err);
                res.status(500).send('Error downloading the file');
            } else {
                fs.unlinkSync(filePath);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during file upload.');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


