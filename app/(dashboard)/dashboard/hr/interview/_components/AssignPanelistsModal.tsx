"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

export default function AssignPanelistsModal({
  interviews,
  users,
}: {
  interviews: any[];
  users: any[];
}) {
  const [selectedInterview, setSelectedInterview] = useState("");
  const [selectedPanelists, setSelectedPanelists] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAssign = async () => {
    if (!selectedInterview || selectedPanelists.length === 0) {
      toast({
        title: "Error",
        description: "Please select an interview and at least one panelist",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/interviews/${selectedInterview}/panelists`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            panelists: selectedPanelists,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign panelists");
      }

      toast({
        title: "Success",
        description: "Panelists assigned successfully",
      });
      setIsOpen(false);
      // Refresh the page to see changes
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign panelists",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePanelist = (userId: string) => {
    setSelectedPanelists((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Assign Panelists</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Panelists to Interview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="interview">Select Interview</Label>
            <Select
              value={selectedInterview}
              onValueChange={setSelectedInterview}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an interview" />
              </SelectTrigger>
              <SelectContent>
                {interviews.map((interview) => (
                  <SelectItem key={interview.id} value={interview.id}>
                    {interview.name} - {interview.post}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Select Panelists</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={selectedPanelists.includes(user.id)}
                    onCheckedChange={() => togglePanelist(user.id)}
                  />
                  <label
                    htmlFor={`user-${user.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {user.name} ({user.email})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-800"
            >
              {isLoading ? "Assigning..." : "Assign Panelists"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
