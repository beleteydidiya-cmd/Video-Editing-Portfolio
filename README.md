# Your Name — Video Editor Portfolio

A clean, dark, minimal one-page portfolio for a video editor. Pure HTML/CSS/JS —
no build tools, no frameworks, no backend. Videos are embedded from YouTube.

```
video-portfolio/
├── index.html          ← page structure & content
├── css/
│   └── style.css        ← all styling, colors, layout, animations
├── js/
│   └── script.js         ← video/client/tool data + interactivity
├── assets/
│   └── images/
│       ├── profile.jpg   ← your photo (placeholder included)
│       └── favicon.png   ← browser tab icon (placeholder included)
├── vercel.json           ← Vercel deployment config
└── README.md
```

## What each file does

- **index.html** — the actual content and layout (your name, bio, section
  headings, the empty containers the JS fills with video cards, etc). This is
  what you edit to change *text* that isn't in an array (name, bio, contact email).
- **css/style.css** — every visual detail: colors, fonts, spacing, the sticky
  sidebar, the scroll-reveal fade-in, the video card "film clip" styling, and
  responsive breakpoints for tablet/mobile. Color variables are all at the very
  top of the file under `:root`.
- **js/script.js** — three data arrays (`videos`, `editedFor`, `tools`) at the
  top. Everything below them just reads those arrays and builds the page
  automatically, handles the category filter tabs, opens/closes the video
  modal, and runs the scroll-in animation. **This is the file you'll touch most.**

---

## 1. Set up the project in VS Code

1. Install [VS Code](https://code.visualstudio.com/) if you don't have it.
2. Download/unzip this project folder somewhere on your computer.
3. Open VS Code → **File → Open Folder** → select the `video-portfolio` folder.
4. Install the **Live Server** extension (by Ritwick Dey): click the Extensions
   icon in the left sidebar (or `Ctrl+Shift+X`), search "Live Server", click Install.

You don't need Node.js, npm, or any package installs — this is a static site.

## 2. Run it locally

1. In VS Code's file explorer, right-click `index.html`.
2. Click **"Open with Live Server."**
3. Your browser opens automatically at something like `http://127.0.0.1:5500`
   and reloads live every time you save a file.

## 3. Upload to GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click **New repository**, name it e.g. `video-portfolio`, leave it Public,
   don't add a README (you already have one), click **Create repository**.
3. Back in VS Code: open a terminal (`Terminal → New Terminal`) and run, one
   line at a time, from inside the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/video-portfolio.git
   git push -u origin main
   ```
   (Replace `YOUR-USERNAME` with your GitHub username. If `git` isn't
   recognized, install it from [git-scm.com](https://git-scm.com/) first.)
4. Refresh your GitHub repo page — your files should now be there.

## 4. Deploy to Vercel (free, `.vercel.app` domain)

1. Go to [vercel.com](https://vercel.com) and sign up using your **GitHub account**
   (this makes importing repos one click).
2. Click **Add New → Project**.
3. Select your `video-portfolio` GitHub repo → click **Import**.
4. Framework preset: leave as **"Other"** (it's a static site, no build step needed).
5. Click **Deploy**. In under a minute you'll get a live URL like
   `video-portfolio-yourname.vercel.app`.
6. Every time you `git push` new changes to GitHub, Vercel automatically
   redeploys the site — no extra steps needed.

## 5. Replace the YouTube video placeholders

Open **js/script.js** and find the `videos` array near the top. Each video
looks like this:

```js
{
  title: "Product Unboxing — Long Form",
  category: "long",
  orientation: "landscape",
  youtubeId: "REPLACE_WITH_YOUTUBE_ID_1"
}
```

To use your real video:
1. Upload the video to YouTube (public or unlisted both work).
2. Copy the video ID from its URL — the part after `v=`:
   `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`.
   (Or after `youtu.be/` if you used a share link.)
3. Paste it in as the `youtubeId` value, replacing the placeholder text.
4. The thumbnail image updates automatically — you don't need to add one manually.
5. Save. The card's placeholder message disappears and the real thumbnail + player show up.

Set `category` to `"long"`, `"shorts"`, or `"ads"` so it shows under the right
filter tab, and `orientation` to `"portrait"` for Shorts/Reels (9:16) or
`"landscape"` for everything else (16:9).

To **add** a new video card, copy one of the `{ ... }` blocks, paste it as a
new entry in the array (with a comma between entries), and fill in your info.
To **remove** one, delete its `{ ... }` block.

---

## 6. Common changes

**Change your name / bio / contact email**
→ Edit the text directly inside `index.html` (search for `Your Name`,
the `<p class="bio">`, and `you@example.com`).

**Change your profile photo**
→ Replace `assets/images/profile.jpg` with your own image (keep the same
filename, or update the `src` in `index.html`).

**Change colors**
→ Open `css/style.css`, edit the values at the very top under `:root`:
```css
--bg: #0a0a0b;        /* page background */
--accent: #d9ff4b;    /* main accent color (buttons, highlights) */
--accent-2: #ff9d4d;  /* secondary gradient color */
```

**Add/remove "Edited For" clients or editing tools**
→ Edit the `editedFor` and `tools` arrays in `js/script.js`, same pattern as videos.

**Add a whole new section**
→ Copy an existing `<section class="section">...</section>` block in
`index.html`, give it a new `id`, edit its content, and add a matching link
in the sidebar's `<nav class="side-nav">`.

**Update social links**
→ In `index.html`, find the `.socials` block and replace the `href="#"`
placeholders with your real Instagram/YouTube URLs.
