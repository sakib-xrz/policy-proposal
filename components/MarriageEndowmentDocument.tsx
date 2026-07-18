/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect, useState } from "react";
import headerImage from "@/public/header-image.png";

interface MarriageEndowmentDocumentProps {
  initialData: {
    name: string;
    age: string;
    insuranceAmount: string;
    policyTerm: string;
    totalDeposit: string;
    maturityAmount: string;
  };
}

type ExampleTerm = 10 | 16;

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

const exampleIntro =
  "৩৫ বছর বয়সের একজন ব্যক্তি ১০ লক্ষ টাকার ১টি ‘ম্যারেজ এন্ডাওমেন্ট পলিসি (লাভসহ)’ জীবন বীমা কর্পোরেশন হতে গ্রহণ করলে তার প্রিমিয়াম ও দাবী হিসাব নিম্নরূপ:";

const examples: Record<
  ExampleTerm,
  {
    label: string;
    heading: string;
    premiumText: string;
    bullets: string[];
  }
> = {
  10: {
    label: "১০ বছর উদাহরণ",
    heading: "১০ বছর মেয়াদ",
    premiumText:
      "১০ বছর মেয়াদের ক্ষেত্রে বার্ষিক প্রিমিয়াম ১,০০,৭০০/- টাকা। ১০ বছর মেয়াদের ক্ষেত্রে মোট প্রিমিয়াম ১,০০,৭০০ × ১০ = ১০,০৭,০০০/- টাকা।",
    bullets: [
      "মেয়াদ শেষে বোনাসসহ পাবে ২০ × ১০ × ১০০০ = ১২,০০,০০০/- টাকা (বর্তমান রেট অনুযায়ী)।",
      "মেয়াদপূর্তির পূর্বে বীমাগ্রাহকের মৃত্যু হলে নমিনীকে পরবর্তী মেয়াদের জন্য প্রিমিয়াম দিতে হবে না। মেয়াদ শেষে পূর্ণ মেয়াদের অর্জিত বোনাসসহ মূল বীমা অঙ্ক প্রদান।",
      "যদি ৫ বছর চালু থাকার পর যে সন্তানের জন্য এ বীমা নেয়া হয়, সে মারা যায় তাহলে ১ বছরের প্রিমিয়াম বাদ দিয়ে অর্জিত বোনাসসহ মোট (৫-১) = ৪ × ১,০০,৭০০ বা (৪,০২,৮০০) + বোনাস (২০ × ৫ × ১০০০) = সর্বমোট ৫,০২,৮০০.০০ টাকা।",
    ],
  },
  16: {
    label: "১৬ বছর উদাহরণ",
    heading: "১৬ বছর মেয়াদ",
    premiumText:
      "১৬ বছর মেয়াদের ক্ষেত্রে বার্ষিক প্রিমিয়াম ৬০,৯০০/- টাকা। ১৬ বছরে মোট প্রিমিয়াম ৬০,৯০০ × ১৬ = ৯,৭৪,৪০০/- টাকা।",
    bullets: [
      "মেয়াদ শেষে অর্জিত বোনাসসহ মূল বীমা অঙ্ক প্রদেয় ১০,০০,০০০ + ৫২ × ১৬ × ১০০০ = ১৮,৩২,০০০/- টাকা (বর্তমান রেট অনুযায়ী)।",
      "মেয়াদপূর্তির পূর্বে বীমাগ্রাহকের অনাকাঙ্ক্ষিত মৃত্যু হলে নমিনীকে পরবর্তী মেয়াদের জন্য প্রিমিয়াম দিতে হবে না। মেয়াদ শেষে পূর্ণ মেয়াদের অর্জিত বোনাসসহ মূল বীমা অঙ্ক প্রদান।",
      "যদি ৫ বছর চালু থাকার পর যে সন্তানের জন্য এ বীমা নেয়া হয়, সে সন্তান মারা যায়, তাহলে ১ বছরের প্রিমিয়াম বাদ দিয়ে অর্জিত বোনাসসহ মোট (৫-১) = ৪ × ৬০,৯০০ বা ২,৪৩,৬০০ + বোনাস (৫২ × ৫ × ১০০০) = সর্বমোট ৫,০৩,৬০০/- টাকা।",
    ],
  },
};

export default function MarriageEndowmentDocument({
  initialData,
}: MarriageEndowmentDocumentProps) {
  const [exampleTerm, setExampleTerm] = useState<ExampleTerm>(10);
  const nameRef = useRef<HTMLSpanElement>(null);
  const ageRef = useRef<HTMLSpanElement>(null);
  const insuranceAmountRef = useRef<HTMLSpanElement>(null);
  const policyTermRef = useRef<HTMLSpanElement>(null);
  const totalDepositRef = useRef<HTMLSpanElement>(null);
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
    seed(insuranceAmountRef, initialData.insuranceAmount);
    seed(policyTermRef, initialData.policyTerm);
    seed(totalDepositRef, initialData.totalDeposit);
    seed(maturityAmountRef, initialData.maturityAmount);
  }, [initialData]);

  const example = examples[exampleTerm];

  return (
    <>
      {/* Toggle stays outside #editable-document-content so it is excluded from PDF */}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px",
          padding: "12px 16px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          fontFamily: "Noto Sans Bengali, sans-serif",
          fontSize: "15px",
        }}
      >
        <span style={{ fontWeight: 600, color: "#374151" }}>
          উদাহরণ নির্বাচন:
        </span>
        {([10, 16] as const).map((term) => (
          <label
            key={term}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              color: "#1a1a1a",
            }}
          >
            <input
              type="radio"
              name="marriage-example-term"
              checked={exampleTerm === term}
              onChange={() => setExampleTerm(term)}
              style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
            />
            <span>{examples[term].label}</span>
          </label>
        ))}
      </div>

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

        {/* Age */}
        <div style={{ marginBottom: "8px" }}>
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
          <span> বছর।</span>
        </div>

        {/* Sum assured */}
        <div style={{ marginBottom: "8px" }}>
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
          <span> /= টাকা।</span>
        </div>

        {/* Policy term */}
        <div style={{ marginBottom: "8px" }}>
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

        {/* Total deposit */}
        <div style={{ marginBottom: "8px" }}>
          <span>মোট জমা হবে </span>
          <span
            ref={totalDepositRef}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> /= টাকা।</span>
        </div>

        {/* Maturity amount */}
        <div style={{ marginBottom: "32px" }}>
          <span>মেয়াদ পূর্তিতে পাওয়া যাবে </span>
          <span
            ref={maturityAmountRef}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> /= টাকা।</span>
        </div>

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
            ম্যারেজ এন্ডাওমেন্ট পলিসি (লাভসহ)
          </h2>
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

        <div>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "16px",
              margin: 0,
            }}
          >
            <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
              •{" "}
              <span style={{ fontWeight: "700" }}>
                প্রিমিয়াম পরিশোধ পদ্ধতি:
              </span>{" "}
              ষান্মাসিক ও বার্ষিক।
            </li>
            <li
              style={{
                marginBottom: "12px",
                paddingLeft: "4px",
                color: "#0000FF",
              }}
            >
              • এ পরিকল্পনায় বীমাকৃত টাকা অর্জিত বোনাসসহ কেবল বীমার মেয়াদ
              অতিক্রান্ত হওয়ার পরই পাওয়া যায়।
            </li>
            <li
              style={{
                marginBottom: "12px",
                paddingLeft: "4px",
                color: "#FF0000",
              }}
            >
              • যদি মেয়াদপূর্তির পূর্বে বীমাগ্রাহকের অনাকাঙ্খিত মৃত্যু হয়,
              তাহলে মৃত্যুর দিন থেকে মেয়াদ পূর্তির দিন পর্যন্ত দেয় সকল
              প্রিমিয়াম মওকুফ হয়ে যায় এবং মেয়াদান্তে পূর্ণ মেয়াদের অর্জিত
              বোনাসসহ বীমাকৃত টাকা নমিনীকে প্রদান করা হয়।
            </li>
            <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
              • যে সন্তানদের জন্য এ বীমাপত্র নেওয়া হয়, বীমার মেয়াদকালে তার
              মৃত্যু হলে ১ম বছরের প্রিমিয়াম বাদে প্রদত্ত সকল প্রিমিয়াম অর্জিত
              বোনাসসহ ফেরত দেওয়া হয়। অন্যথায়, গৃহীত বীমা অন্য কোন সন্তানের
              উপকারার্থে চালু রাখা যেতে পারে।
            </li>
            <li style={{ marginBottom: "12px", paddingLeft: "4px" }}>
              • এ বীমায় সমর্পণ মূল্য ও ঋণ প্রদান করা হয়।
            </li>
            <li style={{ marginBottom: "0", paddingLeft: "4px" }}>
              • মরণোত্তর দাবীর টাকা আয়করমুক্ত।
            </li>
          </ul>
        </div>

        <p style={{ marginTop: "8px", color: "#00ab41", fontWeight: "700" }}>
          এছাড়া প্রতিবছর আপনার বার্ষিক আয়ের ১৫% প্রিমিয়াম হিসাবে সঞ্চয়
          দেখাতে পারবেন। এটি ট্যাক্স ফ্রি।
        </p>

        {/* Example Section - Static (switched by page-top toggle) */}
        <div style={{ marginTop: "28px" }}>
          <h2
            style={{
              fontWeight: "700",
              fontSize: "28px",
              marginBottom: "12px",
              color: "#0000FF",
            }}
          >
            উদাহরণ
          </h2>

          <p style={{ marginBottom: "16px" }}>{exampleIntro}</p>

          <p style={{ fontWeight: "700", marginBottom: "8px" }}>
            {example.heading}
          </p>
          <p style={{ marginBottom: "12px" }}>{example.premiumText}</p>

          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "16px",
              margin: 0,
            }}
          >
            {example.bullets.map((bullet, index) => (
              <li
                key={index}
                style={{
                  marginBottom:
                    index === example.bullets.length - 1 ? 0 : "12px",
                  paddingLeft: "4px",
                }}
              >
                • {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
