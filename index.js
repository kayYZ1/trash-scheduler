const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");

function getLatestPDF(directory) {
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".pdf"))
    .map((file) => ({
      file,
      time: fs.statSync(path.join(directory, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  return files.length > 0 ? path.join(directory, files[0].file) : null;
}

function parseNumbers(text) {
  if (!text) return [];
  return text
    .split(/[,\s]+/)
    .map((n) => parseInt(n))
    .filter(Number.isInteger);
}

const pdfDirectory = "cypress/downloads";
const pdfPath = getLatestPDF(pdfDirectory);

if (!pdfPath) {
  console.error("No PDF file found in the directory!");
  process.exit(1);
}

function extractSchedule(pdfPath) {
  let pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error("Error:", errData.parserError),
  );

  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    let extractedText = {};
    let currentMonth = "";

    pdfData.Pages.forEach((page) => {
      let lines = page.Texts.map((textObj) =>
        decodeURIComponent(textObj.R[0].T),
      );

      if (lines.includes("ZAWADA, OSIEDLE ZAWADA")) {
        const months = [
          "KWIECIEŃ",
          "MAJ",
          "CZERWIEC",
          "LIPIEC",
          "SIERPIEŃ",
          "WRZESIEŃ",
          "PAŹDZIERNIK",
          "LISTOPAD",
          "GRUDZIEŃ",
          "STYCZEŃ",
          "LUTY",
          "MARZEC",
        ];

        let structuredLines = [];
        let tempRow = [];

        lines.forEach((text, index) => {
          if (months.includes(text)) {
            if (tempRow.length) structuredLines.push(tempRow);
            tempRow = [text];
          } else {
            tempRow.push(text);
          }

          if (index === lines.length - 1 && tempRow.length) {
            structuredLines.push(tempRow);
          }
        });

        structuredLines = structuredLines
          .filter((row) => row.length >= 6)
          .map((row) => row.slice(0, 6));

        structuredLines.forEach((row) => {
          let month = row[0].toLowerCase();

          if (months.map((m) => m.toLowerCase()).includes(month)) {
            currentMonth = month;
            extractedText[currentMonth] = {
              czarne: [],
              zolte: [],
              zielone: [],
              niebieskie: [],
              brazowe: [],
            };
          }

          if (row.length === 6) {
            let [_, czarne, zolte, zielone, niebieskie, brazowe] = row;

            extractedText[currentMonth] = {
              czarne: parseNumbers(czarne),
              zolte: parseNumbers(zolte),
              zielone: parseNumbers(zielone),
              niebieskie: parseNumbers(niebieskie),
              brazowe: parseNumbers(brazowe),
            };
          }
        });
      }
    });

    console.log(JSON.stringify(extractedText, null, 2));
  });

  pdfParser.loadPDF(pdfPath);
}

extractSchedule(pdfPath);
