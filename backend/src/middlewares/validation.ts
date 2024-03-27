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

const orderSchema = Joi.object({
  name: Joi.string().required().normalize(),
});

const orderCreateSchema = celebrate({
  body: orderSchema,
});

const orderUpdateSchema = celebrate({
  body: orderSchema,
  params: uuidParam,
});

export default {
  loginSchema,
  uuidParam,
  expenseCreateSchema,
  expenseUpdateSchema,
  orderCreateSchema,
  orderUpdateSchema,
  orderSchema,
};
