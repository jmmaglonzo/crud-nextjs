"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Delete from "../Delete/Delete";
import CreateUser from "../Create/CreateUser";
import EditUser from "../Edit/EditUser";

interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`);
      setUsers(res.data);
      if (res.status !== 200) {
        toast.error("Failed fetching data");
      }
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [users]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };
  return (
    <div className="flex items-start justify-center flex-col gap-2">
      <CreateUser />
      <Table className="w-[50%] mx-auto border-2">
        <TableCaption>List of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Age</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} className="text-center">
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <EditUser id={user._id} />

                <Delete onDelete={() => handleDelete(user._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
