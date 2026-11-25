"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";

type Age = {
  years: number;
  months: number;
  days: number;
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function addCalendarMonths(date: Date, months: number) {
  const targetMonth = date.getMonth() + months;
  const targetYear = date.getFullYear() + Math.floor(targetMonth / 12);
  const normalizedMonth = ((targetMonth % 12) + 12) % 12;
  const lastDay = new Date(targetYear, normalizedMonth + 1, 0).getDate();

  return new Date(
    targetYear,
    normalizedMonth,
    Math.min(date.getDate(), lastDay),
  );
}

function calculateAge(birthDate: Date, today: Date): Age {
  let years = today.getFullYear() - birthDate.getFullYear();
  const anniversary = addCalendarMonths(birthDate, years * 12);

  if (anniversary > today) {
    years -= 1;
  }

  let cursor = addCalendarMonths(birthDate, years * 12);
  let months = 0;

  while (months < 11) {
    const nextMonth = addCalendarMonths(birthDate, years * 12 + months + 1);

    if (nextMonth > today) break;

    cursor = nextMonth;
    months += 1;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const days = Math.floor(
    (today.getTime() - cursor.getTime()) / millisecondsPerDay,
  );

  return { years, months, days };
}

export default function AgeCalculatorPage() {
  const today = useMemo(() => new Date(), []);
  const maximumDate = formatDate(today);
  const birthDateInputRef = useRef<HTMLInputElement>(null);
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<Age | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!birthDate) {
      setAge(null);
      setError("অনুগ্রহ করে আপনার জন্মতারিখ নির্বাচন করুন।");
      return;
    }

    const selectedDate = new Date(`${birthDate}T00:00:00`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate > currentDate) {
      setAge(null);
      setError("জন্মতারিখ আজকের তারিখের পরে হতে পারে না।");
      return;
    }

    setError("");
    setAge(calculateAge(selectedDate, currentDate));
  }

  function handleClear() {
    setBirthDate("");
    setAge(null);
    setError("");
    birthDateInputRef.current?.focus();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "clamp(20px, 5vw, 40px) 16px",
        fontFamily: "Noto Sans Bengali, sans-serif",
      }}
    >
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "24px",
            color: "#2563eb",
            fontSize: "15px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          <span aria-hidden="true">←</span>
          <span>মূল পাতায় ফিরে যান</span>
        </Link>

        <section
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "clamp(20px, 6vw, 40px)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(24px, 7vw, 32px)",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                margin: "0 auto 14px",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#eff6ff",
                color: "#2563eb",
              }}
            >
              <svg
                style={{ width: "30px", height: "30px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M8 7V3m8 4V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm7 9v3m-1.5-1.5h3"
                />
              </svg>
            </div>
            <h1
              style={{
                margin: "0 0 8px",
                color: "#1a1a1a",
                fontSize: "clamp(26px, 8vw, 30px)",
                fontWeight: "700",
              }}
            >
              বয়স ক্যালকুলেটর
            </h1>
            <p style={{ margin: 0, color: "#6b7280", lineHeight: "1.6" }}>
              জন্মতারিখ নির্বাচন করে আজ পর্যন্ত বয়স জানুন।
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="birth-date"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              জন্মতারিখ
            </label>
            <div
              style={{
                position: "relative",
                boxSizing: "border-box",
                width: "100%",
                minHeight: "52px",
                border: `1px solid ${error ? "#dc2626" : "#d1d5db"}`,
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  minHeight: "52px",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  color: birthDate ? "#111827" : "#9ca3af",
                  fontSize: "16px",
                  pointerEvents: "none",
                }}
              >
                <span>
                  {birthDate
                    ? formatDisplayDate(birthDate)
                    : "দিন / মাস / বছর নির্বাচন করুন"}
                </span>
                <svg
                  style={{
                    width: "22px",
                    height: "22px",
                    flexShrink: 0,
                    color: "#2563eb",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M8 7V3m8 4V3M5 10h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <input
                ref={birthDateInputRef}
                id="birth-date"
                type="date"
                aria-label="জন্মতারিখ নির্বাচন করুন"
                value={birthDate}
                max={maximumDate}
                onChange={(event) => {
                  setBirthDate(event.target.value);
                  setAge(null);
                  setError("");
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </div>

            {error && (
              <p
                role="alert"
                style={{
                  margin: "8px 0 0",
                  color: "#dc2626",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                minHeight: "52px",
                marginTop: "24px",
                padding: "14px 20px",
                border: 0,
                borderRadius: "8px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "17px",
                fontWeight: "700",
              }}
            >
              বয়স হিসাব করুন
            </button>
          </form>

          {age && (
            <div
              aria-live="polite"
              style={{
                marginTop: "24px",
                overflow: "hidden",
                border: "1px solid #bfdbfe",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                textAlign: "center",
                boxShadow: "0 8px 24px rgba(37, 99, 235, 0.12)",
              }}
            >
              <div
                style={{
                  padding: "18px 16px",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  color: "#ffffff",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "34px",
                    height: "34px",
                    margin: "0 auto 8px",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.18)",
                    fontSize: "18px",
                  }}
                >
                  ✓
                </div>
                <p style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
                  বর্তমান বয়স
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                  padding: "clamp(14px, 4vw, 20px)",
                  backgroundColor: "#eff6ff",
                }}
              >
                {[
                  { value: age.years, label: "বছর" },
                  { value: age.months, label: "মাস" },
                  { value: age.days, label: "দিন" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      minWidth: 0,
                      padding: "14px 4px 12px",
                      border: "1px solid #dbeafe",
                      borderRadius: "10px",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 1px 3px rgba(30, 64, 175, 0.08)",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        color: "#1d4ed8",
                        fontSize: "clamp(24px, 8vw, 32px)",
                        lineHeight: "1.15",
                      }}
                    >
                      {item.value.toLocaleString("bn-BD")}
                    </strong>
                    <span
                      style={{
                        display: "block",
                        marginTop: "5px",
                        color: "#64748b",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "0 clamp(14px, 4vw, 20px) 20px",
                  backgroundColor: "#eff6ff",
                }}
              >
                <button
                  type="button"
                  onClick={handleClear}
                  style={{
                    width: "100%",
                    minHeight: "48px",
                    border: "1px solid #93c5fd",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    color: "#1d4ed8",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  ক্লিয়ার করুন
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
