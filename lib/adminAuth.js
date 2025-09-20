export function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  try {
    const flag = localStorage.getItem("__admin_auth__");
    return flag === "true";
  } catch {
    return false;
  }
}

export async function adminLogin(email, password) {
  try {
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, message: json?.message || 'بيانات الدخول غير صحيحة' };
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("__admin_auth__", "true");
      localStorage.setItem("__admin_info__", JSON.stringify(json?.admin || {}));
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, message: 'تعذر الاتصال بالخادم' };
  }
}

export function adminLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("__admin_auth__");
    localStorage.removeItem("__admin_info__");
  }
}
