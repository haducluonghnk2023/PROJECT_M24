import { FormField } from '../common/FormField';
import { Button } from '../common/Button';
import { useForm } from '../../hooks/useForm';
import { validateLoginForm, validateRegisterForm, LoginFormData, RegisterFormData } from '../../utils/validation';

interface AuthFormProps<T extends LoginFormData | RegisterFormData> {
  mode: 'login' | 'register';
  onSubmit: (data: T) => Promise<void>;
  loading?: boolean;
  errorMessage?: string;
  showRegisterLink?: boolean;
  showLoginLink?: boolean;
}

export const AuthForm = <T extends LoginFormData | RegisterFormData>({
  mode,
  onSubmit,
  loading = false,
  errorMessage,
  showRegisterLink = true,
  showLoginLink = true,
}: AuthFormProps<T>) => {
  const isLogin = mode === 'login';
  
  // Login form
  const loginForm = useForm<LoginFormData>({
    initialValues: { email: '', password: '' },
    validate: validateLoginForm,
    onSubmit: (data) => onSubmit(data as T),
  });

  // Register form
  const registerForm = useForm<RegisterFormData>({
    initialValues: { email: '', username: '', password: '', repassword: '', role: 0, status: 1 },
    validate: validateRegisterForm,
    onSubmit: (data) => onSubmit(data as T),
  });

  const { values, errors, handleChange, handleSubmit } = isLogin ? loginForm : registerForm;

  const title = isLogin ? 'Đăng nhập' : 'Tạo tài khoản';
  const submitText = isLogin ? 'Đăng nhập' : 'Tạo tài khoản';
  const linkText = isLogin ? 'Đăng ký tại đây' : 'Đăng nhập tại đây';
  const linkHref = isLogin ? '/register/user' : '/register/user/login';
  const linkDescription = isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?';

  return (
    <div className="flex flex-col items-center pt-6">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {title}
          </h1>
          
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="example@example.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            {!isLogin && (
              <FormField
                label="Tên người dùng"
                name="username"
                placeholder="admin123"
                value={(values as RegisterFormData).username}
                onChange={handleChange}
                error={errors.username}
                required
              />
            )}

            <FormField
              label={isLogin ? 'Password' : 'Mật khẩu'}
              name="password"
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {!isLogin && (
              <FormField
                label="Nhập lại mật khẩu"
                name="repassword"
                type="password"
                placeholder="••••••••"
                value={(values as RegisterFormData).repassword}
                onChange={handleChange}
                error={errors.repassword}
                required
              />
            )}

            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              {submitText}
            </Button>

            {(isLogin ? showRegisterLink : showLoginLink) && (
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {linkDescription}{' '}
                <a
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  href={linkHref}
                >
                  {linkText}
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
