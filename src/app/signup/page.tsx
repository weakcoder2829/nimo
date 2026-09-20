import { Metadata } from "next";
import NimoAuth from "@/components/NimoAuth";

export const metadata: Metadata = {
  title: "Sign Up — nimo",
  description: "Create an anonymous student account for Faridabad colleges on nimo.",
};

export default function SignUpPage() {
  return <NimoAuth initialMode="signup" />;
}
