import React from "react";
import { Wrench, ShieldCheck, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "Verified Professionals",
      description: "Every technician goes through background checks and skill verification.",
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Fast & Reliable",
      description: "Book instant services and get expert technicians at your doorstep in time.",
    },
    {
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      title: "Quality Guarantee",
      description: "We ensure transparent pricing and top-notch repair & maintenance service.",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Customer Satisfaction",
      description: "Thousands of satisfied homeowners rely on FixItNow every single day.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-5 max-w-6xl space-y-12">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            About FixItNow
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your Trusted Partner for Quality Home Repair & Maintenance
          </h2>
          <p className="text-gray-600 leading-relaxed">
            FixItNow connects homeowners with top-rated, background-checked local technicians. 
            From electrical repairs to plumbing and AC servicing, we make finding and booking reliable experts effortless.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm rounded-2xl bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}