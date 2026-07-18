"use client";

import MarriageEndowmentDocument from "@/components/MarriageEndowmentDocument";
import PolicyEditorLayout from "@/components/PolicyEditorLayout";

export default function MarriageEndowmentPage() {
  const initialData = {
    name: "[নাম লিখুন]",
    age: "[বয়স]",
    insuranceAmount: "[অংক]",
    policyTerm: "[মেয়াদ]",
    totalDeposit: "[টাকা]",
    maturityAmount: "[টাকা]",
  };

  return (
    <PolicyEditorLayout
      title="ম্যারেজ এন্ডাওমেন্ট পলিসি (লাভসহ)"
      defaultFilename="marriage-endowment-proposal.pdf"
    >
      <MarriageEndowmentDocument initialData={initialData} />
    </PolicyEditorLayout>
  );
}
