// PART 3
//
import * as fs from 'fs';

// Writing out a file based on the results generated from the two steps above
async function writeConvertedNumbers(checkSumTable) {
  if (!checkSumTable) return;

  const convertedToOutput = Object.keys(checkSumTable).reduce((acc, item) => `${acc}${item} ${checkSumTable[item]}\n`, '');

  try {
    fs.writeFileSync('./result.txt', convertedToOutput);
  } catch (err) {
    console.error(err);
  }

}

export default writeConvertedNumbers;