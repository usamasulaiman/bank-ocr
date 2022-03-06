mapOfNumbers = require('./numberMap');

// PART 1
//
// Dividing up the account numbers and sending them off to parsing
async function dataHandler(fileData) {
  if (!fileData) return false;
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
function convertToDecimal(number){
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
async function parsingToReal(fileData) {
  const gibberishAccountNumbers =  await dataHandler(fileData);
  if (!gibberishAccountNumbers || !gibberishAccountNumbers.length) return false;

  const actual = gibberishAccountNumbers.map((number) => {
    const converted =  convertToDecimal(number);
    return converted;
  })
  
  return actual;
}

module.exports = parsingToReal;