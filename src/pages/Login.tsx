import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Mail, Lock } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { girisYap, kullanici } = useAuth();

  useEffect(() => {
    // Sayfa yüklendiğinde storage'ı kontrol et
    const isLoggedOut = sessionStorage.getItem('isLoggedOut') === 'true' || 
                       localStorage.getItem('isLoggedOut') === 'true';

    // Eğer kullanıcı çıkış yapmışsa ve sayfa yenileniyorsa, login sayfasında kal
    if (isLoggedOut) {
      return;
    }

    // Kullanıcı varsa ve çıkış yapmamışsa anasayfaya yönlendir
    if (kullanici) {
      const from = (location.state as any)?.from?.pathname || '/anasayfa';
      navigate(from, { replace: true });
    }
  }, [kullanici, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await girisYap(email, password);
      if (success) {
        const from = (location.state as any)?.from?.pathname || '/anasayfa';
        navigate(from, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Arkaplan deseni */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        {/* Blur efekti */}
        <div className="absolute inset-0 bg-yellow-500/10 backdrop-blur-[2px] z-0"></div>
        
        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo ve başlık */}
          <div className="flex flex-col items-center">
            <div className="bg-white/80 backdrop-blur-lg rounded-full p-4 shadow-xl ring-1 ring-yellow-500/20">
              <Sun className="h-20 w-20 text-yellow-500" />
            </div>
            
            <div className="mt-6 text-center">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                EDEON ENERJİ
              </h1>
              <h2 className="mt-2 text-xl font-medium text-gray-600">
                Solar Enerjin
              </h2>
              <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                ARIZA TAKİP SİSTEMİ
              </h3>
            </div>
          </div>

          {/* Giriş formu */}
          <div className="mt-8">
            <div className="bg-white/80 backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 ring-1 ring-gray-900/5">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    E-posta adresi
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent sm:text-sm transition-all duration-200"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Şifre
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent sm:text-sm transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <LoadingSpinner size="sm" />
                        <span className="ml-2">Giriş yapılıyor...</span>
                      </div>
                    ) : (
                      'Giriş Yap'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};