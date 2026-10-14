import { Metadata } from "next";
import NimoAuth from "@/components/NimoAuth";

export const metadata: Metadata = {
  title: "Log in to timo — Student Campus Portal",
  description: "Sign in to access your college anonymous feed and student community.",
};

export default function LoginPage() {
  return <NimoAuth initialMode="signin" />;
}
