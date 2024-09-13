const { body, param, validationResult } = require("express-validator");

const readUserValidation = [
  param("id").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
];

const readCandidateValidation = [
  param("id").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
];

const readByConsultantValidation = [
  param("id").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
];

const addUserValidation = [
  body("firstname").isString().isLength({ min: 1 }).withMessage("Le prénom est requis et doit être une chaîne de caractères").escape(),
  body("lastname").isString().isLength({ min: 1 }).withMessage("Le nom est requis et doit être une chaîne de caractères").escape(),
  body("email").isEmail().withMessage("Format d'email invalide").escape(),
  body("password").isString().isLength({ min: 8 }).withMessage("Le mot de passe est requis et doit faire minimum 8 caractères").escape(),
  (req, res, next) => {
    const errors = validationResult(req);      
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
];

const editCandidateValidation = [
  body("email").optional().isEmail().withMessage("Format d'email invalide").escape(),
  body("phone").optional().isString().isLength({ min: 10 }).withMessage("Le numéro de téléphone doit être composé au moins de 10 chiffres").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
];

const deleteUserValidation = [
  param("id").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
];


module.exports = {
  readUserValidation,
  readCandidateValidation,
  readByConsultantValidation,
  addUserValidation,
  editCandidateValidation,
  deleteUserValidation
};
