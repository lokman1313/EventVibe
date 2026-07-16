"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  TextField,
  Label,
  Input,
} from "@heroui/react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import Image from "next/image";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { postEventData } from "@/lib/action/event";

// TypeScript Interfaces ডিফাইন করা হলো
interface EventData {
  title: string;
  organizer: string;
  price: number;
  category: string;
  location: string;
  date: string;
  time: string;
  bannerImage: string;
  description: string;
  creatorId: string | undefined;
  approvalStatus: "pending" | "approved";
  publishStatus: "draft" | "published";
}

interface ImgBBResponse {
  success: boolean;
  data: {
    url: string;
  };
  error?: {
    message: string;
  };
}

// ভায়োলেট কালার স্কিমের জন্য ক্লাসেস আপডেট করা হয়েছে
const textInputClass =
  "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2 placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition text-white";

const textAreaClass =
  "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2 placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition resize-none text-white";

const triggerClasses =
  "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2 focus:border-violet-500/50 focus:outline-none transition text-left text-white";

const EventAddingForm: React.FC = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_BB_UPLOAD_API;

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMGBB_API_KEY) {
      toast.error("Configuration error: image upload key not found.");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: uploadData },
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result: ImgBBResponse = await response.json();

      if (result.success) {
        setImageUrl(result.data.url);
        toast.success("Event banner uploaded successfully!");
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setImagePreview(null);
      setImageUrl("");
      const input = document.getElementById("cover-input") as HTMLInputElement | null;
      if (input) input.value = "";
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImagePreview(null);
    setImageUrl("");
    const input = document.getElementById("cover-input") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (isUploading) {
      toast.warning("Please wait until the banner image finishes uploading.");
      return;
    }
    if (!user) {
      toast.error("Please login first");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(form);
    
    // টাইপ সেফ ইভেন্ট ডাটা অবজেক্ট তৈরি
    const eventData: EventData = {
      title: formData.get("title") as string,
      organizer: formData.get("organizer") as string,
      price: Number(formData.get("price")) || 0,
      category: formData.get("category") as string,
      location: formData.get("location") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      bannerImage: imageUrl || (formData.get("coverImageUrl") as string) || "",
      description: formData.get("description") as string,
      creatorId: user.id,
      approvalStatus: "pending",
      publishStatus: "published",
    };

    try {
      await postEventData(eventData);
      console.log("Event data to submit:", eventData);
      toast.success("Event added successfully!");
      form.reset();
      setImagePreview(null);
      setImageUrl("");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to add event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-violet-500/20 bg-zinc-500/80">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create New <span className="text-violet-500">Event</span>
            </h1>
            <p className=" text-sm mt-2">
              Fill in the details to publish your event on EventVibe
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ── Event Information ── */}
            <fieldset className="space-y-6">
              <legend className="text-lg font-semibold border-b border-zinc-800 pb-2 w-full text-white">
                Event Information
              </legend>

              {/* Title & Organizer */}
              <div className="grid md:grid-cols-2 gap-6">
                <TextField name="title" className="w-full text-white">
                  <Label className="font-medium mb-1.5 block text-sm">
                    Event Title <span className="text-violet-500">*</span>
                  </Label>
                  <Input
                    required
                    className={textInputClass}
                    placeholder="e.g. Dhaka Tech Summit"
                  />
                </TextField>

                <TextField name="organizer" className="w-full text-white">
                  <Label className="font-medium mb-1.5 block text-sm">
                    Organizer Name <span className="text-violet-500">*</span>
                  </Label>
                  <Input
                    required
                    className={textInputClass}
                    placeholder="e.g. Team EventVibe"
                  />
                </TextField>
              </div>

              {/* Price & Category */}
              <div className="grid md:grid-cols-2 gap-6">
                <TextField name="price" className="w-full text-white">
                  <Label className="font-medium mb-1.5 block text-sm">
                    Ticket Price ($) <span className="text-violet-500">*</span>
                  </Label>
                  <Input 
                    type="number" 
                    required 
                    min="0"
                    className={textInputClass} 
                    placeholder="e.g. 10 (0 for Free)" 
                  />
                </TextField>

                <div className="w-full">
                  <label className="font-medium mb-1.5 block text-sm text-white">
                    Category <span className="text-violet-500">*</span>
                  </label>
                  <select
                    required
                    name="category"
                    className={triggerClasses}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-zinc-900">
                      Select a category
                    </option>
                    <option value="tech" className="bg-zinc-900">Tech & Startup</option>
                    <option value="music" className="bg-zinc-900">Concerts & Music</option>
                    <option value="gaming" className="bg-zinc-900">Gaming & Esports</option>
                    <option value="art" className="bg-zinc-900">Art & Culture</option>
                    <option value="business" className="bg-zinc-900">Business & Career</option>
                    <option value="sports" className="bg-zinc-900">Sports & Fitness</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <TextField name="date" className="w-full text-white">
                  <Label className="font-medium mb-1.5 block text-sm">
                    Event Date <span className="text-violet-500">*</span>
                  </Label>
                  <Input
                    required
                    type="date"
                    className={textInputClass}
                  />
                </TextField>                
                                {/* Location */}
                <TextField name="location" className="w-full text-white">
                  <Label className="font-medium mb-1.5 block text-sm">
                    Location / Venue <span className="text-violet-500">*</span>
                  </Label>
                  <Input
                    required
                    className={textInputClass}
                    placeholder="e.g. KIB, Farmgate / Online (Zoom)"
                  />
                </TextField>
              </div>
              
            </fieldset>

            {/* ── Banner Image ── */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold border-b border-zinc-800 pb-2 w-full text-white">
                Event Banner
              </legend>

              <div>
                <label className="font-medium mb-1.5 block text-sm text-white">
                  Upload Event Banner
                </label>

                {imagePreview ? (
                  <div className="flex h-11 items-center justify-between rounded-xl border border-white/10 bg-zinc-900/50 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-7 w-7 overflow-hidden rounded-md border border-white/10">
                        <Image
                          src={imagePreview}
                          alt="Banner Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs text-zinc-400">
                        {isUploading ? (
                          <span className="animate-pulse text-violet-400 font-medium">
                            Uploading banner…
                          </span>
                        ) : (
                          <span className="text-green-400">
                            Banner image ready
                          </span>
                        )}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePreview}
                      className="rounded-lg p-1.5 text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-all"
                      title="Remove banner"
                    >
                      <FiX className="text-base" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/50 px-3 transition-all duration-200 hover:bg-zinc-900 hover:border-violet-500/30 group">
                    <FiUploadCloud className="text-zinc-500 text-sm group-hover:text-violet-500 transition-colors" />
                    <span className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      Upload banner image
                    </span>
                    <input
                      id="cover-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}

                {/* URL Paste backup */}
                {!imagePreview && (
                  <>
                    <div className="flex items-center gap-3 my-3">
                      <div className="flex-1 h-px bg-zinc-800" />
                      <span className="text-xs text-zinc-500">or</span>
                      <div className="flex-1 h-px bg-zinc-800" />
                    </div>
                    <TextField name="coverImageUrl" className="w-full text-white">
                      <Input
                        className={textInputClass}
                        placeholder="Paste banner URL: https://example.com/banner.jpg"
                      />
                    </TextField>
                  </>
                )}
              </div>
            </fieldset>

            {/* ── Description ── */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold border-b border-zinc-800 pb-2 w-full text-white">
                Event Description
              </legend>

              <div className="w-full">
                <label className="font-medium mb-1.5 block text-sm text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={5}
                  className={textAreaClass}
                  placeholder="Tell people what your event is about, schedule, speakers..."
                />
              </div>
            </fieldset>

            {/* ── Submit Button ── */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isUploading || isSubmitting}
              className="w-full h-11 bg-violet-600 hover:bg-violet-700 font-semibold rounded-xl transition duration-200 shadow-lg shadow-violet-600/10 disabled:opacity-50 text-white"
            >
              {isSubmitting ? "Creating Event…" : "Publish Event on EventVibe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventAddingForm;