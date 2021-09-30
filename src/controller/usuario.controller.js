const bcrypt = require('bcrypt');
const generarJWT = require('../helpers/jwt');
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');

const getUsuario = (async(req , res)=>{

   try {
       const usuarioList = await Usuario.find();

       if(!usuarioList){
        res.status(500).json({status: false, message: "No hay registro de empleados"})
        }else{
        res.status(200).json({
            status: true,
            data: usuarioList
        });
    }
   } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Por favor hable con el administrador'
        });
   }

});

const getUsuarioById = (async (req, res) => {
    try {
        // Valida si el id es es el correcto
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('Id Invalido');
        }

        const usuarioOne = await Usuario.findById(req.params.id);

        if(!usuarioOne){
            res.status(500).json({
                status: err,
                success: false
            });
        }
        res.status(200).json({
            status: true,
            data: usuarioOne
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Por favor ponerse en contacto con el administrador'
        });
    }
});
const addUsuario = async (req, res) => {

    const { nombre, email, password} = req.body;

    try {
        // Verificar el email
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                status: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar el JWT
        const tstatusen = await generarJWT(dbUser.id, nombre);
        // Crear usuario de DB
        await dbUser.save();

        // Generar repuesta exitosa
        return res.status(200).json({
            status: true,
            uid: dbUser.id,
            nombre,
            email,
            tstatusen
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const loginUsuario = async (req, res) => {

    const {email, password} = req.body;
    
    try {
        const dbUser = await Usuario.findOne({ email });
        
        if(!dbUser){
            return res.status(400).json({
                status: false,
                msg: 'Correo no valido, favor revisar'
            });
        }

        //Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            return res.status(400).json({
                status: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar el tstatusen
        const tstatusen = await generarJWT(dbUser.id, dbUser.nombre);

        // Repuesta exitosa

        return res.status(200).json({
            status: true,
            uid: dbUser.id,
            nombre: dbUser.nombre,
            email: dbUser.email,
            tstatusen
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: 'Hable con el administrador' + error
        });
    }

};

const revalidarToken = (async (req, res) => {

    const {uid} = req;

    //Leer la base de datos
    const dbUser = await Usuario.findById(uid);

    //Generar el JWT
    const tstatusen = await generarJWT(uid, dbUser.name);

    return res.json({
        status: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        tstatusen
    });
});

module.exports = {
    getUsuario,
    getUsuarioById,
    addUsuario,
    revalidarToken,
    loginUsuario
};