import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

const DeleteConfirmationModal = ({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  loading = false,
  onClose,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b px-6 py-4">

              <h2 className="text-xl font-bold text-gray-800">
                {title}
              </h2>

              <button
                onClick={onClose}
                disabled={loading}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* Body */}

            <div className="px-6 py-8 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                <AlertTriangle
                  size={42}
                  className="text-red-600"
                />

              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                Delete Confirmation
              </h3>

              <p className="mt-3 text-gray-500">
                {message}
              </p>

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">

              <button
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete
                  </>
                )}
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;