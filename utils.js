const fs = require('fs');

readAllWords = () => {
    try {  
        data = fs.readFileSync('array.txt', 'utf8');
        data = data.split(", ");

        return data;
    } catch(e) {
        console.log('Error:', e.stack);
        return [];
    }
}

getARandomWord = (arrayToGet, max) => {
    index = (Math.floor(Math.random() * max));
    return arrayToGet[index];
}

guessNextWord = (word, arr) => {

    /*
    0 - grey
    1 - green
    2 - yellow
    */
    data = readAllWords();
    dataArray = [];    
    data.forEach(w => {
        result =[1, 1, 1, 1, 1];

        for( i=0; i<5; i++ ) {

            if( arr[i] == 0 && w.includes(word[i]) ) { // exclude this
                result[i] = 0;
            } else if( arr[i] == 1 && w[i] != word[i] ) { // include this exactly this position
                result[i] = 0;
            } else if( arr[i] == 2 && !w.includes(word[i]) ) { // include this
                result[i] = 0;
            }

        }

        sum = result[0] + result[1] + result[2] +result[3] + result[4];
        if( w != word && sum == 5 ) {
            dataArray.push(w);
        }
        
    });

    if( dataArray.length == 0 ) {
        console.log('No word found!')
    } else {
        return getARandomWord(dataArray, dataArray.length);
    }

};

module.exports = {
    readAllWords,
    getARandomWord,
    guessNextWord
}