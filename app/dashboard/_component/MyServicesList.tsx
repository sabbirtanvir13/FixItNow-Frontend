import { IService } from "@/lib/types";
import { getMyServices } from "../_action/myServicesActions";
import { MyServiceCard } from "./MyServiceCard";

export async function MyServicesList() {
  const result = await getMyServices();

  if (!result?.success || !Array.isArray(result.data) || result.data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          No services found.
        </p>
      </div>
    );
  }

  const services = result.data as IService[];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <MyServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}