import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Get In Touch
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3">Need Any Help? Contact Us</h2>
              <p className="text-gray-600 mt-2 text-sm">
                Have questions about booking a technician or offering your services? Reach out anytime!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-400">Phone Number</h4>
                  <p className="font-semibold text-gray-800 text-sm mt-0.5">+880 1815-255206</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-400">Email Address</h4>
                  <p className="font-semibold text-gray-800 text-sm mt-0.5">support@fixitnow.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-400">Office Location</h4>
                  <p className="font-semibold text-gray-800 text-sm mt-0.5">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <Card className="lg:col-span-2 rounded-2xl border border-gray-200 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="example@mail.com" 
                      className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?" 
                    className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Write your message here..." 
                    className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/30 resize-none"
                  ></textarea>
                </div>

                <Button className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-6 text-sm font-semibold flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}