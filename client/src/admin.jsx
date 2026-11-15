import { useEffect, useState } from 'react';
import { api } from './api.js';

const groups = { pages: 'Trang', services: 'Dịch vụ', products: 'Sản phẩm', projects: 'Dự án', faqs: 'Hỏi đáp' };
const languages = { vi: 'Tiếng Việt', en: 'English', ja: '日本語', ko: '한국어' };
const statuses = { new: 'Mới', reviewing: 'Đang xử lý', closed: 'Đã xử lý' };
const blank = { title: '', slug: '', locale: 'vi', summary: '', body: '', source: '', order: 0 };
function Login({ onLogin }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      onLogin(await api('/admin/login', { method: 'POST', body: Object.fromEntries(new FormData(event.currentTarget)) }));
    } catch (error) { setError(error.message); }
    finally { setBusy(false); }
  }
  return <form className="panel login" onSubmit={submit}><h1>Đăng nhập quản trị</h1>
    <label>Email<input type="email" name="email" autoComplete="username" required /></label>
    <label>Mật khẩu<input type="password" name="password" autoComplete="current-password" required /></label>
    <button className="button primary" disabled={busy}>{busy ? 'Đang đăng nhập…' : 'Đăng nhập'}</button>
    {error && <p className="notice error" role="alert">{error}</p>}
  </form>;
}
function Editor({ selection, choose, group, entries, refresh, fail }) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const locked = selection?.status === 'published';
  const field = (name, value) => choose({ ...selection, [name]: value });
  async function write(action) {
    setBusy(true); setNote('');
    try {
      const path = '/admin/content/' + group + (selection._id ? '/' + selection._id : '');
      const updated = action === 'save'
        ? await api(path, { method: selection._id ? 'PUT' : 'POST', body: selection })
        : await api(path + '/status', { method: 'PATCH', body: { status: action } });
      choose(updated); refresh();
      setNote(action === 'save' ? 'Đã lưu bản nháp.' : action === 'published' ? 'Đã xuất bản.' : 'Đã gỡ xuất bản.');
    } catch (error) { fail(error); }
    finally { setBusy(false); }
  }
  return <div className="admin-grid">
    <aside className="panel entry-list"><button disabled={busy} className="button primary" onClick={() => { choose({ ...blank }); setNote(''); }}>Tạo bản nháp</button>
      {entries.map(entry => <button disabled={busy} key={entry._id} className={selection?._id === entry._id ? 'selected' : ''}
        onClick={() => { choose(entry); setNote(''); }}><strong>{entry.title}</strong><small>{entry.locale.toUpperCase()} · {entry.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}</small></button>)}
    </aside>
    {selection ? <form className="panel editor" onSubmit={event => { event.preventDefault(); write('save'); }}>
      <h2>{selection._id ? selection.title : 'Bản nháp mới'}</h2>
      <fieldset disabled={busy || locked}><div className="form-grid">
        <label>Tiêu đề<input required maxLength={160} value={selection.title} onChange={e => field('title', e.target.value)} /></label>
        <label>Slug<input required maxLength={100} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={selection.slug} onChange={e => field('slug', e.target.value)} /></label>
        <label>Ngôn ngữ<select value={selection.locale} onChange={e => field('locale', e.target.value)}>{Object.entries(languages).map(([id, title]) => <option key={id} value={id}>{title}</option>)}</select></label>
        <label>Thứ tự<input type="number" min="0" max="9999" required value={selection.order} onChange={e => field('order', e.target.valueAsNumber)} /></label>
        <label className="wide">Tóm tắt<textarea rows="2" maxLength={480} value={selection.summary} onChange={e => field('summary', e.target.value)} /></label>
        <label className="wide">Nội dung<textarea rows="7" maxLength={12000} value={selection.body} onChange={e => field('body', e.target.value)} /></label>
        <label className="wide">Nguồn được duyệt<input maxLength={500} value={selection.source} onChange={e => field('source', e.target.value)} /></label>
      </div></fieldset>
      <div className="actions">
        {!locked && <button className="button primary" disabled={busy}>Lưu bản nháp</button>}
        {selection._id && <button type="button" className="button outline" disabled={busy} onClick={() => write(locked ? 'draft' : 'published')}>{locked ? 'Gỡ xuất bản' : 'Xuất bản bản đã lưu'}</button>}
      </div>
      {note && <p className="notice success" role="status">{note}</p>}
    </form> : <div className="panel">Chọn một mục hoặc tạo bản nháp để bắt đầu.</div>}
  </div>;
}
function Contacts({ data, page, setPage, refresh, fail }) {
  const [busy, setBusy] = useState(false);
  async function update(id, status) {
    setBusy(true);
    try { await api('/admin/contacts/' + id, { method: 'PATCH', body: { status } }); refresh(); }
    catch (error) { fail(error); }
    finally { setBusy(false); }
  }
  return <section aria-label="Yêu cầu tư vấn">
    {!data.entries.length && <p className="notice">Chưa có yêu cầu tư vấn.</p>}
    {data.entries.map(item => <article key={item._id} className="panel inquiry"><div>
      <h2>{item.name}</h2><p>{item.email}{item.company && ' · ' + item.company}{item.phone && ' · ' + item.phone}</p>
      <small>{new Date(item.createdAt).toLocaleString('vi-VN')}</small><p className="body-text">{item.message}</p>
    </div><label>Trạng thái<select value={item.status} disabled={busy} onChange={e => update(item._id, e.target.value)}>
      {Object.entries(statuses).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
    </select></label></article>)}
    {data.total > 25 && <div className="actions"><button className="button outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Trang trước</button>
      <span>Trang {page}</span><button className="button outline" disabled={page * 25 >= data.total} onClick={() => setPage(page + 1)}>Trang sau</button></div>}
  </section>;
}
export default function Admin() {
  const [account, setAccount] = useState(undefined);
  const [group, setGroup] = useState('pages');
  const [selection, choose] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [revision, bump] = useState(0);
  const [error, setError] = useState('');
  const refresh = () => bump(value => value + 1);
  const fail = error => { setError(error.message); if (error.status === 401) setAccount(null); };
  useEffect(() => {
    api('/admin/session').then(setAccount).catch(error => {
      if (error.status !== 401) setError(error.message);
      setAccount(null);
    });
  }, []);
  useEffect(() => {
    if (!account) return;
    const abort = new AbortController();
    api(group === 'contacts' ? '/admin/contacts?page=' + page : '/admin/content/' + group, { signal: abort.signal })
      .then(setData).catch(error => { if (!abort.signal.aborted) fail(error); });
    return () => abort.abort();
  }, [account, group, page, revision]);
  async function signOut() {
    try { await api('/admin/logout', { method: 'POST', body: {} }); setAccount(null); setData(null); choose(null); setError(''); }
    catch (error) { fail(error); }
  }
  return <section className="shell page admin">
    {error && <p className="notice error" role="alert">{error}</p>}
    {account === undefined ? <p role="status">Đang kiểm tra phiên…</p> : !account ? <Login onLogin={value => { setError(''); setAccount(value); }} /> :
      <><div className="section-title"><div><h1>Quản trị Platinum</h1><p>{account.email}</p></div><button className="button outline" onClick={signOut}>Đăng xuất</button></div>
        <nav className="tabs" aria-label="Quản trị nội dung">{Object.entries({ ...groups, contacts: 'Yêu cầu tư vấn' }).map(([id, title]) =>
          <button key={id} aria-pressed={group === id} onClick={() => { if (id === group) return; setGroup(id); setData(null); choose(null); setError(''); setPage(1); }}>{title}</button>)}</nav>
        {data ? group === 'contacts' ? <Contacts data={data} page={page} setPage={setPage} refresh={refresh} fail={fail} /> :
          <Editor key={group} entries={data} group={group} selection={selection} choose={choose} refresh={() => { setError(''); refresh(); }} fail={fail} /> : !error && <p role="status">Đang tải…</p>}
      </>}
  </section>;
}
