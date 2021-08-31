var Users = require('../models/User');
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
});

const addUser = (async (req, res) =>{
    
    // validaciones de usuario
    const { error } = schemaRegister.validate(req.body);

    if(error){
        return res.status(400).json({
            status: false,
            error: error.details[0].message
        })
    }

    const existeEmail = await Users.findOne({email: req.body.email});

    if(existeEmail) return res.status(400).json({status: true, message: 'Email ya registrado'});

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
    });

    try {
        const userDB = await user.save();
        res.status(200).json({
            status: true,
            data: userDB
        });

    } catch (error) {
        res.status(400).json({
            status: false,
            message: error
        })
    }
});

const lista = (async (req, res) => {
    const userList = await Users.find();

    if(!userList){
        res.status(500).json({success: false})
    }
    res.status(200).send(userList);
});

module.exports = {
    addUser,
    lista
}