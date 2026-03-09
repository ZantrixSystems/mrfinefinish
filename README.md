# Mr Fine Finish website

A simple static website for GitHub Pages.

## Files

- `index.html` home page
- `services.html` services page
- `work.html` portfolio and social page
- `reviews.html` reviews page
- `about.html` about page
- `contact.html` contact page
- `css/styles.css` all styling
- `js/site-data.js` easiest place to update shared business details
- `js/main.js` mobile menu and shared data population

## First edits to make

Open `js/site-data.js` and update these values:

- `email`
- `serviceArea`
- `hours`
- `trustpilotUrl`

The business name, website name, phone number, TikTok link and Instagram link are already filled in.

## TikTok

The TikTok creator embed has already been added on:

- `index.html`
- `work.html`

## Instagram

Instagram link is already added.

There is also an Instagram placeholder box on:

- `index.html`
- `work.html`

If you later get an Instagram embed snippet, replace the placeholder comment:

`<!-- Paste Instagram profile embed code here -->`

or

`<!-- Paste Instagram profile or post embed code here -->`

with the embed code.

## Trustpilot

Trustpilot is left as a placeholder because the official widget code normally comes from the Trustpilot business account.

Search for this comment in the code:

`<!-- Paste Trustpilot embed code here -->`

You will find it on:

- `index.html`
- `reviews.html`

Paste the official Trustpilot widget code there.

## Contact form

The contact form is visual only right now.

GitHub Pages does not process forms by itself.

If you want the form to work later, connect it to a service like Formspree.

## Upload to GitHub

1. Create a new repository in GitHub.
2. Upload all files and folders from this project.
3. Make sure `index.html` stays in the root of the repository.
4. Commit the files.

## Publish with GitHub Pages

1. Open your repository in GitHub.
2. Go to **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Save.
6. GitHub will give you a live website link.

## Suggested next steps

- Add your real email address
- Add service area text
- Add real project photos
- Add Trustpilot widget code
- Optionally add an Instagram embed if you generate one
- Buy a custom domain later if needed
