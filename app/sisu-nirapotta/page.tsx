"use client";

import SisuNirapottaDocument from "@/components/SisuNirapottaDocument";
import PolicyEditorLayout from "@/components/PolicyEditorLayout";

export default function SisuNirapottaPage() {
  const initialData = {
    name: "[নাম লিখুন]",
    age: "[বয়স]",
    childRelation: "[বাবুর]",
    childAge: "[বয়স]",
    insuranceAmount: "[টাকা]",
    policyTerm: "[বছর]",
    annualPremium: "[টাকা]",
    maturityYears: "[বছর]",
    maturityAmount: "[টাকা]",
  };

  return (
    <PolicyEditorLayout
      title="শিশু নিরাপত্তা বীমা প্রস্তাব"
      defaultFilename="sisu-nirapotta-proposal.pdf"
    >
      <SisuNirapottaDocument initialData={initialData} />
    </PolicyEditorLayout>
  );
}
