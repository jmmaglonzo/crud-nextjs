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
export default function EditUser({ id }: { id: string }) {
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
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/${id}`,
        values
      );
      toast.success("User profile successfully updated!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };
  return (
    <div>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            clearErrors();
          }
        }}
      >
        <DialogTrigger className="bg-green-500 hover:bg-green-400 px-4 font-medium text-white rounded-md py-3 ">
          Edit
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit user profile</DialogTitle>
            <DialogDescription>Edit user profile here.</DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Enter name"
                {...register("name")}
              />
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
            <Button type="submit">Edit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
