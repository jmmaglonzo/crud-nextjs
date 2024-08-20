"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "@/lib/schema";
import axios from "axios";
import { toast } from "sonner";
export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, values);
      toast.success("User successfully created!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          clearErrors();
        }
      }}
    >
      <DialogTrigger className="bg-blue-500 hover:bg-blue-400 px-5 font-medium text-white rounded-md py-2 ">
        Add +
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new User</DialogTitle>
          <DialogDescription>Create new user profile here.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" placeholder="Enter name" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              type="text"
              placeholder="Enter age"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && (
              <p className="text-xs text-red-600">{errors.age.message}</p>
            )}
          </div>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
