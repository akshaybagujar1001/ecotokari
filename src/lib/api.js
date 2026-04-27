const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://app.ecotokari.com"

function getStoredToken() {
  try {
    return localStorage.getItem("eco_token")
  } catch {
    return null
  }
}

async function request(path, options = {}) {
  const token = options.token || getStoredToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || "Request failed")
  }

  return data
}

export function fetchProducts(params = {}) {
  const search = new URLSearchParams()
  if (params.search) search.set("search", params.search)
  if (params.category && params.category !== "All") search.set("category", params.category)
  const query = search.toString()

  return request(`/api/website/products${query ? `?${query}` : ""}`)
}

export function fetchProduct(id) {
  return request(`/api/website/products/${id}`)
}

export function loginUser(payload) {
  return request("/api/website/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function sendLoginOtp(payload) {
  return request("/api/website/auth/send-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function verifyLoginOtp(payload) {
  return request("/api/website/auth/verify-otp-login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function sendSignupOtp(payload) {
  return request("/api/website/auth/signup/send-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function verifySignupOtp(payload) {
  return request("/api/website/auth/signup/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function fetchAccount() {
  return request("/api/website/account/me")
}

export function placeOrder(payload) {
  return request("/api/website/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export { API_BASE_URL }
