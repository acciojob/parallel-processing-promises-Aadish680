document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const loading = document.createElement("div");
  loading.id = "loading";
  loading.textContent = "Loading...";
  document.body.appendChild(loading);

  const errorDiv = document.createElement("div");
  errorDiv.id = "error";
  document.body.appendChild(errorDiv);

  const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300"
  ];

  function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${url}`);
    });
  }

  function downloadImages() {
    output.innerHTML = "";
    errorDiv.textContent = "";
    loading.style.display = "block";

    const promises = imageUrls.map(downloadImage);

    Promise.all(promises)
      .then(images => {
        loading.style.display = "none";
        images.forEach(img => output.appendChild(img));
      })
      .catch(error => {
        loading.style.display = "none";
        errorDiv.textContent = error;
      });
  }

  downloadImages();
});
