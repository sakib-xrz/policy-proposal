"use client";

import ThreeInstalmentDocument from "@/components/ThreeInstalmentDocument";
import PolicyEditorLayout from "@/components/PolicyEditorLayout";

export default function ThreeInstalmentPage() {
  const initialData = {
    name: "[নাম লিখুন]",
    age: "[বয়স]",
    insuranceAmount: "[টাকা]",
    policyTerm: "[মেয়াদ]",
    annualPremium: "[টাকা]",
    yr1: "[৬]",
    totalDeposit6Yr: "[টাকা]",
    return6Yr: "[টাকা]",
    remaining6Yr: "[টাকা]",
    yr2: "[১২]",
    totalDeposit12Yr: "[টাকা]",
    return12Yr: "[টাকা]",
    remaining12Yr: "[টাকা]",
    yr3: "[১৮]",
    totalDeposit18Yr: "[টাকা]",
    return18Yr: "[টাকা]",
    return18YrEq: "[টাকা]",
    bonus18Yr: "[বোনাস]",
    totalMaturityAmount: "[টাকা]",
  };

  return (
    <PolicyEditorLayout
      title="৩ কিস্তি বীমা (লাভসহ)"
      defaultFilename="3-kisti-bima-proposal.pdf"
    >
      <ThreeInstalmentDocument initialData={initialData} />
    </PolicyEditorLayout>
  );
}
