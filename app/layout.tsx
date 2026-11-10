import type { Metadata } from 'next';
import './globals.css';
import {AcademyProvider} from '@/components/academy/provider';
import {Shell} from '@/components/academy/shell';
export const metadata:Metadata={title:'ERP 1C Academy — Học vững, thực hành thật',description:'13 bài giảng tiếng Việt, video, bài thực hành ERP, trắc nghiệm và lộ trình tự học 1C.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi" suppressHydrationWarning><body><AcademyProvider><Shell>{children}</Shell></AcademyProvider></body></html>;}
