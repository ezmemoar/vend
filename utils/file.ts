export const convertFileToUrl = (file: Blob | BlobPart[]) =>
  new Promise((resolve, reject) => {
    let blob = file as Blob;
    if (!(file instanceof Blob)) {
      blob = new Blob(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

interface LocalFileToDownload {
  filename: string;
  type: string;
  data: BlobPart[];
}
export const downloadFile = ({ filename, type, data }: LocalFileToDownload) => {
  const blob = new Blob(data, { type });
  const link = document.createElement("a");

  const href = URL.createObjectURL(blob);
  link.href = href;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
