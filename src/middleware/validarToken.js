const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Es necesario un token');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Token invalido');
		}

		const payload = await jwt.verify(token, process.env.SECRET_KEY);
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Contacte a su administrador' + e);
	}
}

module.exports = verifyToken;