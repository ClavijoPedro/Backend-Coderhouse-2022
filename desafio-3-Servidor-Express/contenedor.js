const fs = require('fs');

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }
    
    list(){ //traigo la data del .txt
        try{
             const data = fs.readFileSync(this.fileName, 'utf-8'); //devuelve un buffer
             return JSON.parse(data); // lo paso a objeto js
        }
        catch(err){
            console.log(`no se pudo leer la lista ${err}`) 
        } 
    }

    save(obj){
        obj.id = Date.now(); //asigno id con el tiempo 
        const objList = this.list(); // traigo la lista ejecutando el metodo list 
        const newObjList = [...objList, obj]; // creo una nueva lista con el objeto agregado
        try{
            fs.writeFileSync(this.fileName, JSON.stringify(newObjList, null, 4)); // grabo el objeto como JSON EN EL TXT
            return console.log(`id del objeto ==> ${obj.id}`) //devuelvo el id
        }
        catch(err){
            console.log(`no se pudo guardar el archivo`)
        }  
    }

    getById(id){
        const objList = this.list(); // traigo la lista de obj
        const objById = objList.find(obj => obj.id === id); // busco el obj con = id
        console.log(objById ? objById : null); 
    }

    getAll(){
        console.log(this.list()) // imprimo la lista
    }

    deleteById(id){
        const objList = this.list(); // trigo la lista 
        const newObjList = objList.filter(obj => obj.id !== id); //nuevo array con todos los que son distinto id
        try{
            fs.writeFileSync(this.fileName, JSON.stringify(newObjList, null, 4));
            console.log(newObjList);
        }
        catch (err){
            console.log(`no se pudo eliminar el objeto`)
        }
    }

    deleteAll(){
        const objList = []; // defino una lista vacia
        try{
            fs.writeFileSync(this.fileName, JSON.stringify(objList)); // sobreescribo el txt
            console.log(`se eliminaron los objetos de la lista`);
        }
        catch (err){
            console.log(`no se pudo eliminar la lista`);
        }
    }

    prodRandom(){
        const prodList = this.list();
        const randomIndex = Math.floor(Math.random() * prodList.length);
        const randomProd = prodList[randomIndex];
        return randomProd;
    }
 
}

module.exports = Contenedor
