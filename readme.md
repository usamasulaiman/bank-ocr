# Bank OCR - Data transformation

This scripts aims to transform a series of number formed with underscores and pipes into real numbers. It does three things,
* Transform characters to numbers
* Calculates checksum and determines whether a transform number is a valid bank account number or not
* Generates a file with all the numbers and metadata

## Environment
The program is written in javascript and runs in a CLI with node.

Navigate to the file and use `node index` to run the script. 

Please ensure you are using a recent version of node, preferably >8 so that you don’t face any problems because of the ES2015 and later features used. 
