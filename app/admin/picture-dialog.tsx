import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PictureDialog({
  url,
  isDialogOpen,
  setIsDialogOpen,
}: {
  url: any;
  isDialogOpen: any;
  setIsDialogOpen: any;
}) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-500">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold"></DialogTitle>
          <DialogDescription className="font-serif"></DialogDescription>
        </DialogHeader>
        <div>
          {" "}
          <img
            src={url || "/placeholder.svg"}
            alt={"No image"}
            className="h-full w-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
