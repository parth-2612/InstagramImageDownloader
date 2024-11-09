(() => {
    // Define the target class name for the Instagram image
    const targetClass = "x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3";

    // Find the image element with the target class
    const imgElement = document.querySelector(`img.${targetClass.replace(/ /g, ".")}`);

    if (imgElement) {
        // Return the src attribute to be used by the popup
        return imgElement.src;
    } else {
        return null;
    }
})();
