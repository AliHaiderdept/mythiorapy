import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthModal() {
  const {
    authOpen,
    setAuthOpen,
    mode,
    setMode,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: mode === "register" ? name : undefined,
      email,
      password,
    };

    console.log(data);

    // Yahan backend API call hogi
  };

  if (!authOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray/300 p-4" onClick={() => setAuthOpen(false)}>
      <div className="w-full max-w-md rounded-xl bg-gradient-to-br from-gray-600 via-white to-gray-400 border border-stone/20 backdrop-blur-xl p-6 text-slate-900 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            {mode === "login"
              ? "Login to your account"
              : "Create an account"}
          </h2>

          <p className="mt-1 text-sm text-slate-800">
            {mode === "login"
              ? "Enter your credentials to continue."
              : "Create your account to get started."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {mode === "register" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2 w-full">
            <Label htmlFor="password">Password</Label>

            <div className="relative w-full">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full pr-10"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full border border-slate/20 hover:bg-gray-500">
            {mode === "login" ? "Login" : "Create Account"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border border-slate/20 hover:bg-gray-500"
          >
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}

            <button
              type="button"
              onClick={() =>
                setMode(mode === "login" ? "register" : "login")
              }
              className="font-medium underline"
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}