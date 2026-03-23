import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTrash } from "react-icons/fa";

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  isLoading?: boolean;
};

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  productName,
  isLoading = false,
}: DeleteConfirmDialogProps) {
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
            className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-gray-900 dark:text-white flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <FaTrash className="text-red-600 dark:text-red-400" />
              </div>
              Confirmar Eliminación
            </DialogTitle>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ¿Estás seguro de que quieres eliminar el producto{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  "{productName}"
                </span>
                ?
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Eliminar
                  </>
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
