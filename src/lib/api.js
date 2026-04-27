const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787"

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
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

  return request(`/api/products${query ? `?${query}` : ""}`)
}

export function fetchProduct(id) {
  return request(`/api/products/${id}`)
}

export function loginUser(payload) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function sendLoginOtp(payload) {
  return request("/api/auth/send-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function verifyLoginOtp(payload) {
  return request("/api/auth/verify-otp-login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function sendSignupOtp(payload) {
  return request("/api/auth/signup/send-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function verifySignupOtp(payload) {
  return request("/api/auth/signup/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function fetchAccount(userId) {
  return request(`/api/account/${userId}`)
}

export function placeOrder(payload) {
  return request("/api/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export { API_BASE_URL }
