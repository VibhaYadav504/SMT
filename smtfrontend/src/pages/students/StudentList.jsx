import { useMemo, useState } from "react";

import PageContainer from "../../components/common/PageContainer";
import StudentToolbar from "../../components/students/StudentToolbar";
import StudentTable from "../../components/students/StudentTable";
import StudentModal from "../../components/students/StudentModal";
import StudentDrawer from "../../components/students/StudentDrawer";
import StudentStats from "../../components/students/StudentStats";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";
import { students as studentData } from "../../data/students";

const StudentList = () => {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);
const [modalMode, setModalMode] = useState("add");
const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);
  const filteredStudents = useMemo(() => {
    return studentData.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.phone.includes(search);

      const matchesCourse =
        !course || student.course === course;

      const matchesStatus =
        !status || student.status === status;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesStatus
      );
    });
  }, [search, course, status]);

const handleAddStudent = () => {
  setModalMode("add");
  setSelectedStudent(null);
  setOpenModal(true);
};

const handleEdit = (student) => {
  setModalMode("edit");
  setSelectedStudent(student);
  setOpenModal(true);
};

const handleView = (student) => {
  setSelectedStudent(student);
  setDrawerOpen(true);
};

const handleDelete = (student) => {
  setSelectedStudent(student);
  setDeleteOpen(true);
};

  const handleSubmit = async (formData) => {
    setLoading(true);

    console.log(formData);

    // API Call Here

    setTimeout(() => {
      setLoading(false);
      setOpenModal(false);
    }, 1000);
  };
  const confirmDelete = async () => {
  setDeleteLoading(true);

  // API Call Here

  setTimeout(() => {
    console.log("Deleted :", selectedStudent);

    setDeleteLoading(false);
    setDeleteOpen(false);
    setSelectedStudent(null);
  }, 1000);
};

  return (
    <PageContainer
      title="Students"
      subtitle="Manage all registered students"
    >
      <StudentStats
    students={filteredStudents}
/>


      <StudentToolbar
        search={search}
        setSearch={setSearch}
        course={course}
        setCourse={setCourse}
        status={status}
        setStatus={setStatus}
       onAddStudent={handleAddStudent}
        onImport={() => {}}
        onExport={() => {}}
        onReset={() => {
          setSearch("");
          setCourse("");
          setStatus("");
        }}
      />

      <StudentTable
    students={filteredStudents}
    onView={handleView}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>

      <StudentModal
        open={openModal}
        loading={loading}
       mode={modalMode}
initialValues={selectedStudent || {}}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />

      <StudentDrawer
    open={drawerOpen}
    student={selectedStudent}
    onClose={() => setDrawerOpen(false)}
/>

<DeleteConfirmationModal
  open={deleteOpen}
  loading={deleteLoading}
  title="Delete Student"
  message={`Are you sure you want to delete ${
    selectedStudent?.name || "this student"
  }? This action cannot be undone.`}
  onClose={() => setDeleteOpen(false)}
  onConfirm={confirmDelete}
/>

    </PageContainer>
  );
};

export default StudentList;