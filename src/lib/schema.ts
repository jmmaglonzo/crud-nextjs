import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({
    message: "Please enter a valid email!",
  }),
  age: z
    .number()
    .int({ message: "Age must be an integer" })
    .positive({ message: "Please enter a positive number" })
    .min(1, { message: "Age must be at least 1" }),
});

export default schema;
