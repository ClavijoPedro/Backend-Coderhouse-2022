import CustomError from "../errors/CustomError.js";


class DAO{
    

    listAll(){
        throw new CustomError(500, 'falto implementar listAll()');
    };


    listById(id){
        throw new CustomError(500, 'falto implementar listById()');
    };

    listOne(itm){
        throw new CustomError(500, 'falto implementar listOne()');
    };


    save(itm){
        throw new CustomError(500, 'falto implementar save()');
    };


    updateById(id, itmUpdate){
        throw new CustomError(500, 'falto implementar updateById()');
    };


    deleteById(id){
        throw new CustomError(500, 'falto implementar deleteById()');
    };

    
    deleteAll(){
        throw new CustomError(500, 'falto implementar deleteAll()');
    };
};


export default DAO;