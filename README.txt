KINGDOMWAY WEBSITE FOR kingdomeent.com  (Cloudflare package)
=============================================================

What this does
  Replaces the site that kingdomeent.com shows today with the new KingdomWay
  voice AI site. It deploys over your existing "kingdom-way-site" Worker, which
  already owns the domain, so you do NOT change any DNS or email settings.
  The "Book a demo" form emails mendez@kingdomeent.com through the same Resend
  setup your current form already uses (MAIL_FROM and RESEND_API_KEY).

BEFORE YOU START
  1. You need Node.js version 22 or newer.
     Open a terminal and type:   node -v
     If it shows a number lower than 22, or an error, install the current
     "LTS" version from https://nodejs.org and open a new terminal.
  2. Open a terminal INSIDE this folder.
     Mac:     right-click the folder, choose "New Terminal at Folder".
     Windows: open the folder, click the address bar, type  cmd  and press Enter.

DEPLOY  (two commands, run one at a time)
  npx wrangler login
      A browser window opens. Sign in to the Cloudflare account that owns
      kingdomeent.com and click Allow.
  npx wrangler deploy
      If it asks "Ok to proceed?" or asks you to confirm replacing the existing
      Worker, type  y  and press Enter. The upload is about 53 MB, so give it a
      minute or two. It ends with a line that says the Worker was deployed.

CHECK IT WORKED
  1. Open https://kingdomeent.com (press Ctrl+Shift+R, or Cmd+Shift+R on a Mac,
     to skip the old cached page).
  2. Fill in and send the "Book a demo" form with a real phone or email.
  3. Look for the message in mendez@kingdomeent.com (check Spam too).

IF SOMETHING GOES WRONG
  * "Wrangler requires at least Node.js v22": update Node (step 1 above).
  * The form says something went wrong: in Cloudflare open Workers & Pages >
    kingdom-way-site > Settings > Variables and Secrets. You should see
    RESEND_API_KEY and MAIL_FROM. If one is missing, add it back.

THIS FOLDER
  client/              the website files (pages, images, video)
  server/              the site's server code
  wrangler.jsonc       the deploy settings (name must stay "kingdom-way-site")
