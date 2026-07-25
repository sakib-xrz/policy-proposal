/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import headerImage from "@/public/header-image.png";

interface ThreeInstalmentDocumentProps {
  initialData: {
    name: string;
    age: string;
    insuranceAmount: string;
    policyTerm: string;
    annualPremium: string;
    yr1: string;
    totalDeposit6Yr: string;
    return6Yr: string;
    remaining6Yr: string;
    yr2: string;
    totalDeposit12Yr: string;
    return12Yr: string;
    remaining12Yr: string;
    yr3: string;
    totalDeposit18Yr: string;
    return18Yr: string;
    return18YrEq: string;
    bonus18Yr: string;
    totalMaturityAmount: string;
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

export default function ThreeInstalmentDocument({
  initialData,
}: ThreeInstalmentDocumentProps) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const ageRef = useRef<HTMLSpanElement>(null);
  const insuranceAmountRef = useRef<HTMLSpanElement>(null);
  const policyTermRef = useRef<HTMLSpanElement>(null);
  const annualPremiumRef = useRef<HTMLSpanElement>(null);

  const yr1Ref1 = useRef<HTMLSpanElement>(null);
  const yr1Ref2 = useRef<HTMLSpanElement>(null);
  const yr1Ref3 = useRef<HTMLSpanElement>(null);
  const totalDeposit6YrRef = useRef<HTMLSpanElement>(null);
  const return6YrRef = useRef<HTMLSpanElement>(null);
  const remaining6YrRef = useRef<HTMLSpanElement>(null);

  const yr2Ref1 = useRef<HTMLSpanElement>(null);
  const yr2Ref2 = useRef<HTMLSpanElement>(null);
  const yr2Ref3 = useRef<HTMLSpanElement>(null);
  const totalDeposit12YrRef = useRef<HTMLSpanElement>(null);
  const return12YrRef = useRef<HTMLSpanElement>(null);
  const remaining12YrRef = useRef<HTMLSpanElement>(null);

  const yr3Ref1 = useRef<HTMLSpanElement>(null);
  const yr3Ref2 = useRef<HTMLSpanElement>(null);
  const totalDeposit18YrRef = useRef<HTMLSpanElement>(null);
  const return18YrRef = useRef<HTMLSpanElement>(null);
  const return18YrEqRef = useRef<HTMLSpanElement>(null);
  const bonus18YrRef = useRef<HTMLSpanElement>(null);
  const totalMaturityAmountRef = useRef<HTMLSpanElement>(null);

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
    seed(annualPremiumRef, initialData.annualPremium);

    seed(yr1Ref1, initialData.yr1);
    seed(yr1Ref2, initialData.yr1);
    seed(yr1Ref3, initialData.yr1);
    seed(totalDeposit6YrRef, initialData.totalDeposit6Yr);
    seed(return6YrRef, initialData.return6Yr);
    seed(remaining6YrRef, initialData.remaining6Yr);

    seed(yr2Ref1, initialData.yr2);
    seed(yr2Ref2, initialData.yr2);
    seed(yr2Ref3, initialData.yr2);
    seed(totalDeposit12YrRef, initialData.totalDeposit12Yr);
    seed(return12YrRef, initialData.return12Yr);
    seed(remaining12YrRef, initialData.remaining12Yr);

    seed(yr3Ref1, initialData.yr3);
    seed(yr3Ref2, initialData.yr3);
    seed(totalDeposit18YrRef, initialData.totalDeposit18Yr);
    seed(return18YrRef, initialData.return18Yr);
    seed(return18YrEqRef, initialData.return18YrEq);
    seed(bonus18YrRef, initialData.bonus18Yr);
    seed(totalMaturityAmountRef, initialData.totalMaturityAmount);
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
      {/* Header Logo */}
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

      {/* Policy Title */}
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
          ৩ কিস্তি বীমা (লাভসহ)
        </h2>
      </div>

      {/* Name - Editable (First line) */}
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

      {/* Age Line - Editable (Second line) */}
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

      {/* Insurance Amount */}
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
        <span> টাকা,</span>
      </div>

      {/* Policy Term & Annual Premium */}
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
        <span> বছর, বার্ষিক প্রিমিয়াম </span>
        <span
          ref={annualPremiumRef}
          contentEditable
          suppressContentEditableWarning
          style={fieldStyle}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="editable-field"
        />
        <span> /= টাকা,</span>
      </div>

      {/* Block 1 (6 years) */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ marginBottom: "4px" }}>
          <span
            ref={yr1Ref1}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> বছরে মোট জমা হবে </span>
          <span
            ref={totalDeposit6YrRef}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> /= টাকা,</span>
        </div>

        <div
          style={{ marginBottom: "4px", color: "#00ab41", fontWeight: "700" }}
        >
          <span
            ref={yr1Ref2}
            contentEditable
            suppressContentEditableWarning
            style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span style={{ color: "#00ab41", fontWeight: "700" }}>
            {" "}
            বছর পর ফেরত পাওয়া যাবে{" "}
          </span>
          <span
            ref={return6YrRef}
            contentEditable
            suppressContentEditableWarning
            style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span style={{ color: "#00ab41", fontWeight: "700" }}> /= টাকা,</span>
        </div>

        <div style={{ marginBottom: "4px" }}>
          <span
            ref={yr1Ref3}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> বছর পর জমা থাকবে </span>
          <span
            ref={remaining6YrRef}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> /= টাকা,</span>
        </div>
      </div>

      {/* Block 2 (12 years) */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ marginBottom: "4px" }}>
          <span
            ref={yr2Ref1}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> বছরে মোট জমা হবে </span>
          <span
            ref={totalDeposit12YrRef}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> /= টাকা</span>
        </div>

        <div
          style={{ marginBottom: "4px", color: "#00ab41", fontWeight: "700" }}
        >
          <span
            ref={yr2Ref2}
            contentEditable
            suppressContentEditableWarning
            style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span style={{ color: "#00ab41", fontWeight: "700" }}>
            {" "}
            বছর পর ফেরত পাওয়া যাবে{" "}
          </span>
          <span
            ref={return12YrRef}
            contentEditable
            suppressContentEditableWarning
            style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span style={{ color: "#00ab41", fontWeight: "700" }}>/= টাকা,</span>
        </div>

        <div style={{ marginBottom: "4px" }}>
          <span
            ref={yr2Ref3}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> বছর পর জমা থাকবে </span>
          <span
            ref={remaining12YrRef}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> /= টাকা,</span>
        </div>
      </div>

      {/* Block 3 (18 years) */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ marginBottom: "4px" }}>
          <span
            ref={yr3Ref1}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> বছরে মোট জমা হবে </span>
          <span
            ref={totalDeposit18YrRef}
            contentEditable
            suppressContentEditableWarning
            style={fieldStyle}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span> /= টাকা</span>
        </div>

        <div style={{ marginBottom: "4px" }}>
          <span
            ref={yr3Ref2}
            contentEditable
            suppressContentEditableWarning
            style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span style={{ color: "#00ab41", fontWeight: "700" }}>
            {" "}
            বছর পর ফেরত পাওয়া যাবে{" "}
          </span>
          <span
            ref={return18YrRef}
            contentEditable
            suppressContentEditableWarning
            style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="editable-field"
          />
          <span style={{ color: "#00ab41", fontWeight: "700" }}>
            {" "}
            /= টাকা +{" "}
          </span>
          <span style={{ color: "#00ab41", fontWeight: "700" }}>
            {" "}
            অর্জিত বোনাস (বর্তমান বোনাসের হার অনুযায়ী){" "}
          </span>
          <span style={{ color: "#00ab41", fontWeight: "700" }}>
            <span style={{ color: "#00ab41", fontWeight: "700" }}>= </span>
            <span
              ref={return18YrEqRef}
              contentEditable
              suppressContentEditableWarning
              style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              className="editable-field"
            />
            <span> + </span>
            <span
              ref={bonus18YrRef}
              contentEditable
              suppressContentEditableWarning
              style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              className="editable-field"
            />
            <span>(±) /= টাকা। </span>
            <br />
            <span>= </span>
            <span
              ref={totalMaturityAmountRef}
              contentEditable
              suppressContentEditableWarning
              style={{ ...fieldStyle, color: "#00ab41", fontWeight: "700" }}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              className="editable-field"
            />
            <span> /= টাকা।</span>
          </span>
        </div>
      </div>

      {/* Policy Details / Benefits Section */}
      <div style={{ lineHeight: "2", textAlign: "justify" }}>
        {/* অন্যান্য সুবিধা */}
        <div style={{ marginBottom: "16px" }}>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#00ab41",
              marginBottom: "8px",
            }}
          >
            অন্যান্য সুবিধা
          </h3>
          <p style={{ marginBottom: "8px" }}>
            <strong>(১)</strong> বীমাকৃত টাকা মেয়াদকালে তিন কিস্তিতে প্রাপ্তির
            ব্যবস্থা থাকায় এই বীমা ভবিষ্যতে আর্থিক প্রয়োজন একাধিকবার মেটাতে
            সক্ষম।
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>(২)</strong> প্রথম ও দ্বিতীয় কিস্তির টাকা প্রদান করার পরেও
            বীমার মেয়াদকালের মধ্যে বীমাগ্রাহকের মৃত্যু হলে বীমাকৃত সম্পূর্ণ টাকা
            এবং নির্ধারিত সময়ের বোনাস নমিনীকে প্রদান করা হয়। এটি এই বীমার সবচেয়ে
            আকর্ষণীয় দিক।
          </p>
        </div>

        {/* বিশেষ সুবিধাদি */}
        <div style={{ marginBottom: "16px" }}>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#00ab41",
              marginBottom: "8px",
            }}
          >
            বিশেষ সুবিধাদি:
          </h3>
          <p style={{ marginBottom: "8px" }}>
            <strong>(ক)</strong> প্রথম কিস্তির প্রাপ্ত (বীমার অংকের ২৫%) টাকা
            অন্যত্র বিনিয়োগ করে যে লভ্যাংশ পাবেন তা দিয়েই বীমা পলিসির প্রিমিয়াম
            জমা দেয়া সম্ভব। উপরন্ত প্রাপ্ত প্রথম কিস্তির টাকা মূলধন হিসেবে থেকে
            যাবে।
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>(খ)</strong> ২য় কিস্তির প্রাপ্ত (বীমা অংকের ২৫%) সম্পূর্ণ
            টাকা একইভাবে বিনিয়োগ করে লাভবান হতে পারবেন।
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>(গ)</strong> ৩য় কিস্তি (শেষ কিস্তি) হিসেবে বীমাগ্রহীতা পাবেন
            বীমা অংকের অবশিষ্ট ৫০% টাকা এবং নির্ধারিত সময়ের বোনাস।
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>(ঘ)</strong> বীমার মেয়াদ চলাকালীন জীবনের উপর মূল বীমার
            টাকা-ঝুঁকি হিসেবে থাকবে এবং মেয়াদ শেষে অকল্পনীয় সঞ্চয় হবে যা আপনার
            জীবনে আর্থিকভাবে নিশ্চয়তা দেবে।
          </p>
        </div>

        {/* DIAB */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ marginBottom: "8px", fontWeight: "700" }}>
            এছাড়া দুর্ঘটনাজনিত মৃত্যু ও অঙ্গহানীর অতিরিক্ত ঝুঁকি (DIAB) গ্রহণ
            করা হলে নিম্নোক্ত সুবিধা দেয়া হয়:
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>(ক)</strong> বীমাগ্রাহক ১টি মাত্র প্রিমিয়াম দেয়ার পরও যদি
            দুর্ঘটনার সাথে সাথে অথবা দুর্ঘটনার কারণে ৯০ দিনের মধ্যে মৃত্যুবরণ
            করেন তাহলে নমিনী পাবেন অর্জিত বোনাসসহ বীমাকৃত টাকার দ্বিগুণ।
          </p>
        </div>

        {/* Major Diseases Rider */}
        <div style={{ marginBottom: "16px" }}>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Major Diseases Rider
          </h3>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "16px",
              margin: "0 0 8px 0",
            }}
          >
            <li>a. Heart Attack</li>
            <li>b. Stroke</li>
            <li>c. Cancer</li>
            <li>d. Kidney Failure</li>
            <li>e. Multiple sclerosis</li>
            <li>f. Paralysis</li>
            <li>g. Coronary artery surgery</li>
          </ul>
          <p style={{ marginBottom: "8px" }}>
            উল্লেখিত ৭টি রোগের যে কোন একটি রোগে আক্রান্ত হলে, চিকিৎসা বাবদ
            ৫,০০,০০০/= টাকা প্রাপ্য হবেন। উল্লেখ্য, উক্ত টাকা মূল মেয়াদোত্তর /
            মরণোত্তর দাবি হতে কর্তন হবে না।
          </p>
        </div>

        {/* Tax Free Note */}
        <p style={{ marginTop: "12px", color: "#00ab41", fontWeight: "700" }}>
          এছাড়া প্রতিবছর আপনার বার্ষিক আয়ের ১৫% প্রিমিয়াম হিসাবে সঞ্চয়
          দেখাতে পারবেন। এটি ট্যাক্স ফ্রি।
        </p>
      </div>
    </div>
  );
}
