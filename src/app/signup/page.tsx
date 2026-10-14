import { Metadata } from "next";
import NimoAuth from "@/components/NimoAuth";

export const metadata: Metadata = {
  title: "Sign Up — timo",
  description: "Create an anonymous student account for Faridabad colleges on timo.",
};

export default function SignUpPage() {
  return <NimoAuth initialMode="signup" />;
}
