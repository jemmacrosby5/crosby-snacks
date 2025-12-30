export async function apiFetch(path: string, options?: RequestInit) {
  try {
    const API_BASE_URL =
      typeof window === 'undefined'
        ? process.env.BACKEND_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('apiFetch error:', error);
    throw error;
  }
}

export function parseDecimal(v: any) {
  if (v && typeof v === 'object' && '$numberDecimal' in v) {
    return parseFloat(v.$numberDecimal);
  }
  return typeof v === 'string' ? parseFloat(v) : Number(v || 0);
}
