"use client";

import PensionPolicyDocument from "@/components/PensionPolicyDocument";
import PolicyEditorLayout from "@/components/PolicyEditorLayout";

export default function PensionPage() {
  const initialData = {
    name: "[নাম লিখুন]",
    age: "[বয়স]",
    pensionStartAge: "[বছর]",
    monthlyPension: "[টাকা]",
    annualPremium: "[টাকা]",
    depositPeriod: "[বছর]",
    totalDeposit: "[টাকা]",
  };

  return (
    <PolicyEditorLayout
      title="পেনশন পলিসি প্রস্তাব"
      defaultFilename="pension-policy-proposal.pdf"
    >
      <PensionPolicyDocument initialData={initialData} />
    </PolicyEditorLayout>
  );
}
