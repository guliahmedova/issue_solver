import AuthSidebar from "@/features/AuthSidebar";
import LoginForm from "@/features/Login";

const Home = () => {
  return <AuthSidebar children={<LoginForm />} />;
};

export default Home;
