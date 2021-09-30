const bcrypt = require('bcrypt');
const generarJWT = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res) => {

    const { nombre, email, password } = req.body;

    try {
        // Verificar el email
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar el JWT
        const token = await generarJWT(dbUser.id, nombre);
        // Crear usuario de DB
        await dbUser.save();

        // Generar repuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            nombre,
            email,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    crearUsuario
}