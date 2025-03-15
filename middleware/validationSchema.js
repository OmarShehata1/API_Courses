const { body } = require('express-validator');

const validationSchema = () => {
	return [
		body('name')
			.notEmpty()
			.withMessage('title is required')
			.isLength({ min: 2 })
			.withMessage('title must be at least 2 digits'),
		body('price').notEmpty().withMessage('price is required'),
	];
};

module.exports = {
	validationSchema,
};