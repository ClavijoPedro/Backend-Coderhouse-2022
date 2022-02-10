const fs = require('fs');

class FileContainer {
    constructor(){
        this.file = './containers/messages.txt';
    }

    msjList(){
        try{
            const messages = fs.readFileSync(this.file, 'utf-8');
            return JSON.parse(messages);
        }
        catch(err){
            console.log(`no se encuentran mensajes ${err}`);
        }
    }

    addMsj(msj){
        const messages = this.msjList();
        const msjList = [...messages, msj];

        try{
            fs.writeFileSync(this.file, JSON.stringify(msjList, null, 3))
            return msj
        }
        catch(err){
            console.log(`no se pudo guardar messages ${err}`);
        }

    }
    
}

module.exports = FileContainer