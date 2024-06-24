import AuthSidebar from "@/features/AuthSidebar";
import ForgotPassword from "@/features/email";

export default function ForgotPasswordPage() {
  return <AuthSidebar children={<ForgotPassword />} />;
}
