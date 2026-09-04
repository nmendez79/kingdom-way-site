export async function onRequestPost({ request, env }) {
  const bad = (msg, code) => new Response(JSON.stringify({ ok: false, error: msg }), {
    status: code, headers: { "content-type": "application/json" },
  });

  let data;
  const type = request.headers.get("content-type") || "";
  try {
    data = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return bad("Could not read the submission.", 400);
  }

  if (data.company) return Response.json({ ok: true });

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const note = String(data.note || "").trim();

  if (!name || !email) return bad("Name and email are required.", 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad("That email address is not valid.", 400);
  if (name.length > 200 || email.length > 200 || note.length > 5000) return bad("Submission too long.", 400);

  const text = [
    `Name:  ${name}`,
    `Email: ${email}`,
    "",
    "What is stuck:",
    note || "(not provided)",
    "",
    `Sent from kingdomwayenterprises.com at ${new Date().toISOString()}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [env.MAIL_TO],
      reply_to: email,
      subject: `Consultation request — ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.log("resend error", res.status, await res.text());
    return bad("We could not send that just now. Please call (877) 704-1147.", 502);
  }
  return Response.json({ ok: true });
}
