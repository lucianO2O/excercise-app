const API_BASE_URL = '/api/v1/'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

export default function rest<T>(url: string): Promise<T> {
  return request<T>(url)
}

export function api<T>(endpoint: string): Promise<T> {
  return request<T>(`${API_BASE_URL}${endpoint}`)
}

export function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  return request<T>(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function apiPatch<T>(endpoint: string, body: unknown): Promise<T> {
  return request<T>(`${API_BASE_URL}${endpoint}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export function apiDelete<T>(endpoint: string): Promise<T> {
  return request<T>(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
  })
}
