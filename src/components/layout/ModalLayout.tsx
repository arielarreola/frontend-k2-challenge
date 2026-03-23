import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type ModalLayoutParams = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function ModalLayout({
  open,
  onClose,
  title,
  children,
}: ModalLayoutParams) {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 backdrop-blur-2xl  data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-gray-900 dark:text-white"
            >
              {title}
            </DialogTitle>
            <div className="mt-4">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
