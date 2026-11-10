'use client';
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {createProgress,localDay,STORE_KEY} from '@/lib/academy/engine';
import {parseProgress} from '@/lib/academy/storage';
import type {Progress} from '@/lib/academy/types';
type Store={p:Progress;ready:boolean;error:string;update:(fn:(p:Progress)=>Progress)=>void;replace:(p:Progress)=>void};
const Context=createContext<Store|null>(null);
export function AcademyProvider({children}:{children:ReactNode}){const [p,setP]=useState<Progress>(createProgress);const [ready,setReady]=useState(false);const [error,setError]=useState('');const canWrite=useRef(true);
useEffect(()=>{try{const raw=localStorage.getItem(STORE_KEY);if(raw)setP(parseProgress(raw));}catch{setError('Không đọc được tiến độ đã lưu. Dữ liệu cũ được giữ lại; hãy nhập bản sao lưu hoặc đặt lại trong Cài đặt.');canWrite.current=false;}setReady(true);},[]);
useEffect(()=>{if(!ready)return;document.documentElement.dataset.theme=p.settings.theme;if(!canWrite.current)return;try{localStorage.setItem(STORE_KEY,JSON.stringify(p));setError('');}catch{setError('Trình duyệt không thể lưu tiến độ. Hãy xuất JSON để giữ bản sao.');}},[p,ready]);
const update=(fn:(p:Progress)=>Progress)=>setP(old=>{const next=fn(old);return {...next,activity:[...new Set([...next.activity,localDay()])]};});
const replace=(next:Progress)=>{canWrite.current=true;setP(next);};
return <Context.Provider value={{p,ready,error,update,replace}}>{children}</Context.Provider>;}
export function useAcademy(){const c=useContext(Context);if(!c)throw Error('Missing AcademyProvider');return c;}
