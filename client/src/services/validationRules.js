const validationRules = {
  firstName: {
    required: "Le prénom est requis",
    minLength: {
      value: 3,
      message: "Le prénom doit contenir au moins 3 caractères",
    },
    maxLength: {
      value: 50,
      message: "Le prénom doit contenir au maximum 50 caractères",
    },
  },
  lastName: {
    required: "Le nom est requis",
    minLength: {
      value: 3,
      message: "Le nom doit contenir au moins 3 caractères",
    },
    maxLength: {
      value: 50,
      message: "Le nom doit contenir au maximum 50 caractères",
    },
  },
  email: {
    required: "L'email' est requis",
    pattern: {
      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message: "Format d'email invalide",
    },
  },
  password: {
    required: "Le mot de passe est requis",
    minLength: {
      value: 8,
      message: "Le mot de passe doit contenir au moins 8 caractères",
    },
  },
};

export default validationRules;
