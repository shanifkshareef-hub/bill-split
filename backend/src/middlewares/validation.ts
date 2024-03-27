import { celebrate, Joi, Segments } from "celebrate";

const loginSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  }),
});

const uuidParam = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

const expenseSchema = Joi.object({
  name: Joi.string().required().normalize(),
});

const expenseCreateSchema = celebrate({
  body: expenseSchema,
});

const expenseUpdateSchema = celebrate({
  body: expenseSchema,
  params: uuidParam,
});

export default {
  loginSchema,
  uuidParam,
  expenseCreateSchema,
  expenseUpdateSchema,
};
