import React, { useState } from 'react';
import { ShieldCheck, X, AlertCircle, Loader2, Eye, EyeOff, Zap, CheckCircle2 } from 'lucide-react';
import { apiAdminLogin } from '../utils/api';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, user: { name: string; email: string; role: 'ADMIN' }) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await apiAdminLogin(username, password);

      if (!result.ok || !result.token || !result.user) {
        throw new Error(result.error || 'Login gagal. Periksa username dan password admin.');
      }

      onLoginSuccess(result.token, result.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal login. Gunakan username: admin dan password: admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                Login Administrator
              </h2>
              <p className="text-[11px] text-zinc-500">
                Kelola bank soal, edit opsi jawaban & pantau statistik
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Credentials Info Box */}
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30 text-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Kredensial Login Admin:
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-[10.5px] font-bold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 transition-colors shadow-2xs"
            >
              <Zap className="h-3 w-3" />
              Isi Otomatis
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-800 dark:text-emerald-400 font-mono">
            <div>
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">Username:</span>
              <code className="font-bold bg-white/70 dark:bg-zinc-900/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">
                admin
              </code>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">Password:</span>
              <code className="font-bold bg-white/70 dark:bg-zinc-900/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">
                admin123
              </code>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs font-mono">
          <div>
            <label className="block mb-1 font-semibold text-zinc-700 dark:text-zinc-300">
              Username / Email Admin
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin atau rijalhisyam234@gmail.com"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-zinc-700 dark:text-zinc-300">
              Password Admin
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 pr-9 py-2 text-xs font-sans text-zinc-900 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-2xs transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>Masuk Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
