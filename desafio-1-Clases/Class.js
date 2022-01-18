class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return console.log(`Nombre completo del usuario ==> ${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota){
        this.mascotas = [...this.mascotas, mascota]
        return console.log(`Mascota agregada`);
    }

    countMascotas(){
        return console.log(`Cantidad de mascotas = ${this.mascotas.length}`);
    }

    addBook(name, author){
        this.libros = [...this.libros, {name: name, author: author}];
        return console.log(`Libro agregado`);
    }

    getBookNames(){
        if(this.libros.length){
            let bookNames = this.libros.map(libros => libros.name);
            return console.log(`Nombres de los libros ==> ${bookNames}`);
        }
    }
};

const usuario1 = new Usuario("pablo", "gomez");

usuario1.getFullName();
usuario1.addMascota("perro");
usuario1.addMascota("gato");
usuario1.addMascota("tortuga");
usuario1.countMascotas();
usuario1.addBook("Yo robot", "Isaac Asimov");
usuario1.addBook("Crónicas Marcianas", "Ray Bradbury");
usuario1.addBook("Ubik", "Philip K. Dick");
usuario1.getBookNames();


