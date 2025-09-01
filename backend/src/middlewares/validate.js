export const validateConfessionInput = (req, res, next) => {
  const text = (req.body?.text ?? "").trim();
  if (text.length < 5) {
    return res.status(400).json({ error: "text must be at least 5 non-space characters" });
  }
  next();
};
