# 📨 SPF Checker Web App

A simple React single-page application (SPA) to check SPF (Sender Policy Framework) records for any domain using DNS-over-HTTPS.

<br>

### 🚀 Features

- Enter a domain name (e.g. `example.com`)
- Fetch DNS TXT records using Google DNS API
- Detect and display SPF records (`v=spf1`)
- Highlight `include:` and `redirect=` mechanisms
- Expand `include:` directives to view nested SPF records
- Graceful error handling (invalid domain, no SPF, DNS failure)
- Fully responsive, clean UI

<br>

### 🛠️ Tech Stack

- React (Vite)
- JavaScript (ES6+)
- CSS (custom, responsive)
- DNS-over-HTTPS (Google DNS API)
- `lucide-react` (icons)

<br>

### 🧠 How It Works (Brief)

 1. User enters a domain name

2. App validates the domain format

3. DNS TXT records are fetched via Google DNS-over-HTTPS

4. Records starting with v=spf1 are filtered

5. SPF mechanisms are parsed and displayed

6. include: records can be expanded to fetch nested SPF records