// PART 1
//
// Reading file with the account numbers generated by the machine
fs = require('fs');
let actualNumbers;

// A map that we are going to use to identify numbers later on;
const mapOfNumbers = {
  [
    ' _ '+
    '| |'+
    '|_|'] : 0,
  [
    '   '+
    '  |'+
    '  |'] : 1,
  [
    ' _ '+
    ' _|'+
    '|_ '] : 2,
  [
    ' _ '+
    ' _|'+
    ' _|'] : 3,
  [
    '   '+
    '|_|'+
    '  |'] : 4,
  [
    ' _ '+
    '|_ '+
    ' _|'] : 5,
  [
    ' _ '+
    '|_ '+
    '|_|'] : 6,
  [
    ' _ '+
    '  |'+
    '  |'] : 7,
  [
    ' _ '+
    '|_|'+
    '|_|'] : 8,
  [
    ' _ '+
    '|_|'+
    ' _|'] : 9,
    
}

// Reading the file to get details
async function readFile () {
  try {
    const response = await fs.promises.readFile('./account_numbers.txt', 'UTF-8');
    return response;
  } catch(err) {
    console.log(err);
  }
}
  

// Dividing up the account numbers and sending them off to parsing
async function dataHandler() {
  const fileData = await readFile();
  if (!fileData) return;

  // To remove the next line escape character for each line
  // This gives us all lines irrespective of whether it has spaces or not
  const arrayOfStrings = fileData.split("\n");
  const accountNumbers = [];

  // Going through each items of the array, but optimising it so it runs n/4 times rather n
  // Why n/4? Because the top three lines are actual number representations and the third line is blank
  for (let i = 0; i < arrayOfStrings.length - 3; i+=4) {
    // Picking first three characters from each of the first three lines to put side by side
    // This will be used for parsing later on
    const line1 = arrayOfStrings[i].match(/.../g);
    const line2 = arrayOfStrings[i+1].match(/.../g);
    const line3 = arrayOfStrings[i+2].match(/.../g);
    let num = '';
    for (let j = 0; j < line1.length; j++) {
      num = num + line1[j] + line2[j] + line3[j]
    }
    accountNumbers.push(num);
  }
  return accountNumbers;
}

// This will convert an 81 character string to an actual account number
function convertToDecimal(number, index){
  if (!number.toString().length) return;
  // Dividing up strings into groups of 9, representing a single digit
  const arrayOfDigits = number.match(/........./g);
  const current = arrayOfDigits.reduce((acc, singleNumber) => {
    const isUndefined = mapOfNumbers[singleNumber] === undefined;
    
    const numberToAdd = isUndefined ? '?' : mapOfNumbers[singleNumber];
    return (acc + numberToAdd.toString())
  }, '');
  return current;
}


// Parsing the account numbers from the whole file to generate actual numbers
async function parsingToReal() {
  const gibberishAccountNumbers =  await dataHandler();
  if (!gibberishAccountNumbers || !gibberishAccountNumbers.length) return;

  const actual = gibberishAccountNumbers.map((number, index) => {
    const converted =  convertToDecimal(number, index);
    return converted;
  })
  actualNumbers = actual;
  console.log('...');
  return actual;
}


// PART 2
//
// Running the checksum on each number to check if they are valid or not
async function checkSumCalculation() {
  const actualNumber = await parsingToReal();
  if (!actualNumber || !actualNumber.length) return;

  const checkSumTable = actualNumber.reduce((acc, number) => {
    // Don't need to calculate checksum if the number is illegible
    if (number.indexOf('?') !== -1) return ({ ...acc, [number]: 'ILL' })

    const checkSum = parseInt(number[8], 10) + (2*parseInt(number[7], 10)) + (3*parseInt(number[6], 10)) + (4*parseInt(number[5], 10)) + (5*parseInt(number[4], 10)) + (6*parseInt(number[3], 10)) + (7*parseInt(number[2], 10)) + (8*parseInt(number[1], 10)) + (9*parseInt([0], 10))
    const isCheckSumValid = checkSum % 11 === 0
    return ({ ...acc, [number]: !isCheckSumValid ? 'ERR' : '' })
  }, {})

  return checkSumTable;
}


// PART 3
//
// Writing out a file based on the results generated from the two steps above
async function writeConvertedNumbers() {
  const checkSumTable = await checkSumCalculation();
  if (!checkSumTable) return;

  const convertedToOutput = Object.keys(checkSumTable).reduce((acc, item) => `${acc}${item} ${checkSumTable[item]}\n`, '');

  try {
    fs.writeFileSync('./result.txt', convertedToOutput);
  } catch (err) {
    console.error(err);
  }

}

writeConvertedNumbers()
