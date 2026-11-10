import {Practice} from '@/components/academy/practice';
export default async function Page({params}:{params:Promise<{labId:string}>}){const {labId}=await params;return <Practice key={labId} id={labId}/>;}
