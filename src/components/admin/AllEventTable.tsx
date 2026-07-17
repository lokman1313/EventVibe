"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify"; 
import { EventData, updateEventData } from "@/lib/action/event";
import EventDeleteAlart from "./EventDeleteAlart";

interface AllEventTableProps {
  allEvents: EventData[];
}

const AllEventTable = ({ allEvents }: AllEventTableProps) => {
  const router = useRouter();

// Publish Event handler
  const handlePublish = async (id: string): Promise<void> => {
    try {
      const payload: Partial<EventData> = { publishStatus: "published" };
      
      // ✅ Corrected: Pass "id" as 1st parameter and "payload" as 2nd parameter
      const res = await updateEventData(id, payload);

      if (res) {
        toast.success("Event published successfully!");
        router.refresh();
      } else {
        toast.error("Failed to publish event");
      }
    } catch (error) {
      console.error("Publish Error:", error);
      toast.error("An unexpected error occurred while publishing");
    }
  };

  // Unpublish Event handler
  const handleUnpublish = async (id: string): Promise<void> => {
    try {
      const payload: Partial<EventData> = { publishStatus: "unpublished" };
      
      // ✅ Corrected: Pass "id" as 1st parameter and "payload" as 2nd parameter
      const res = await updateEventData(id, payload);

      if (res) {
        toast.warning("Event unpublished successfully");
        router.refresh();
      } else {
        toast.error("Failed to unpublish event");
      }
    } catch (error) {
      console.error("Unpublish Error:", error);
      toast.error("An unexpected error occurred while unpublishing");
    }
  };

  const headers: string[] = [
    "Banner",
    "Event Title",
    "Category",
    "Date",
    "Status",
    "Actions",
  ];

  return (
    <Table aria-label="All Admin Events Table">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[900px]">
          
          {/* TABLE HEAD */}
          <Table.Header>
            {headers.map((h) => (
              <Table.Column isRowHeader key={h}>
                {h}
              </Table.Column>
            ))}
          </Table.Header>

          {/* TABLE BODY */}
          <Table.Body emptyContent={"No events found"}>
            {allEvents?.map((event: EventData) => {
              const isApproved: boolean = event.status === "unpublished";
              const isPending: boolean = event.status === "pending";

              // Fallback default placeholder image if no banner image exists
              const bannerSrc: string = event.bannerImage || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60";

              return (
                <Table.Row key={event._id} id={event._id}>
                  
                  {/* Event Banner */}
                  <Table.Cell>
                    <Image
                      src={bannerSrc}
                      alt={event.title || "Event Banner"}
                      width={100}
                      height={60}
                      className="w-14 h-9 object-cover rounded border border-zinc-700"
                    />
                  </Table.Cell>

                  {/* Title */}
                  <Table.Cell>
                    <div className="truncate max-w-[200px] font-medium" title={event.title}>
                      {event.title}
                    </div>
                  </Table.Cell>

                  {/* Category */}
                  <Table.Cell>
                    <span className="capitalize text-zinc-600 dark:text-zinc-300">
                      {event.category}
                    </span>
                  </Table.Cell>

                  {/* Created Date */}
                  <Table.Cell>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(event.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs border font-medium ${
                      isPending
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : isApproved
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}>
                      {event.status || "pending"}
                    </span>
                  </Table.Cell>

                  {/* Dynamic Action Buttons */}
                  <Table.Cell>
                    <div className="flex gap-2 items-center">
                      {event.publishStatus == "published" ? (
                        <Button
                          size="sm"
                          onPress={() => handleUnpublish(event._id)}
                          className="border border-red-500/20 bg-red-500/10 text-red-400 font-medium rounded-xl hover:bg-red-500/20 transition"
                        >
                          Unpublish
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onPress={() => handlePublish(event._id)}
                          className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-medium rounded-xl hover:bg-emerald-500/20 transition"
                        >
                          Publish
                        </Button>
                      )}

                      {/* Event Delete Trigger Alert Component */}
                      <EventDeleteAlart eventId={event._id} />
                    </div>
                  </Table.Cell>

                </Table.Row>
              );
            })}
          </Table.Body>

        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default AllEventTable;