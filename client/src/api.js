export async function api(path, { body, method = 'GET', signal } = {}) {
  const response = await fetch('/api' + path, {
    method, signal, credentials: 'same-origin',
    ...(body !== undefined && { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null) {
    const error = new Error(data?.error || 'Không thể kết nối. Vui lòng thử lại.');
    error.status = response.ok ? 502 : response.status;
    throw error;
  }
  return data;
}
