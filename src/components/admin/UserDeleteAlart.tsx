"use client";

import React, { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteUserPermanent } from "@/lib/action/user";

interface UserDeleteAlertProps {
  userId: string;
}

export function UserDeleteAlert({ userId }: UserDeleteAlertProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteUserPermanent(userId);
      if (res) {
        toast.warning("User deleted permanently");
        router.refresh();
        setIsOpen(false); // Action successful hole dynamic modal-ti close kore dicchi
      } else {
        toast.error("Could not delete user. Try again.");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    // State dynamically control korar jonno isOpen / onOpenChange bind kora holo
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <Button
        size="sm"
        onPress={() => setIsOpen(true)}
        className="border border-red-500/20 bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all font-semibold rounded-xl"
      >
        Delete
      </Button>

      {/* HeroUI Backdrop structure */}
      <AlertDialog.Backdrop className="bg-black/50 backdrop-blur-sm">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121214] text-gray-900 dark:text-white rounded-2xl shadow-2xl p-6 mx-4">
            <AlertDialog.CloseTrigger className="hover:bg-gray-100 dark:hover:bg-zinc-800 transition rounded-lg" />
            
            {/* Header section with HeroUI Status Indicator Icon */}
            <AlertDialog.Header className="flex flex-col items-center pt-2 pb-2 text-center">
              <AlertDialog.Icon status="danger" className="mb-3 animate-pulse" />
              <AlertDialog.Heading className="text-xl font-bold">
                Delete User permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            {/* Content Body */}
            <AlertDialog.Body className="text-center px-2 py-4">
              <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                Are you absolutely sure you want to delete this user? This action{" "}
                <span className="font-semibold text-red-500">cannot be undone</span>.
              </p>
            </AlertDialog.Body>

            {/* Custom footer actions with loading tracking */}
            <AlertDialog.Footer className="flex gap-3 justify-center pt-2">
              <Button 
                slot="close" 
                variant="bordered"
                className="border-gray-200 dark:border-white/10 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 font-bold rounded-xl px-5 h-11"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              
              <Button 
                onPress={handleDelete} // manual programmatic state handler execution
                isLoading={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-5 h-11 shadow-lg shadow-red-500/20"
              >
                {isDeleting ? "Deleting..." : "Delete User"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}