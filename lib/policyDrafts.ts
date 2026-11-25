export type PolicyId =
  | "pension"
  | "sisu-nirapotta"
  | "marriage-endowment"
  | "three-instalment";

export type DraftSnapshot = {
  fields: string[];
  radioValues: Record<string, string>;
};

export type PolicyDraft = {
  id: string;
  policyId: PolicyId;
  policyTitle: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
  snapshot: DraftSnapshot;
};

const STORAGE_KEY = "policy-proposal-drafts-v1";
export const DRAFTS_CHANGED_EVENT = "policy-drafts-changed";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function createDraftId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `draft-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getPolicyDrafts(policyId?: PolicyId): PolicyDraft[] {
  if (!canUseStorage()) return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const drafts = stored ? (JSON.parse(stored) as PolicyDraft[]) : [];
    const filtered = policyId
      ? drafts.filter((draft) => draft.policyId === policyId)
      : drafts;

    return filtered.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  } catch {
    return [];
  }
}

function writeDrafts(drafts: PolicyDraft[]) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  window.dispatchEvent(new Event(DRAFTS_CHANGED_EVENT));
}

export function getPolicyDraft(id: string) {
  return getPolicyDrafts().find((draft) => draft.id === id);
}

export function savePolicyDraft(
  draft: Omit<PolicyDraft, "createdAt" | "updatedAt">,
) {
  const drafts = getPolicyDrafts();
  const existing = drafts.find((item) => item.id === draft.id);
  const now = new Date().toISOString();
  const nextDraft: PolicyDraft = {
    ...draft,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  const nextDrafts = [
    nextDraft,
    ...drafts.filter((item) => item.id !== draft.id),
  ];

  writeDrafts(nextDrafts);
  return nextDraft;
}

export function deletePolicyDraft(id: string) {
  writeDrafts(getPolicyDrafts().filter((draft) => draft.id !== id));
}

export function deleteAllPolicyDrafts(policyId: PolicyId) {
  writeDrafts(
    getPolicyDrafts().filter((draft) => draft.policyId !== policyId),
  );
}
