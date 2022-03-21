import config from './../../config.js'
import { initializeApp, cert } from 'firebase-admin/app'; //traigo los servicios de firebase-admin 
import { getFirestore } from 'firebase-admin/firestore'; 


initializeApp({
    credential: cert(JSON.parse(config.firebaseDB))
});

const db = getFirestore();


class ContenedorFirebase {
    constructor(collection){
        this.collection = db.collection(collection); 

    }


    async listAll(){
        try{
            const data = []
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
            console.log(data)
            return data
        }
        catch(error){console.error(error)}
    }
    

    async listById (id){
        try{
            const item = await this.collection.doc(id).get()
            if(item.exists){
                return item.data();
            }else{ console.log('Error: el item no existe') }
        } 
        catch(error){console.error(error)} 
    }


    async updateById(id, itmUpdate){
        try{
            const item = await this.collection.doc(id).get()
            if(item.exists){
                await this.collection.doc(id).update(itmUpdate);
            }else{ console.log('Error: el item no existe') }
        }
        catch(error){console.error(error)}
    }


    async save(itm){
        const timestamp = new Date().toLocaleString()
        const code = Date.now()
        try{
            const docRef =  await this.collection.doc();
            const item = {...itm, timestamp:timestamp, code:code, id:docRef.id};
            const saveDoc = await docRef.set(item);
            return saveDoc.id
        }
        catch(error){console.error(error)}
    }


    async deleteById(id){
        try{
            const docRef = await this.collection.doc(id);
            const itemDelete = await docRef.delete();
            console.log('documento eliminado \n', itemDelete);
        }
        catch(error){console.error(error)}
    }
}


export default ContenedorFirebase;