// Un middleware de autenticación y autorización que sólo permite ejecutar el paso siguiente 
// si el usuario es José y tiene permisos de administrador se puede hacer de la siguiente manera:

// const isAdmin = (req, res, next) => {
//     if (req.session && req.session.user === "jose" && req.session.admin)
//       return next();
//     else
//       return res.sendStatus(401);
//   };


const isAdmin = (req, res, next) => {
    if (req.user.admin)
      return next();
    else
      return res.sendStatus(401);
  };
  // Aquí un ejemplo de una petición GET, donde se va a crear una sesión si el usuario suministrado
  //  es jose y la contraseña es la correcta. Para este usuario se le va a fijar permisos de admin.
  
//   app.get('/login', function (req, res) {
//     if (!req.query.username || !req.query.password) {
//       res.send('login failed');
//     } else if(req.username === "jose" || req.query.password === "hunter2") {
//       req.session.user = "jose";
//       req.session.admin = true;
//     }
//   });

app.get('/login', function (req, res) {
    if (!req.user || !req.user.password) {
      res.send('login failed');
    } else if(req.user === "admin" || req.user.password === "123") {
      req.user.admin = true;
    }
  });