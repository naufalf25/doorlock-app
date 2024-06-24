import LoginForm from '@/components/user/LoginForm';
import UserLayout from '@/components/user/UserLayout';

export default function Login() {
  return (
    <UserLayout>
      <main className="w-full p-4 min-h-[80vh] flex flex-col justify-center items-center gap-4">
        <h2 className="font-semibold text-lg">
          Masuk untuk mengakses aplikasi
        </h2>
        <LoginForm />
      </main>
    </UserLayout>
  );
}
