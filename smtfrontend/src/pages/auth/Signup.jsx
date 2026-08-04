import BrandPanel from "../../components/auth/BrandPanel";
import SignupForm from "../../components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <BrandPanel />
      <SignupForm />
    </div>
  );
};

export default Signup;