const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

const getUsuario = (async (req, res) => {
    try {
        const usuarioList = await Usuario.find();

        if(!usuarioList){
            res.status(500).json({status: false, message: 'Error con buscar al usuario'})
        }

        res.status(200).json({
            status: true,
            data: usuarioList
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        })
    }
});

const getByIdUsuario = (async (req,res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).json({status: false, message: 'Id invalido'})
        }

        const usuarioOne = await Usuario.findById(req.params.id);

        res.status(200).json({
            status: true,
            data: usuarioOne
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        })
    }
});

const addUsuario = (async (req, res) => {

    const existeEmail = await Usuario.findOne({email: req.body.email});

    if(existeEmail){
        return res.status(400).json({status: false, message: 'Ya existe usuario con este email'})
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const usuario = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: password,
            direccion: req.body.direccion,
            departamento: req.body.departamento,
            celular: req.body.celular,
            isAdmin: req.body.isAdmin,
        })

        const usuarioDB = await usuario.save();
        const token = await jwt.sign({
            data: usuarioDB 
        }, process.env.SECRET_KEY);

        res.status(200).json({
            status: true,
            token: token
            // data: usuarioDB
        })
    } catch (error) {
        res.status(500).json({
            status: true,
            error: error
        })
    }
});

const loginUsuario = (async (req,res) =>{

    const user = await Usuario.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

    const token = await jwt.sign({
        data: Usuario.id,
    }, process.env.SECRET_KEY,{
        expiresIn: 60*60*24 //expira en 24 hras
    });

    try {
        res.json({
            status: true,
            data: user,
            token: token,
            message: 'exito bienvenido'
        })
    } catch (error) {
        asadffghjkik
        res.status(500).json({
            status: false,
            error:error
        })
    }
});

const updateUsuario = (async (req,res) => {

    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({status:false, message: 'Id Invalido'});
        }

        const usuarioAc = await Usuario.findByIdAndUpdate(
            req.params.id,
            {
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                direccion: req.body.direccion,
                departamento: req.body.departamento,
                celular: req.body.celular,
                isAdmin: req.body.isAdmin, 
            },
            { new: true }
        )

        res.status(200).json({
            status: true,
            data: usuarioAc
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error:error
        })
    }
});

const deleteUsuario = (async (req,res) => {

    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({status:false, message: 'Id Invalido'});
        }

        Usuario.findByIdAndRemove(req.params.id).then(usuario => {
                return res.status(200).json({status: true, message: 'Usuario Elimininado Satisfactoriamente'});
        }).catch(error => {
            return res.status(400).json({status: true, message: 'Usuario no se pudo eliminar vuelva a intentarlo'});
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error:error
        })
    }
});

module.exports = {
    getUsuario,
    getByIdUsuario,
    addUsuario,
    loginUsuario,
    updateUsuario,
    deleteUsuario
}