import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Phone, MapPin, GraduationCap, Calendar } from "lucide-react";

const StudentDrawer = ({ open, student, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-orange-500 px-6 py-5 text-white">
              <h2 className="text-xl font-bold">
                Student Details
              </h2>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {student && (
              <div className="p-6">

                {/* Avatar */}
                <div className="flex flex-col items-center">

                  <img
                    src={student.image}
                    alt={student.name}
                    className="h-28 w-28 rounded-full border-4 border-orange-100 object-cover"
                  />

                  <h3 className="mt-4 text-xl font-bold">
                    {student.name}
                  </h3>

                  <span className="mt-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {student.status}
                  </span>

                </div>

                <div className="mt-8 space-y-5">

                  <Info
                    icon={<Mail size={18} />}
                    title="Email"
                    value={student.email}
                  />

                  <Info
                    icon={<Phone size={18} />}
                    title="Phone"
                    value={student.phone}
                  />

                  <Info
                    icon={<GraduationCap size={18} />}
                    title="Course"
                    value={student.course}
                  />

                  <Info
                    icon={<Calendar size={18} />}
                    title="Admission"
                    value={student.admissionDate}
                  />

                  <Info
                    icon={<MapPin size={18} />}
                    title="Address"
                    value={student.address}
                  />

                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Info = ({ icon, title, value }) => (
  <div className="flex items-start gap-4 rounded-xl border p-4">
    <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
      {icon}
    </div>

    <div>
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h4 className="font-semibold text-gray-800">
        {value}
      </h4>
    </div>
  </div>
);

export default StudentDrawer;