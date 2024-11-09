This Chrome extension script is designed to download images from Instagram posts by identifying a specific image tag within the page. Here’s a breakdown of how it works and the components involved:

1. Manifest File (manifest.json)
This file sets up the extension’s basic configuration:

manifest_version: Version 3, required for all Chrome extensions.
name, version, and description: Basic information about the extension.
permissions: The activeTab permission allows the extension to interact with the active tab, and scripting enables the script to run JavaScript within the webpage context.
action: Specifies the default popup HTML file (popup.html), which appears when the extension icon is clicked.
content_scripts: Defines which scripts to inject and where. Here, popup.js runs on URLs matching Instagram post URLs.
2. Content Script (popup.js)
This script finds and downloads the Instagram image:

Target Class: It searches for the image element by its specific Instagram class (targetClass), a unique identifier for image elements in Instagram posts. The spaces in the class name are converted to dots to select the class correctly.
Image Extraction: If the image is found, the script extracts its src URL to be used as the download source.
Error Handling: If the image is not found, the script returns null.
3. Popup HTML (popup.html)
The popup provides the UI and includes a "Download Post" button to trigger the image download. Key parts include:

Button (findImageSrc): The button users click to initiate the image download process.
SVG Icon: An icon representing download functionality.
4. Main Script Logic in popup.js
The popup.js script runs the core download functionality when the "Download Post" button is clicked:

Active Tab Query: Identifies the active tab.
Script Injection: Executes the script on the Instagram page:
Image Retrieval: Locates the image element with the target class name.
Filename Creation: Uses part of the src URL to create a descriptive filename.
Image Download: Fetches the image as a blob, then generates a temporary download link and programmatically clicks it to start the download.
Error Handling: Displays alerts if the URL format is incorrect or the image fetch fails.
Usage Summary
Open an Instagram post.
Click the extension icon.
In the popup, click "Download Post" to download the post’s main image.
Important Notes
Limitations: This script may need updates if Instagram changes the class name for image elements.
Error Handling: The alert messages provide feedback if the image retrieval fails.
