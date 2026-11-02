import type { Metadata } from "next";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Privacy", description: "What Lightkeep collects and why." };

export default function Privacy() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy policy"
      updated="November 3, 2026"
      sections={[
        ["What we collect", "When you request a demo we collect your name, work email, company, team size and any message you add. We use it only to reply to you."],
        ["Cookies", "This site sets no advertising or tracking cookies. Signing in to the CMS sets a session cookie for editors only."],
        ["Who we share it with", "Demo requests are delivered by our email provider. We never sell or rent personal data."],
        ["Your rights", "Ask us to see, correct or delete your data at any time and we will respond within 30 days."],
        ["About this site", "Lightkeep is a fictional company created by Zordev as a portfolio project. Messages sent through this site go to Zordev and are used only to show that the form works."],
      ]}
    />
  );
}
