import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

// data
import { usersData } from '../../lib/data/users';

// icons
import { DocumentIcon, LoadingSpinnerIcon } from '../../components/Common/SVGIcons';

// utils
import { ROUTE } from 'src/lib/api/routes/clientApiRoutes';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate against static user data
      const user = usersData.users.find(
        (u: any) => u.email === data.email && u.password === data.password
      );

      if (user) {
        // Store user info in localStorage for session management
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
          })
        );

        toast.success(`Welcome back, ${user.name}!`);
        navigate('/' + ROUTE.DASHBOARD);
      } else {
        toast.error(
          'Invalid email or password. Please check your credentials.'
        );
      }
    } catch {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        <div className='text-center mb-8'>
          <div className='mx-auto w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4'>
            <DocumentIcon className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome Back
          </h2>
          <p className='text-gray-600'>
            Sign in to access the prescription management system
          </p>
        </div>

        {/* Login Form */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email Address
                </label>
                <input
                  {...register('email')}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200'
                  placeholder='Enter your email'
                />
                {errors.email && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Password
                </label>
                <input
                  {...register('password')}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200'
                  placeholder='Enter your password'
                />
                {errors.password && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]'
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinnerIcon className='-ml-1 mr-3 h-5 w-5 text-white' />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
