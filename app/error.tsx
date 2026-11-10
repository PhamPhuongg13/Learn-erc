'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="panel empty-state"><h1>Chưa tải được nội dung.</h1><p>Hãy thử tải lại. Tiến độ đã lưu nằm trong trình duyệt.</p><button className="button primary" onClick={reset}>Thử lại</button></section>;}
