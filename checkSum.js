// PART 2
//
// Running the checksum on each number to check if they are valid or not
async function checkSumCalculation(actualNumber) {
  if (!actualNumber || !actualNumber.length) return false;

  const checkSumTable = actualNumber.reduce((acc, number) => {
    // Don't need to calculate checksum if the number is illegible
    if (number.indexOf('?') !== -1) return ({ ...acc, [number]: 'ILL' })

    const checkSum = `number`.split('').reverse().reduce((acc, item, index) =>  acc + ((index+1) * parseInt(item, 10)), '');
    const isCheckSumValid = checkSum % 11 === 0
    return ({ ...acc, [number]: !isCheckSumValid ? 'ERR' : '' })
  }, {})

  return checkSumTable;
}
export default checkSumCalculation;