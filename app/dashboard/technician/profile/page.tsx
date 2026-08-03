"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, User } from "lucide-react";
import { updateTechnicianProfile } from "@/app/(publicGroup)/_action/technicianAction";


interface TechnicianProfilePageProps {
    initialData?: {
        bio?: string;
        experience_years?: number;
        location?: string;
        hourly_rate?: number;
        skills?: string[];
    };
}

export default function TechnicianProfilePage({ initialData }: TechnicianProfilePageProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        bio: initialData?.bio || "",
        experience_years: initialData?.experience_years || 0,
        location: initialData?.location || "",
        hourly_rate: initialData?.hourly_rate || 0,
        skills: initialData?.skills ? initialData.skills.join(", ") : "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formattedData = {
                ...formData,
                experience_years: Number(formData.experience_years),
                hourly_rate: Number(formData.hourly_rate),
                skills: typeof formData.skills === "string"
                    ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
                    : formData.skills,
            };

            const result = await updateTechnicianProfile(formattedData);

            if (!result.success) {
                throw new Error(result.message || "Failed to update profile");
            }

            toast.success("Profile updated successfully!");
            router.refresh();
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error(error.message || "Network error: Failed to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <Card className="shadow-lg border-border/50">
                <CardHeader className="flex flex-row items-center gap-4 pb-6 border-b border-border/50">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <User className="size-6" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">Technician Profile</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Update your professional details, skills, and pricing.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Experience Years */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">
                                    Experience (Years)
                                </label>
                                <Input
                                    type="number"
                                    name="experience_years"
                                    value={formData.experience_years}
                                    onChange={handleChange}
                                    placeholder="e.g. 3"
                                    className="rounded-xl"
                                />
                            </div>

                            {/* Hourly Rate */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">
                                    Hourly Rate ($)
                                </label>
                                <Input
                                    type="number"
                                    name="hourly_rate"
                                    value={formData.hourly_rate}
                                    onChange={handleChange}
                                    placeholder="e.g. 50"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Location
                            </label>
                            <Input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Dhaka, Bangladesh"
                                className="rounded-xl"
                            />
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Skills (Comma separated)
                            </label>
                            <Input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="e.g. Plumbing, Electrical, HVAC"
                                className="rounded-xl"
                            />
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Bio / About Yourself
                            </label>
                            <Textarea
                                name="bio"
                                rows={4}
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Write a short description about your expertise..."
                                className="rounded-xl resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="rounded-xl px-6 font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="size-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="size-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}