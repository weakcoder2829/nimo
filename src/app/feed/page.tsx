import { Metadata } from "next";
import LoggedInAppView from "@/components/LoggedInAppView";

export const metadata: Metadata = {
  title: "Campus Feed — nimo",
  description: "Live student chatter and anonymous confession feed.",
};

export default function FeedPage() {
  return <LoggedInAppView />;
}
