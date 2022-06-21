import util from 'util';

const printObject = (objeto) => {
    console.log(util.inspect(objeto, false, 4, true));
};

export default printObject