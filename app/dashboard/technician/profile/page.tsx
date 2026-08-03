import { getTechnicianProfile } from "@/app/(publicGroup)/_action/technicianAction";
import TechnicianProfileClient from "./TechnicianProfileClient";


export default async function Page() {
    const response = await getTechnicianProfile();
    const initialData = response?.success ? response.data : response;

    return <TechnicianProfileClient initialData={initialData} />;
}