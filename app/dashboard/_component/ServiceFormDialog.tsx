"use client";

import { useState } from "react";

import { IService } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, SquarePen } from "lucide-react";

type Props = {
  mode: "create" | "edit";
  service?: IService;
};

export function ServiceFormDialog({
  mode,
  service,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button>
            <Plus className="mr-2 size-4" />
            Add Service
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <SquarePen className="mr-2 size-4" />
            Edit
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Add New Service"
              : "Edit Service"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5">

          <div>
            <Label htmlFor="title">Service Name</Label>
            <Input
              id="title"
              name="title"
              defaultValue={service?.title}
            />
          </div>

          <div>
            <Label htmlFor="category_id">Category</Label>

            <Select
              name="category_id"
              defaultValue={service?.category?.id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {/* পরে API থেকে Category Load করবে */}
                <SelectItem value="category-id-1">
                  Electrical
                </SelectItem>

                <SelectItem value="category-id-2">
                  Plumbing
                </SelectItem>

                <SelectItem value="category-id-3">
                  Cleaning
                </SelectItem>

                <SelectItem value="category-id-4">
                  Painting
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={service?.description}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label htmlFor="price">Price</Label>

              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={service?.price}
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (Minutes)</Label>

              <Input
                id="duration"
                name="duration"
                type="number"
                defaultValue={service?.duration}
              />
            </div>

          </div>

          <div>
            <Label htmlFor="location">Location</Label>

            <Input
              id="location"
              name="location"
              defaultValue={service?.location}
            />
          </div>

          <Button type="submit" className="w-full">
            {mode === "create"
              ? "Create Service"
              : "Save Changes"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}