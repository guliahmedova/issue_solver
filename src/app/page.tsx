import AuthSidebar from "@/features/AuthSidebar";
import LoginForm from "@/features/Login";
import EmailDetermine from "@/features/email";

const Home = () => {
  return <AuthSidebar children={<LoginForm />} />;
};

export default Home;
