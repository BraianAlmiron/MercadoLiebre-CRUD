const {check,body,validationResult} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Nombre obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo dos letras').bail()
        .isAlpha('es-ES',{
            ignore : " "
        }).withMessage('Sólo carácteres alfabéticos'),

        check('surname')
        .notEmpty().withMessage('Apellido obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo dos letras').bail()
        .isAlpha('es-ES',{
            ignore : " "
        }).withMessage('Sólo carácteres alfabéticos'),

        body('email')
            .notEmpty().withMessage('E-mail obligatario').bail()
            .isEmail().withMessage('Debe ser un e-mail con formato válido'),

        check('password')
            .notEmpty().withMessage('Contraseña obligatoria').bail()
            .isLength({
                min : 6,
                max : 12
            }).withMessage('La contraseña debe tener entre 6 y 12 carácteres'),

        body('password2')
            .notEmpty().withMessage('Confirmar contraseña').bail()
            .custom((value,{req}) => {
                if (value !== req.body.password) {
                    return false
                }
                return true
            }).withMessage('Deben coincidir las contraseñas'),
            
        check('bases')
            .exists().withMessage('Debes aceptar bases y condiciones')
        
]