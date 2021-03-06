const Usuario = require('../models/usuario');
const Juegos = require('../models/videojuego');

module.exports = {
 
    //GET: Obtenemos todos los usuarios
    obtenerUsuarios: async (req, res, next) => {
        const usuarios = await Usuario.find({});
        res.status(200).json(usuarios);
    },

    //POST: Agregamos un nuevo usuario
    agregarUsuario: async (req, res, next) => {
        const nuevoUsuario = new Usuario(req.body); 
        const usuario = await nuevoUsuario.save();
        res.status(200).json(usuario);
    },

    //GET: Obtenemos un usuario a traves de su ID
    obtenerUsuario: async (req, res, next) => {
        const idUsuario = req.params.idUsuario;
        const usuario = await Usuario.findById(idUsuario);

        //res.status(200).json(usuario);
        res.render('datos.html', {usuario});
    },

/*     //PUT: Reemplazamos todos los campos de usuario por los campos de otro usuario
    reemplazarUsuario: async (req, res, next) => {
        const { idUsuario }= req.params;
        const nuevoUsuario = req.body;
        //Devuelve el usuario viejo
        const viejoUsuario = await Usuario.findByIdAndUpdate(idUsuario, nuevoUsuario);
        res.status(200).json({Success: true});
    },

    //PATCH: Actualizamos un campo de un usuario a traves de su ID 
    //El codigo es el mismo al de reemplazarUsuario
    //La diferencia esta en la peticion o endpoint con el cual se utiliza la funcion
    actualizarUsuario: async (req, res, next) => {
        const { idUsuario }= req.params;
        const nuevoUsuario = req.body;
        //Devuelve el usuario viejo
        const viejoUsuario = await Usuario.findByIdAndUpdate(idUsuario, nuevoUsuario);
        res.status(200).json({Success: true});
    },

    //DELETE: Eliminamos un usuario a traves de su ID
    eliminarUsuario: async (req, res, next) => {
        const { idUsuario }= req.params;
        const usuario = await Usuario.findByIdAndRemove(idUsuario);
        res.status(200).json({Success: true});
    }, */

    obtenerJuegosUsuario: async (req, res, next) => {
        const idUsuario = req.params.idUsuario;
        const usuario = await Usuario.findById(idUsuario);
        //res.status(200).json(usuario.Juegos);
        const idJuegos = usuario.Juegos;
        let juegos = []
        for (var i=0; i<idJuegos.length; i++){
            juegos.push(await Juegos.findById(idJuegos[i]));
        }
        const errors = [];

        if (juegos.length == 0) {
            errors.push({text: 'No se encontraron resultados'}); 
            res.render('datos.html', {errors, usuario});
        } else {
            res.render('datos.html', {usuario, juegos});
        }
    },

    agregarJuegoUsuario: async( req, res, next) => {
        const idUsuario= req.params.idUsuario;
        const idJuego= req.params.idJuego;
        //const nuevoJuego = new Juegos(req.body);
        const usuario = await Usuario.findById(idUsuario);
        const juego = await Juegos.findById(idJuego);
        //nuevoJuego.Compradores = usuario;
        //await nuevoJuego.save();
        usuario.Juegos.push(juego);
        await usuario.save();
        juego.Vendidos = juego.Vendidos + 1;
        await juego.save(); 
        req.flash('success_msg', 'Juego adquirido con exito!');
        res.redirect('/mensajes');
        //res.status(200).json(usuario);
    },

/*     
    obtenerUsuarioPorEmail: async (req, res, next) => {
        const emailUsuario= req.params.email;

        const usuario = await Usuario.findOne({Email: emailUsuario});
        //res.status(200).json(usuario);

        res.render('datos.html', {usuario});
    }, */

};

//El next se utiliza para enviar el error si se quisiera