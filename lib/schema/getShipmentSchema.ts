import z from "zod";

const getShipmentSchema = z.object({
  page: z.number().positive(),
  pageSize: z.number().positive(),
  filter: z.string(),
  status: z.enum([
    "all",
    "pending",
    "confirmed",
    "assigned",
    "picked_up",
    "in_transit",
    "delivered",
    "cancelled",
    "failed",
  ]),
});

export default getShipmentSchema;
