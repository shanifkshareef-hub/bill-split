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
  amount: Joi.number().required(),
  expenseTypeId: Joi.string().uuid().required(),
});

const orderCreateSchema = celebrate({
  body: orderSchema,
});

const orderUpdateSchema = celebrate({
  body: orderSchema,
  params: uuidParam,
});

const participantSchema = Joi.object({
  name: Joi.string().required().normalize(),
  expenseTypeId: Joi.string().uuid().required(),
});

const participantCreateSchema = celebrate({
  body: participantSchema,
});

const participantUpdateSchema = celebrate({
  body: participantSchema,
  params: uuidParam,
});

export default {
  loginSchema,
  uuidParam,
  expenseCreateSchema,
  expenseUpdateSchema,
  orderCreateSchema,
  orderUpdateSchema,
  participantCreateSchema,
  participantUpdateSchema,
  orderSchema,
};
