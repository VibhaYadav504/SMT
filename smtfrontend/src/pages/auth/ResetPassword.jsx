import BrandPanel from "../../components/auth/BrandPanel";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <BrandPanel />
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;