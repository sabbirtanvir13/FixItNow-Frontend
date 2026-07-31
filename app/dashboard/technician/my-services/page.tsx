import { MyServicesList } from "../../_component/MyServicesList";
import { ServiceFormDialog } from "../../_component/ServiceFormDialog";


const MyServicePage = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">My Services</h1>
          <p className="text-muted-foreground">
            Manage your services, update details, or add new services.
          </p>
        </div>

        <ServiceFormDialog mode="create" />
      </div>

      <MyServicesList />
    </section>
  );
};

export default MyServicePage;