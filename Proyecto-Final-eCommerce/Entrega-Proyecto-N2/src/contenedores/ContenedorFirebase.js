// const {db} = require('../dataBases/firebase')


class ContenedorFirebase {
    constructor(collection){
        this.query = db.collection(collection); //coleccion de la db

    }

    async listAll(){
        try{
            const querySnapshot = await this.query.get();
            const docs = querySnapshot.docs; //devuelve los docs de la coleccion
    
            const items = docs.map((doc) => ({//devuelve array de items 
                id:doc.id, ...doc.data() 
            }))
            return items
        }
        catch(error){console.error(error)}
    }


    async listById (id){
        try{
            const docRef = this.query.doc(`${id}`);
            const getItem = await docRef.get();
            const item = getItem.data();
            console.log(item)
            return item;
        }
        catch(error){console.error(error)}
    }


    async updateById(id, itmUpdate){
        try{
            const docRef = this.query.doc(`${id}`);
            const item = await docRef.update(itmUpdate);
            console.log(item)
        }
        catch(error){console.error(error)}
    }


    async save(item){
        try{
            const docRef =  this.query.doc();
            await docRef.set(item);
        }
        catch(error){console.error(error)}
    }


    async deleteById(id){
        try{
            const docRef = this.query.doc(`${id}`);
            const itemDelete = await docRef.delete();
            console.log('item eliminado \n', itemDelete);
        }
        catch(error){console.error(error)}
    }
}


module.exports = ContenedorFirebase;