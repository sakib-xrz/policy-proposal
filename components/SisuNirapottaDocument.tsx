/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import headerImage from "@/public/header-image.png";

interface SisuNirapottaDocumentProps {
  initialData: {
    name: string;
    age: string;
    childAge: string;
    insuranceAmount: string;
    policyTerm: string;
    annualPremium: string;
    maturityYears: string;
    maturityAmount: string;
  };
}

const fieldStyle: React.CSSProperties = {
  outline: "none",
  display: "inline",
  backgroundColor: "transparent",
  padding: "2px 4px",
  borderRadius: "2px",
  transition: "background-color 0.15s ease",
};

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

const deathBenefitRows = [
  ["১ বছর", "১০%"],
  ["২ বছর", "২০%"],
  ["৩ বছর", "৩০%"],
  ["৪ বছর", "৪০%"],
  ["৫ বছর", "৫০%"],
  ["৬ বছর", "৬০%"],
  ["৭ বছর", "৭০%"],
  ["৮ বছর", "৮০%"],
  ["৯ বছর", "৯০%"],
];

export default function SisuNirapottaDocument({
  initialData,
}: SisuNirapottaDocumentProps) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const ageRef = useRef<HTMLSpanElement>(null);
  const childAgeRef = useRef<HTMLSpanElement>(null);
  const insuranceAmountRef = useRef<HTMLSpanElement>(null);
  const policyTermRef = useRef<HTMLSpanElement>(null);
  const annualPremiumRef = useRef<HTMLSpanElement>(null);
  const maturityYearsRef = useRef<HTMLSpanElement>(null);
  const maturityAmountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const seed = (
      ref: React.RefObject<HTMLSpanElement | null>,
      value: string,
    ) => {
      if (ref.current && !ref.current.textContent) {
        ref.current.textContent = value;
      }
    };
    seed(nameRef, initialData.name);
    seed(ageRef, initialData.age);
    seed(childAgeRef, initialData.childAge);
    seed(insuranceAmountRef, initialData.insuranceAmount);
    seed(policyTermRef, initialData.policyTerm);
    seed(annualPremiumRef, initialData.annualPremium);
    seed(maturityYearsRef, initialData.maturityYears);
    seed(maturityAmountRef, initialData.maturityAmount);
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
      {/* Header */}
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

      {/* Name */}
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

      {/* Proposer age */}
      <div style={{ marginBottom: "4px" }}>
        <span>আপনার বর্তমান বয়স </span>
        <span
          ref={ageRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span> বছর,</span>
      </div>

      {/* Child age */}
      <div style={{ marginBottom: "4px" }}>
        <span>বাবুর বয়স </span>
        <span
          ref={childAgeRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span> বছর,</span>
      </div>

      {/* Insurance amount */}
      <div style={{ marginBottom: "4px" }}>
        <span>বীমার অংক </span>
        <span
          ref={insuranceAmountRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span>/= টাকা,</span>
      </div>

      {/* Policy term */}
      <div style={{ marginBottom: "16px" }}>
        <span>বীমার মেয়াদ </span>
        <span
          ref={policyTermRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span> বছর।</span>
      </div>

      {/* Annual premium */}
      <div style={{ marginBottom: "4px" }}>
        <span>প্রতি বছর জমা দিতে হবে, </span>
        <span
          ref={annualPremiumRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span>/= টাকা।</span>
      </div>

      {/* Maturity amount */}
      <div style={{ marginBottom: "32px" }}>
        <span
          ref={maturityYearsRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span> বছর পর ফেরত পাওয়া যাবে </span>
        <span
          ref={maturityAmountRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span>/= টাকা।</span>
      </div>

      {/* Policy title */}
      <div style={{ textAlign: "center", margin: "28px 0 24px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "#000000",
            margin: 0,
            textDecoration: "underline",
          }}
        >
          শিশু নিরাপত্তা বীমা (লাভসহ)
        </h2>
      </div>

      {/* Static policy description */}
      <div style={{ lineHeight: "2", textAlign: "justify" }}>
        {/* Para 1 – joint life, proposer rules */}
        <p style={{ marginBottom: "16px" }}>
          এই বীমা পরিকল্পনার যুগাভাবে প্রিমিয়ামদাতা ও শিশুর জীবনের উপর দেওয়া
          হয়। সাধারণত: শিশুর পিতা এই পরিকল্পনা প্রিমিয়ামদাতা বলে বিবেচিত হন।
          যদি পিতা জীবিত না থাকেন অথবা বীমা গ্রহণে অযোগ্য বলে বিবেচিত হন তাহলে
          শিশুর মাতা পরিকল্পনায় প্রিমিয়ামদাতা হতে পারেন। শিশুর মাতাকে সে
          ক্ষেত্রে অবশ্যই শিক্ষিতা (মাধ্যমিক বা সমমানের পরীক্ষা পাশ) হতে হবে এবং
          যে কোন বৃত্তি থেকে তাহার নিজস্ব রোজগার থাকতে হবে। মাতা-পিতা ভিন্ন অন্য
          কেহ এই পরিকল্পনায় প্রিমিয়ামদাতা হতে পারেন না।
        </p>

        {/* Para 2 – age and term limits */}
        <p style={{ marginBottom: "16px" }}>
          এই পরিকল্পনার অধীনে শিশুর মেয়াদ-পূর্তিকালীন বয়স ১৮ হতে ২৫ বছরের
          মধ্যে হতে হবে। এই বীমা সর্বনিম্ন ৬ মাস বয়স্ক শিশুর জন্য নেওয়া যেতে
          পারে এবং ৮ থেকে ২৪ বছর মেয়াদের হতে পারে। কোন ক্রমেই এই পরিকল্পনায়
          বীমার অংক ৬,০০০.০০ টাকার কম হবে না।
        </p>

        {/* Para 3 – medical examination */}
        <p style={{ marginBottom: "16px" }}>
          ডাক্তারী পরীক্ষাবিহীন কোন প্রস্তাব-পত্র বিবেচনা করা যাবে না। ডাক্তারী
          পরীক্ষায় শিশু ও প্রিমিয়ামদাতা উভয়েরই উন্নতমান জীবন হিসেবে
          প্রতীয়মান হলে প্রস্তাবপত্র গৃহীত হবে।
        </p>

        {/* Para 4 – multi-protection + (ক) and (খ) */}
        <p style={{ marginBottom: "8px" }}>
          এই পরিকল্পনার অধীনে শিশুর জন্য বহুমুখী নিরাপত্তা প্রদান করা হয়। যদি
          মেয়াদ-পূর্তির পূর্বে প্রিমিয়ামদাতার মৃত্যু হয় তাহলে মৃত্যুর দিন
          থেকে মেয়াদপূর্তি পর্যন্ত দেয় প্রিমিয়াম মওকুফ হয়ে যায় এবং শিশুকে
          নিম্নোক্ত সুবিধাসমূহ দেওয়া হয় :
        </p>
        <p style={{ marginBottom: "8px" }}>
          <strong>(ক)</strong> প্রতি হাজার বীমার জন্য বার্ষিক ১০০ টাকা হারে
          মৃত্যু কাল হতে শুরু করে মেয়াদপূর্তি পর্যন্ত অথবা মেয়াদপূর্তির পূর্বে
          শিশুর মৃত্যু হলে শিশুর মৃত্যুর দিন পর্যন্ত দেওয়া হয়।
        </p>
        <p style={{ marginBottom: "16px" }}>
          <strong>(খ)</strong> মেয়াদ অন্তে অর্পিত বোনাসসহ বীমার সম্পূর্ণ টাকা
          প্রদান করা হয়। এই সুবিধাগুলি বীমাকাল পর্যন্ত এবং পরবর্তী সময়ের জন্যও
          শিশুর নিরাপত্তা ব্যবস্থা করে দেয়।
        </p>

        {/* Para 5 – both survive to maturity */}
        <p style={{ marginBottom: "16px" }}>
          যদি প্রিমিয়াম দাতা ও শিশু দুজনেই বীমার মেয়াদ-পূর্তি পর্যন্ত বেঁচে
          থাকেন, তাহলে মেয়াদ অন্তে অর্পিত বোনাসসহ বীমাকৃত অর্থ প্রদান করা হয়।
        </p>

        {/* Para 6 – child dies before maturity + death benefit chart */}
        <p style={{ marginBottom: "12px" }}>
          যদি মেয়াদ-পূর্তির পূর্বে শিশুর মৃত্যু হয় তাহলে নিম্নে বর্ণিত তালিকা
          অনুসারে বীমার টাকা প্রিমিয়ামদাতাকে দেওয়া হয়।
        </p>

        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontWeight: "700",
              fontSize: "22px",
              marginBottom: "8px",
            }}
          >
            মৃত্যুকালীন শিশুর বয়স :
          </p>
          <div style={{ fontSize: "19px", lineHeight: 1.6 }}>
            {deathBenefitRows.map(([age, pct]) => (
              <div
                key={age}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  padding: "2px 0",
                }}
              >
                <span style={{ width: "120px", flexShrink: 0 }}>{age}</span>
                <span style={{ flex: 1, padding: "0 16px" }}>
                  অর্পিত বোনাসসহ বীমা অংকের
                </span>
                <span style={{ fontWeight: 600, flexShrink: 0 }}>{pct}</span>
              </div>
            ))}
            <p style={{ margin: "6px 0 0", padding: 0 }}>
              ১০ বছর ও তদোধিক অর্পিত বোনাসসহ সম্পূর্ণ বীমা অংক।
            </p>
          </div>
        </div>

        {/* Para 7 – no supplementary benefit, no loan */}
        <p style={{ marginBottom: "8px" }}>
          এই বীমার সঙ্গে কোনো অতিরিক্ত সুবিধার বীমা গ্রহণ করা যায় না। এই বীমার
          সম্পর্ণ মূল্য দেয় হয় লোন দেওয়া হয় না।
        </p>
      </div>
    </div>
  );
}
