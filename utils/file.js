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

export const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Byte";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
