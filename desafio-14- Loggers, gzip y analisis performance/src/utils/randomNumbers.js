
// function createRandomNumbers(qty){
//     const numbers = [];
//     for (let i = 0; i < qty; i++) {
//         let random = Math.round(Math.random() * (1000 - 1) + 1)
//         numbers.push(random);
//     }
//     return numbers 
// };


// //guarda la key que es el num y comparo si esta el argumento num le sumo 1 sino le pongo 1 por default
// function repeatedNumbers(numArr){
//     let numberCount = {}
//     numArr.forEach(num => (numberCount[num] = numberCount[num] + 1 || 1));
//     return numberCount 
// };


// //escuha evento message y procesa el mensaje (cant)
// process.on('message', cant => {
//     const xDefault = 100000000;
//     let randomNumbers;

//     if(cant !== null && cant > 0){
//        randomNumbers = createRandomNumbers(cant)
//     }else{
//        randomNumbers = createRandomNumbers(xDefault)
//     }
//     const numberCount = repeatedNumbers(randomNumbers);
//     process.send(numberCount)
//     process.exit()
// });


function calculateRandoms() {
    let cant = 1000

    let result = {}
    for (let i = 0; i < cant; i++) {
        const randomNumber = 1 + Math.floor(Math.random() * 1000)
        //si la key existe al value le agrego +1 sino value = 1
        result[randomNumber] = result[randomNumber] ? result[randomNumber] + 1 : 1
    } 
    
    console.log(JSON.stringify(result))
}

calculateRandoms()

