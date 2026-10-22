# “Apple could not verify…” on Mac

## Recommended: browser player (no `.app`)

Current releases use **`Play Fantasy Chess 3D.command`**, which starts **Python’s built-in web server** and opens **Safari/Chrome**. The game is not a separate `.app`, so you usually **won’t** see a separate unsigned game `.app` malware dialog.

You may still need **Right-click → Open** once on the **`.command`** file if macOS quarantined the downloaded zip.

---

## If you use the legacy Electron `.app`

macOS **Gatekeeper** shows this when an app is **not signed and notarized** with an Apple Developer ID. That is **normal** for:

- Apps built in GitHub Actions without signing secrets
- Local `npm run pack:mac` builds on your machine
- Any `.app` downloaded from the internet that Apple has never seen

It does **not** mean the zip contained known malware. It means Apple **has not vouched for the publisher** of this specific file.

This project is open source; you can inspect the code and build the app yourself if you want maximum trust.

## Open the app anyway (first time)

Use **one** of these — do **not** double-click the `.app` for the first launch.

### Method A — Right-click Open (recommended)

1. In Finder, locate the legacy **`Pokemon Chess 3D.app`** or **`Fantasy Chess 3D.app`** (if you built Electron locally).
2. **Control-click** (or right-click) the app.
3. Choose **Open**.
4. In the dialog, click **Open** again (not Cancel).

After that, double-click works for future launches.

### Method B — Privacy & Security

1. Try to open the app once (you’ll get the warning).
2. Open **System Settings → Privacy & Security**.
3. Scroll to **Security** and click **Open Anyway** next to the blocked app name.
4. Confirm **Open**.

On older macOS: **System Preferences → Security & Privacy → General → Open Anyway**.

### Method C — Build it yourself

If you trust the repo but not the downloaded binary:

```bash
git clone https://github.com/cpearce-arch/chessApp.git
cd chessApp
npm install
npm run pack:mac
open release/mac/Pokemon\ Chess\ 3D.app
```

You may still see Gatekeeper for a **local unsigned** build — use **Right-click → Open** once.

## Remove the warning permanently (developers / releases)

Apple only stops showing this for apps that are:

1. **Code signed** with an **Apple Developer ID Application** certificate ($99/year Apple Developer Program).
2. **Notarized** with `notarytool` and stapled to the app.

Configure `electron-builder` with `CSC_LINK`, `CSC_KEY_PASSWORD`, and Apple notarization env vars in CI. Without those secrets, every CI build will remain unsigned.

See [electron-builder code signing](https://www.electron.build/code-signing).
