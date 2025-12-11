"use client";

import { useRef, useEffect } from "react";

interface EditableDocumentProps {
  initialData: {
    name: string;
    age: string;
    pensionStartAge: string;
    monthlyPension: string;
    annualPremium: string;
    depositPeriod: string;
    totalDeposit: string;
  };
}

export default function EditableDocument({
  initialData,
}: EditableDocumentProps) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const ageRef = useRef<HTMLSpanElement>(null);
  const pensionStartAgeRef = useRef<HTMLSpanElement>(null);
  const monthlyPensionRef = useRef<HTMLSpanElement>(null);
  const annualPremiumRef = useRef<HTMLSpanElement>(null);
  const depositPeriodRef = useRef<HTMLSpanElement>(null);
  const totalDepositRef = useRef<HTMLSpanElement>(null);

  // Initialize content only once
  useEffect(() => {
    if (nameRef.current && !nameRef.current.textContent) {
      nameRef.current.textContent = initialData.name;
    }
    if (ageRef.current && !ageRef.current.textContent) {
      ageRef.current.textContent = initialData.age;
    }
    if (pensionStartAgeRef.current && !pensionStartAgeRef.current.textContent) {
      pensionStartAgeRef.current.textContent = initialData.pensionStartAge;
    }
    if (monthlyPensionRef.current && !monthlyPensionRef.current.textContent) {
      monthlyPensionRef.current.textContent = initialData.monthlyPension;
    }
    if (annualPremiumRef.current && !annualPremiumRef.current.textContent) {
      annualPremiumRef.current.textContent = initialData.annualPremium;
    }
    if (depositPeriodRef.current && !depositPeriodRef.current.textContent) {
      depositPeriodRef.current.textContent = initialData.depositPeriod;
    }
    if (totalDepositRef.current && !totalDepositRef.current.textContent) {
      totalDepositRef.current.textContent = initialData.totalDeposit;
    }
  }, [initialData]);

  return (
    <div
      id="editable-document-content"
      style={{
        fontFamily: "Noto Sans Bengali, sans-serif",
        lineHeight: "1.8",
        fontSize: "20px",
        color: "#000000",
      }}
    >
      {/* Name - Editable */}
      <div style={{ marginBottom: "8px" }}>
        <span
          ref={nameRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            fontWeight: "700",
            fontSize: "32px",
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          className="editable-field"
        />
      </div>

      {/* Age Line */}
      <div style={{ marginBottom: "8px" }}>
        <span>আপনার বর্তমান বয়স </span>
        <span
          ref={ageRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          className="editable-field"
        />
        <span> বছর।</span>
      </div>

      {/* Pension Details */}
      <div style={{ marginBottom: "8px" }}>
        <span
          ref={pensionStartAgeRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          className="editable-field"
        />
        <span> বছর পর থেকে মাসে </span>
        <span
          ref={monthlyPensionRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          className="editable-field"
        />
        <span> টাকা</span>
        <span> পেনশনের জন্য বার্ষিক প্রিমিয়াম </span>
        <span
          ref={annualPremiumRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          className="editable-field"
        />
        <span>/= টাকা।</span>
      </div>

      {/* Deposit Line */}
      <div style={{ marginBottom: "32px" }}>
        <span
          ref={depositPeriodRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          className="editable-field"
        />
        <span> বছরে মোট জমা হবে </span>
        <span
          ref={totalDepositRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          className="editable-field"
        />
        <span>/= টাকা।</span>
      </div>

      {/* Features Section - Static */}
      <div style={{ marginTop: "16px", marginBottom: "8px" }}>
        <h2
          style={{ fontWeight: "700", fontSize: "28px", marginBottom: "8px" }}
        >
          বৈশিষ্ট্যাবলী:
        </h2>
      </div>

      {/* Additional Features - Static */}
      <div>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "16px",
            margin: 0,
          }}
        >
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • মেয়াদপূর্তিতে বয়সের জীবনের জন্য আজীবন পেনশনের ব্যবস্থা অথবা
            মেয়াদপূর্তিতে পেনশনের টাকার ৫০% অথবা ১০০% সমর্পণ (কম্যুটেশন) মূল্য
            পাওয়ার সুবিধা।
          </li>
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • পেনশন প্রদান শুরুর ১০ (দশ) বছরের মধ্যে মৃত্যু হলে দশ বছরের অবশিষ্ট
            সময়ের জন্য পেনশনভোগীর মনোনীতকের (নমিনি) পেনশন লাভের গ্যারান্টি।
          </li>
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • বীমাগ্রাহক বীমার মেয়াদের মধ্যে মৃত্যুবরণ করলে মনোনীত ব্যক্তিকে
            মৃত্যুর সাথে সাথেই বার্ষিক পেনশনের ৫ গুণ পরিমাণ অর্থ এবং মৃত্যুর
            পরবর্তী ১০ বছর পর্যন্ত বার্ষিক পেনশন প্রদান করা হবে।
          </li>
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • বীমার মেয়াদে শর্তানুযায়ী বীমাগ্রাহক পরিশোধিত মূল্য, সমর্পণ ও ঋণ
            গ্রহণ করার সুবিধা প্রাপ্য হবেন।
          </li>
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • প্রদত্ত প্রিমিয়ামের উপর আয়কর রেয়াত পাওয়া যাবে।
          </li>
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • এই বীমার সঙ্গে অতিরিক্ত সুবিধাবর বীমা Supplementary benefit গ্রহণ
            করা যাবে।
          </li>
          <li style={{ marginBottom: "0", paddingLeft: "4px" }}>
            • মরণোত্তর দাবীর টাকা আয়করমুক্ত।
          </li>
        </ul>
      </div>
    </div>
  );
}
