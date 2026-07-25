/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import headerImage from "@/public/header-image.png";

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

const handlePaste = (e: React.ClipboardEvent<HTMLSpanElement>) => {
  e.preventDefault();
  const plain = e.clipboardData.getData("text/plain").replace(/[\r\n]+/g, " ");
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(plain));
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
  if (e.key === "Enter") e.preventDefault();
};

export default function PensionPolicyDocument({
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
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={headerImage.src}
          alt="জীবন বীমা কর্পোরেশন (একমাত্র রাষ্ট্রীয় জীবন বীমা প্রতিষ্ঠান)"
          style={{ height: "120px", objectFit: "contain" }}
        />
      </header>

      {/* Policy title */}
      <div style={{ textAlign: "center", margin: "28px 0 24px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "#00ab41",
            margin: 0,
            textDecoration: "underline",
          }}
        >
          পেনশন পলিসি (লাভসহ)
        </h2>
      </div>
      {/* Name - Editable */}
      <div style={{ marginBottom: "8px" }}>
        <span
          ref={nameRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            color: "#0000FF",
            fontStyle: "italic",
            fontWeight: "700",
            fontSize: "32px",
            outline: "none",
            display: "inline",
            backgroundColor: "transparent",
            padding: "2px 4px",
            borderRadius: "2px",
            transition: "background-color 0.15s ease",
          }}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span>/= টাকা।</span>
      </div>

      {/* Features Section - Static */}
      <div style={{ marginTop: "16px", marginBottom: "8px" }}>
        <h2
          style={{
            fontWeight: "700",
            fontSize: "28px",
            marginBottom: "8px",
            color: "#00ab41",
          }}
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
          <li
            style={{
              marginBottom: "12px",
              paddingLeft: "4px",
              color: "#FF0000",
            }}
          >
            • বীমাগ্রাহক বীমার মেয়াদের মধ্যে মৃত্যুবরণ করলে মনোনীত ব্যক্তিকে
            মৃত্যুর সাথে সাথেই বার্ষিক পেনশনের ৫ গুণ পরিমাণ অর্থ এবং মৃত্যুর
            পরবর্তী ১০ বছর পর্যন্ত বার্ষিক পেনশন প্রদান করা হবে।
          </li>
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • বীমার মেয়াদে শর্তানুযায়ী বীমাগ্রাহক পরিশোধিত মূল্য, সমর্পণ ও ঋণ
            গ্রহণ করার সুবিধা প্রাপ্য হবেন।
          </li>
          <li
            style={{
              marginBottom: "12px",
              paddingLeft: "4px",
              color: "#FF0000",
            }}
          >
            • প্রদত্ত প্রিমিয়ামের উপর আয়কর রেয়াত পাওয়া যাবে।
          </li>
          <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
            • এই বীমার সঙ্গে অতিরিক্ত সুবিধার বীমা Supplementary benefit গ্রহণ
            করা যাবে।
          </li>
          <li style={{ marginBottom: "0", paddingLeft: "4px" }}>
            • মরণোত্তর দাবীর টাকা আয়করমুক্ত।
          </li>
        </ul>
      </div>

      {/* Para 8 – annual income */}
      <p style={{ marginTop: "8px", color: "#00ab41", fontWeight: "700" }}>
        এছাড়া প্রতিবছর আপনার বার্ষিক আয়ের ১৫% প্রিমিয়াম হিসাবে সঞ্চয় দেখাতে
        পারবেন। এটি ট্যাক্স ফ্রি।
      </p>
    </div>
  );
}
