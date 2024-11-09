# Image Source Finder - Instagram Image Downloader

A Chrome extension to download images from Instagram posts by locating the image's source URL.

## Overview

This extension allows users to download the main image from an Instagram post directly from the browser. It uses a specific class to identify the image on the page and fetches its source URL to initiate a download.

### Table of Contents
- [Manifest File](#manifest-file)
- [Content Script (popup.js)](#content-script-popupjs)
- [Popup HTML (popup.html)](#popup-html-popuphtml)
- [Main Script Logic](#main-script-logic)
- [Usage](#usage)
- [Limitations and Notes](#limitations-and-notes)

## Manifest File

The `manifest.json` file sets up the extension’s configuration:

- **`manifest_version`**: Set to 3, as required for all Chrome extensions.
- **`name`, `version`, `description`**: Basic details about the extension.
- **`permissions`**:
  - `activeTab`: Allows interaction with the active tab.
  - `scripting`: Enables the extension to execute JavaScript within the page.
- **`action`**: Specifies `popup.html` as the popup file when the extension icon is clicked.
- **`content_scripts`**: Defines `popup.js` to run on Instagram post URLs.

**manifest.json**

```json
{
    "manifest_version": 3,
    "name": "Image Source Finder",
    "version": "1.0",
    "description": "Find and display the source URL of an image tag with a specific class.",
    "permissions": ["activeTab", "scripting"],
    "action": {
      "default_popup": "popup.html"
    },
    "content_scripts": [
      {
        "matches": ["*:www.instagram.com/p/*"],
        "js": ["popup.js"]
      }
    ]
}
```

# Content Script - `popup.js`

The content script in `popup.js` is responsible for finding and retrieving the image URL from an Instagram post.

### Functionality

The script identifies the main image on an Instagram post by targeting a specific class, retrieves its `src` URL, and returns it to be used as a download link.

### Steps

1. **Target Class**: Searches for the image element using a specific Instagram class (`targetClass`).
2. **Image Extraction**: If an image element with this class is found, the script retrieves its `src` attribute to get the direct URL of the image.
3. **Error Handling**: If no image is found with the specified class, the script returns `null`.

### Code

```javascript
(() => {
    const targetClass = "x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3";
    const imgElement = document.querySelector(`img.${targetClass.replace(/ /g, ".")}`);

    if (imgElement) {
        return imgElement.src;
    } else {
        return null;
    }
})();
```

# Popup HTML - `popup.html`

The `popup.html` file defines the user interface for the Chrome extension. This includes a button labeled "Download Post," which triggers the download function in `popup.js`.

### Structure

- **Button (`findImageSrc`)**: Clicking this button initiates the process to find and download the image from the Instagram post.
- **SVG Icon**: A cloud-download icon, styled as part of the button, visually represents the download action.
- **Message Area**: An empty paragraph (`<p id="message">`) for displaying status messages or instructions.

### Code

```html
<!DOCTYPE html>
<html>

<head>
    <title>Image Src Finder</title>
    <link rel="stylesheet" href="https://noble.htknetwork.in/css/demo1/style.css">
</head>

<body>
    <div class="d-flex align-items-center flex-wrap text-nowrap m-4">
        <p id="message"></p>
        <button id="findImageSrc" type="button" class="btn btn-primary btn-sm mt-3 btn-icon-text mb-2 mb-md-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-download-cloud btn-icon-prepend">
                <polyline points="8 17 12 21 16 17"></polyline>
                <line x1="12" y1="12" x2="12" y2="21"></line>
                <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
            </svg>
            Download Post
        </button>
    </div>
    <script src="popup.js"></script>
</body>

</html>
```

# Main Script Logic - `popup.js`

The core logic in `popup.js` is executed when the "Download Post" button is clicked. This script performs several key actions to identify, fetch, and download the image from an Instagram post.

### Key Functional Steps

1. **Active Tab Query**: The script identifies the current active browser tab.
2. **Script Injection**: Injects a script into the Instagram page that:
   - Locates the image element using the specified `targetClass`.
   - Extracts the `src` URL of the image and generates a filename.
   - Initiates a download of the image as a `.jpg` file.
3. **Error Handling**: If no image is found or there’s an issue with the URL, an alert is displayed to the user.

### Code

```javascript
document.getElementById("findImageSrc").addEventListener("click", () => {
  // Query the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: function() {
          const targetClass = "x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3";
          const imgElement = document.querySelector(`img.${targetClass.replace(/ /g, ".")}`);

          if (imgElement) {
            // Retrieve the image URL
            const imageUrl = imgElement.src;
            const urlParts = imageUrl.split('/');
            const fileNameSlug = urlParts[urlParts.length - 2];
            const fileName = fileNameSlug + ".jpg";

            // Fetch the image and initiate a download
            fetch(imageUrl)
              .then(response => response.blob())
              .then(blob => {
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = fileName;
                downloadLink.style.display = "none";
                
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
              })
              .catch(error => {
                alert("Failed to fetch the image: " + error.message);
              });
          } else {
            alert("The URL seems incorrect. Please verify that the URL follows the correct format: \n\n https://www.instagram.com/p/*");
          }
        }
      });
    } else {
      console.error("No active tab found.");
    }
  });
});
```

## How to Use

1. **Install the Extension**:  
   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer Mode** in the top right corner.
   - Click on **Load unpacked** and select the folder where your extension files are located.

2. **Navigate to an Instagram Post**:  
   - Open any Instagram post URL in the format `https://www.instagram.com/p/*` on your browser.

3. **Click the Extension Icon**:  
   - In the Chrome toolbar, click the extension icon.
   - In the popup that appears, click the **"Download Post"** button.  
   - The image will automatically begin downloading to your device.

## Troubleshooting

- **If the image does not download**:  
  Ensure that you're on a valid Instagram post URL (in the correct format: `https://www.instagram.com/p/*`).

- **If the image doesn't appear**:  
  Instagram may have changed the class names used for images. In that case, you may need to update the `targetClass` variable in the `popup.js` file with the latest class names used by Instagram's image elements.
