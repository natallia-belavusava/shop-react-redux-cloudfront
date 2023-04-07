import * as Yup from "yup";
import { OrderStatus } from "~/constants/order";

export const AddressSchema = Yup.object({
  firstName: Yup.string().required().default(""),
  lastName: Yup.string().required().default(""),
  delivery: Yup.string().required().default(""),
  payment: Yup.string().required().default(""),
  comment: Yup.string(),
}).defined();

export type Address = Yup.InferType<typeof AddressSchema>;

export const OrderItemSchema = Yup.object({
  productId: Yup.string().required(),
  count: Yup.number().integer().positive().required(),
}).defined();

export type OrderItem = Yup.InferType<typeof OrderItemSchema>;

export const statusHistorySchema = Yup.object({
  status: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).required(),
  timestamp: Yup.number().required(),
  comment: Yup.string().required(),
});

export type statusHistory = Yup.InferType<typeof statusHistorySchema>;

export const OrderSchema = Yup.object({
  id: Yup.string().required(),
  items: Yup.array().of(OrderItemSchema).defined(),
  address: AddressSchema.required(),
  statusHistory: Yup.array().of(statusHistorySchema).defined(),
}).defined();

export const OrderSchemaRDS = Yup.object({
  delivery: Yup.object()
    .shape({
      type: Yup.string().required(),
    })
    .required(),
  payment: Yup.object()
    .shape({
      type: Yup.string().required(),
    })
    .required(),
  comments: Yup.string().optional(),
  id: Yup.string().optional(),
  status: Yup.string().optional(),
  total: Yup.string().optional(),
  items: Yup.array().optional(),
  user_id: Yup.array().optional(),
}).defined();

export type Order = Yup.InferType<typeof OrderSchema>;
export type OrderRDS = Yup.InferType<typeof OrderSchemaRDS>;
