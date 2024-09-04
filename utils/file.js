export const convertFileToUrl = (file) =>
  new Promise((resolve, reject) => {
    let blob = file;
    if (!(blob instanceof Blob)) {
      blob = new Blob(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const downloadFile = ({ data, type, filename }) => {
  const blob = new Blob([data], { type });
  const link = document.createElement("a");

  const href = URL.createObjectURL(blob);
  link.href = href;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
