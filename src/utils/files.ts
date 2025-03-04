/**
 * A map of MIME types and their corresponding file extensions.
 *
 * @reference https://replit.com/@lark-base/URLZhuan-Fu-Jian-v2-Qian-Duan#src/download.ts
 * @reference https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export const MIMEExtension: Record<string, string> = {
  "text/html": ".html",
  "text/css": ".css",
  "text/javascript": ".js",
  "text/markdown": ".md",
  "text/csv": ".csv",
  "text/xml": ".xml",
  "image/jpeg": ".jpeg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/bmp": ".bmp",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
  "application/zip": ".zip",
  "application/json": ".json",
  "application/xml": ".xml",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    ".pptx",
  "application/postscript": ".ps",
  "application/x-gtar-compressed": ".tgz",
  "application/x-shockwave-flash": ".swf",
  "audio/mpeg": ".mp3",
  "audio/wav": ".wav",
  "audio/ogg": ".ogg",
  "audio/midi": ".midi",
  "audio/x-midi": ".midi",
  "audio/webm": ".webm",
  "video/mpeg": ".mpeg",
  "video/mp4": ".mp4",
  "video/ogg": ".ogg",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
  "application/x-tar": ".tar",
  "application/x-gzip": ".gz",
  "application/x-bzip2": ".bz2",
  "application/x-7z-compressed": ".7z",
  "application/javascript": ".js",
  "application/x-javascript": ".js",
  "application/octet-stream": "",
  "application/font-woff": ".woff",
  "application/font-woff2": ".woff2",
  "application/vnd.android.package-archive": ".apk",
  "application/vnd.apple.installer+xml": ".mpkg",
  "application/x-deb": ".deb",
  "application/x-dvi": ".dvi",
  "application/x-font-ttf": ".ttf",
  "application/x-rar-compressed": ".rar",
  "application/x-sh": ".sh",
  "application/x-tex": ".tex",
  "application/rtf": ".rtf",
  "image/tiff": ".tiff",
  "image/x-icon": ".ico",
  "text/cache-manifest": ".appcache",
  "text/calendar": ".ics",
  "text/x-asm": ".asm",
  "text/x-c": ".c",
  "text/x-c++": ".cpp",
  "text/x-coffeescript": ".coffee",
  "text/x-diff": ".diff",
  "text/x-dtd": ".dtd",
  "text/x-erlang": ".erl",
  "text/x-haskell": ".hs",
  "text/x-java-source": ".java",
  "text/x-lua": ".lua",
  "text/x-mariadb": ".sql",
  "text/x-mysql": ".sql",
  "text/x-nfo": ".nfo",
  "text/x-pascal": ".pas",
  "text/x-perl": ".pl",
  "text/x-python": ".py",
  "text/x-rust": ".rs",
  "text/x-sass": ".sass",
  "text/x-scala": ".scala",
  "text/x-scss": ".scss",
  "text/x-sql": ".sql",
  "text/x-vhdl": ".vhdl",
  "text/x-yaml": ".yml",
  "text/vcard": ".vcf",
  "text/vnd.rim.location.xloc": ".xloc",
  "text/vnd.sun.j2me.app-descriptor": ".jad",
  "text/vtt": ".vtt",
  "text/x-component": ".htc",
  "text/x-jquery-tmpl": ".tmpl",
  "video/3gpp": ".3gp",
  "video/3gpp2": ".3g2",
  "video/h264": ".mp4",
  "video/x-flv": ".flv",
  "video/x-m4v": ".m4v",
  "video/x-mng": ".mng",
  "video/x-ms-asf": ".asf",
  "video/x-ms-wmv": ".wmv",
  "video/x-msvideo": ".avi",
  "video/x-sgi-movie": ".movie",
  "video/x-matroska": ".mkv",
  "application/vnd.mozilla.xul+xml": ".xul",
  "application/x-httpd-php": ".php",
  "application/x-httpd-php-source": ".phps",
  "application/x-latex": ".latex",
  "application/x-mpegURL": ".m3u8",
  "application/x-msdownload": ".exe",
  "application/x-msdos-program": ".com",
  "application/x-msi": ".msi",
  "application/x-www-form-urlencoded": "",
  "application/xhtml+xml": ".xhtml",
  "application/xml-dtd": ".dtd",
  "application/zip-compressed": ".zip",
  "audio/aac": ".aac",
  "audio/flac": ".flac",
  "audio/mp4": ".mp4a",
  "audio/mpeg3": ".mp3",
  "audio/x-ms-wma": ".wma",
  "audio/x-realaudio": ".ra",
  "image/x-xbitmap": ".xbm",
  "application/vnd.ms-fontobject": ".eot",
  "audio/vnd.rn-realaudio": ".ram",
  "image/vnd.wap.wbmp": ".wbmp",
  "image/x-xpixmap": ".xpm",
  "text/x-vcard": ".vcf",
  "application/vnd.oasis.opendocument.presentation": ".odp",
  "application/vnd.oasis.opendocument.spreadsheet": ".ods",
  "application/vnd.oasis.opendocument.text": ".odt",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
    ".ppsx",
  "application/vnd.openxmlformats-officedocument.presentationml.template":
    ".potx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
    ".xltx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
    ".dotx",
  "application/x-apple-diskimage": ".dmg",
  "application/x-bittorrent": ".torrent",
  "application/x-rar": ".rar",
  // 'application/x-shockwave-flash': '.swf',
  // 'application/x-tar': '.tar',
  "application/x-woff": ".woff",
  "application/x-xpinstall": ".xpi",
  "audio/aiff": ".aiff",
  "audio/basic": ".au",
  "audio/m4a": ".m4a",
  "audio/x-aac": ".aac",
  "audio/x-caf": ".caf",
  "audio/x-m4r": ".m4r",
  "font/otf": ".otf",
  "font/ttf": ".ttf",
  "font/woff2": ".woff2",
  "image/heif": ".heif",
  "image/heif-sequence": ".heifs",
  "image/heic": ".heic",
  "image/heic-sequence": ".heics",
  "image/vnd.adobe.photoshop": ".psd",
  "image/x-xcf": ".xcf",
  "model/gltf+json": ".gltf",
  "model/gltf-binary": ".glb",
  "model/iges": ".igs",
  "model/obj": ".obj",
  "model/stl": ".stl",
  "text/x-csrc": ".c",
  "text/x-c++src": ".cpp",
  "text/x-csharp": ".cs",
  // 'text/x-diff': '.diff',
  "text/x-fortran": ".f",
  "text/x-handlebars-template": ".hbs",
  "text/x-java": ".java",
  "text/x-ocaml": ".ml",
  // 'text/x-pascal': '.p',
  // 'text/x-perl': '.pl',
  "text/x-php": ".php",
  "text/x-ruby": ".rb",
  "text/x-swift": ".swift",
  "text/x-systemverilog": ".sv",
  "text/x-typescript": ".ts",
  // 'text/x-vhdl': '.vhd',
  "text/x-verilog": ".v",
  // 'video/3gpp': '.3gp',
  // 'video/3gpp2': '.3g2',
  "video/MP2T": ".ts",
  // 'video/quicktime': '.mov',
  "video/vnd.dlna.mpeg-tts": ".m2t",
  "video/x-flac": ".flac",
  // 'video/x-m4v': '.m4v',
  // 'video/x-matroska': '.mkv',
  // 'video/x-mng': '.mng',
  // 'video/x-ms-asf': '.asf',
  // 'video/x-ms-wmv': '.wmv',
  // 'video/x-msvideo': '.avi',
  // 'video/x-sgi-movie': '.movie',
  // 'video/webm': '.webm',
}

/**
 * Replace the inValided characters in file name
 *
 * @param name
 * @returns
 */
export function replaceFileName(name: string) {
  const regex = /[^a-zA-Z0-9.\-_]/g
  return name.replace(regex, "_")
}

/**
 * Get file name from url
 *
 * @param url
 * @param mime
 * @example
 * >>> getFileName("https://www.baidu.com/img/bd_logo1.png?where=super")
 * >>> bd_logo1.png
 *
 * >>> getFileName("https://www.baidu.com/img/bd_logo1.png?where=super", "image/png")
 * >>> bd_logo1.png
 */
export function getFileName(url: string, mime?: string) {
  let decodedUrl = decodeURIComponent(url)
  const queryIndex = decodedUrl.indexOf("?")
  if (queryIndex !== -1) {
    decodedUrl = decodedUrl.slice(0, queryIndex)
  }
  const regex = /(?<=(\/))([^\/]+)$/g
  const match = decodedUrl.match(regex)
  const ext = MIMEExtension[mime || ""] ?? ""
  if (!match) return `${Date.now()}_attachment${ext}`
  const res = mime
    ? `${replaceFileName(match[0].split(".")[0])}${ext}`
    : match[0]
  return res
}

/**
 * Validate url
 *
 * @param url
 * @returns
 */
export function validateUrl(url: string) {
  const regex = /^(http|https)?:\/\/[^\s/$.?#].[^\s]*$/
  return regex.test(url)
}

interface DownLoadFileOptions {
  onProgress?: (p: { loaded: number; total: number }) => void
  onLoaded?: (file: File) => void
  fetchOptions?: RequestInit
}

/**
 * Download file from url
 *
 * @param url
 * @param options
 * @returns
 */
export async function downLoadFile(url: string, options?: DownLoadFileOptions) {
  const { fetchOptions } = options ?? {}
  const { method } = fetchOptions ?? {}
  if (!validateUrl(url)) {
    // throw new Error("Invalid url")
    return Promise.reject("Invalid url")
  }
  if (method === "GET") {
    delete fetchOptions?.body
  }
  if (fetchOptions && fetchOptions.headers) {
    fetchOptions.headers = (
      fetchOptions?.headers as Array<[string, string]>
    ).filter((i) => i[0])
  }
  const res = await fetch(url, fetchOptions)
  if (!res.ok) {
    return null
  }
  const reader = res.body?.getReader()
  if (!reader) return null
  const total = Number(res.headers.get("Content-Length"))
  let loaded = 0
  const chunks: Array<Uint8Array> = []
  const { onProgress, onLoaded } = options ?? {}
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    loaded += value?.length ?? 0
    onProgress?.({ loaded, total })
  }
  const blob = new Blob(chunks)
  const MIME = res.headers.get("Content-Type")
  const fileName =
    res.headers
      .get("Content-Disposition")
      ?.replace(/(inline|attachment; filename=|attachment)/g, "")
      .replace(/\"/g, "")
      .trim() || getFileName(url, MIME ?? blob.type)
  const file = new File([blob], fileName, { type: MIME ?? blob.type })
  onLoaded?.(file)
  return file
}

export function downLoadFileFromA(url: string, name: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = name
  a.click()
  a.remove()
}
