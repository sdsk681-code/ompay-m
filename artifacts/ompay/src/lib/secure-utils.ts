const _k = "7f8a9b2c3d4e5f6a1b2c3d4e5f6a7b8c";

function unicodeToBtoa(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

export function _e(s: string): string {
  let r = "";
  for (let i = 0; i < s.length; i++) {
    r += String.fromCharCode(s.charCodeAt(i) ^ _k.charCodeAt(i % _k.length));
  }
  return unicodeToBtoa(r);
}
