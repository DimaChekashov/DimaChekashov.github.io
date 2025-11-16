import LoginForm from "@/features/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-5xl font-bold mb-12">Admin Login</h1>
      <LoginForm />
    </div>
  );
}
