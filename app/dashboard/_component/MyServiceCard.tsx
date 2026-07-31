import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, DollarSign, MapPin, Trash2 } from "lucide-react";
import { IService } from "@/lib/types";
import { ServiceFormDialog } from "./ServiceFormDialog";

type Props = {
  service: IService;
};

export function MyServiceCard({ service }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {service.category?.name ?? "Category"}
          </Badge>
        </div>

        <CardTitle>{service.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {service.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <DollarSign className="size-4 text-green-600" />
            ৳ {service.price}
          </span>

          <span className="flex items-center gap-2">
            <Clock className="size-4" />
            {service.duration} min
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {service.location}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <ServiceFormDialog
          mode="edit"
          service={service}
        />

        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 size-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}