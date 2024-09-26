export const openWindow = (url, target = "_blank") =>
  window.open(url, target);

export const setPayload = (payload, type) => {
  if (type === "urlencoded") return new URLSearchParams(payload);
  return payload;
};
