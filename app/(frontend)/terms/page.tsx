import type { Metadata } from "next";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Terms", description: "Terms of use for this website." };

export default function Terms() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of use"
      updated="November 3, 2026"
      sections={[
        ["This website", "Lightkeep is a fictional product. This site is a portfolio project by Zordev; nothing on it can be purchased and no service is provided."],
        ["Content", "Product names, customer stories, figures and quotes on this site are invented for demonstration."],
        ["Contact", "Questions about this site can be sent through the demo request form."],
      ]}
    />
  );
}
