import { Metadata } from "next";
import NimoAuth from "@/components/NimoAuth";

export const metadata: Metadata = {
  title: "Log In — nimo",
  description: "Sign in to your verified nimo student account for Faridabad colleges.",
};

export default function LoginPage() {
  return <NimoAuth initialMode="signin" />;
}
