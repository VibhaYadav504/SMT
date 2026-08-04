import BrandPanel from "../../components/auth/BrandPanel";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <BrandPanel />
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;