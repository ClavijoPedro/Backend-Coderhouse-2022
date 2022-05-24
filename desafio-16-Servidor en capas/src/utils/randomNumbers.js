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

