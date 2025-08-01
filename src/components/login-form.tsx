"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/common/shadcn/button";
import { Card, CardContent } from "@/common/shadcn/card";
import { Input } from "@/common/shadcn/input";
import { Label } from "@/common/shadcn/label";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction, loginDto, loginSchema } from "@/services/authService";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [login, setLogin] = React.useState<loginDto>({} as loginDto);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parse = loginSchema.safeParse(login);
    if (!parse.success) {
      setError(parse.error.errors[0].message);
      return;
    }
    try {
      const res = await loginAction(login);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Login success");
      router.push("/content/beranda/home");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="flex justify-center items-center">
                {error && (
                  <p className="text-sm italic text-red-500/65">{error}</p>
                )}
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
