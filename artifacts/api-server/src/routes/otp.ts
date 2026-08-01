import { Router } from "express";

const router = Router();

/* ── in-memory store ── */
interface OtpSession {
  sessionId: string;
  maskedPhone: string;
  status: "pending" | "approved" | "verified";
  code?: string;
  createdAt: number;
}
const sessions = new Map<string, OtpSession>();

const makeId  = () => Math.random().toString(36).slice(2, 10).toUpperCase();
const makeOtp = () => String(Math.floor(100000 + Math.random() * 900000));
const maskPhone = (p: string) => {
  const digits = p.replace(/\D/g, "");
  if (digits.length < 4) return p;
  return digits.slice(0, 2) + "••••••" + digits.slice(-2);
};

/* POST /api/otp/request  { phone } → { sessionId, maskedPhone } */
router.post("/request", (req, res) => {
  const phone = req.body?.phone ?? "05xxxxxxxx";
  const sessionId = makeId();
  const session: OtpSession = {
    sessionId,
    maskedPhone: maskPhone(phone),
    status: "pending",
    createdAt: Date.now(),
  };
  sessions.set(sessionId, session);
  res.json({ sessionId, maskedPhone: session.maskedPhone });
});

/* GET /api/otp/status/:id → { status, code? } */
router.get("/status/:id", (req, res) => {
  const s = sessions.get(req.params.id);
  if (!s) return res.status(404).json({ error: "not found" });
  const payload: Record<string, unknown> = { status: s.status };
  if (s.status === "approved") payload.code = s.code;
  res.json(payload);
});

/* GET /api/otp/sessions  (admin) → array of sessions */
router.get("/sessions", (_req, res) => {
  const list = [...sessions.values()].sort((a, b) => b.createdAt - a.createdAt);
  res.json(list);
});

/* POST /api/otp/approve/:id  (admin) → { ok } */
router.post("/approve/:id", (req, res) => {
  const s = sessions.get(req.params.id);
  if (!s) return res.status(404).json({ error: "not found" });
  s.status = "approved";
  s.code = makeOtp();
  res.json({ ok: true, code: s.code });
});

/* POST /api/otp/verify  { sessionId, code } → { success } */
router.post("/verify", (req, res) => {
  const { sessionId, code } = req.body ?? {};
  const s = sessions.get(sessionId);
  if (!s || s.status !== "approved") return res.json({ success: false });
  if (s.code === code) {
    s.status = "verified";
    return res.json({ success: true });
  }
  res.json({ success: false });
});

export default router;
