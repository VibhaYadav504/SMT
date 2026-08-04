import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import StudentForm from "./StudentForm";

const StudentModal = ({
  open,
  onClose,
  onSubmit,
  initialValues = {},
  loading = false,
  mode = "add",
}) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden"
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {mode === "add"
                  ? "Add Student"
                  : "Edit Student"}
              </h2>

              <p className="text-orange-100 text-sm mt-1">
                Fill student details carefully.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body */}

          <div className="max-h-[75vh] overflow-y-auto p-8">
            <StudentForm
              initialValues={initialValues}
              onSubmit={onSubmit}
            />
          </div>

          {/* Loading Overlay */}

          {loading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>

                <p className="font-medium text-gray-700">
                  Saving Student...
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StudentModal;