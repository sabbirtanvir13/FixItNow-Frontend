"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, User as UserIcon } from "lucide-react";
import { updateTechnicianProfile } from "@/app/(publicGroup)/_action/technicianAction";

export default function TechnicianProfileClient({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        profilePhoto: "",
        bio: "",
        experience_years: 0,
        location: "",
        hourly_rate: 0,
        skills: "",
    });

    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (initialData) {
            const userName = initialData.name || initialData.user?.name || "";
            const userEmail = initialData.email || initialData.user?.email || "";
            const userRole = initialData.role || initialData.user?.role || "TECHNICIAN";
            const photo = initialData.profilePhoto || initialData.user?.profilePhoto || "";

            setFormData({
                name: userName,
                email: userEmail,
                role: userRole,
                profilePhoto: photo,
                bio: initialData.bio || "",
                experience_years: initialData.experience_years || 0,
                location: initialData.location || "",
                hourly_rate: initialData.hourly_rate || 0,
                skills: Array.isArray(initialData.skills) ? initialData.skills.join(", ") : initialData.skills || "",
            });
            setImagePreview(photo);
        }
    }, [initialData]);

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
                name: formData.name,
                profilePhoto: formData.profilePhoto,
                bio: formData.bio,
                experience_years: formData.experience_years ? Number(formData.experience_years) : 0,
                hourly_rate: formData.hourly_rate ? Number(formData.hourly_rate) : 0,
                location: formData.location,
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
                    <div className="relative size-16 flex-shrink-0 overflow-hidden rounded-full border border-primary/20 bg-primary/10">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-primary">
                                <UserIcon className="size-8" />
                            </div>
                        )}
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">{formData.name || "Technician Profile"}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {formData.email} • <span className="uppercase font-semibold text-primary">{formData.role}</span>
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    <form onSubmit={handleUpdateProfile} className="space-y-6">

                        {/* Account Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-2xl border">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Full Name</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="rounded-xl bg-background"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Email (Read-only)</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="rounded-xl bg-muted cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Role</label>
                                <Input
                                    type="text"
                                    value={formData.role}
                                    disabled
                                    className="rounded-xl bg-muted cursor-not-allowed uppercase font-semibold text-primary"
                                />
                            </div>
                        </div>

                        {/* Profile Photo URL */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Profile Photo URL</label>
                            <Input
                                type="text"
                                name="profilePhoto"
                                value={formData.profilePhoto}
                                onChange={(e) => {
                                    handleChange(e);
                                    setImagePreview(e.target.value);
                                }}
                                placeholder="https://example.com/photo.jpg"
                                className="rounded-xl"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Experience (Years)</label>
                                <Input
                                    type="number"
                                    name="experience_years"
                                    value={formData.experience_years}
                                    onChange={handleChange}
                                    placeholder="e.g. 3"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Hourly Rate ($)</label>
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

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Location</label>
                            <Input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Uttara, Dhaka"
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Skills (Comma separated)</label>
                            <Input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="e.g. Refrigerator Repair, Washing Machine Repair"
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Bio / About Yourself</label>
                            <Textarea
                                name="bio"
                                rows={4}
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Write a short description about your expertise..."
                                className="rounded-xl resize-none"
                            />
                        </div>

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