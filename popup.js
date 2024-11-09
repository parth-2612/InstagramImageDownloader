document.getElementById("findImageSrc").addEventListener("click", () => {
  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: function() {
          // Put the code you want to execute on the page here
          const targetClass = "x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3";
          const imgElement = document.querySelector(`img.${targetClass.replace(/ /g, ".")}`);

          if (imgElement) {
            const imageUrl = imgElement.src;
            const urlParts = imageUrl.split('/');
            const fileNameSlug = urlParts[urlParts.length - 2];
            const fileName = fileNameSlug + ".jpg";
            
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
