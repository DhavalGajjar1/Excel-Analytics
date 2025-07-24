// // ✅ Enhanced AuthForm.js - Landing Style
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [role, setRole] = useState('user');
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const API_URL = 'http://localhost:8080/api/auth';
//     const endpoint = isLogin ? '/login' : '/register';

//     const payload = {
//       email: form.email,
//       password: form.password,
//       ...(isLogin ? {} : { name: form.name, role }),
//     };

//     try {
//       const res = await fetch(API_URL + endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();

//       if (!res.ok) return alert(data.message || 'Something went wrong');

//       if (isLogin) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         navigate(data.user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
//       } else {
//         alert('Registered successfully! Please login.');
//         setIsLogin(true);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Server error');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
//           {isLogin ? 'Login' : 'Register'} as <span className="text-blue-500">{role.toUpperCase()}</span>
//         </h2>

//         {!isLogin && (
//           <div className="flex justify-center gap-4 mb-4">
//             <button
//               type="button"
//               onClick={() => setRole('user')}
//               className={`px-4 py-1 rounded-full font-medium transition ${
//                 role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//               }`}
//             >User</button>
//             <button
//               type="button"
//               onClick={() => setRole('admin')}
//               className={`px-4 py-1 rounded-full font-medium transition ${
//                 role === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//               }`}
//             >Admin</button>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           )}

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             {isLogin ? 'Login' : 'Register'}
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           {isLogin ? (
//             <p>
//               Don't have an account?{' '}
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className="text-blue-600 hover:underline"
//               >Register here</button>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{' '}
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className="text-blue-600 hover:underline"
//               >Login here</button>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;