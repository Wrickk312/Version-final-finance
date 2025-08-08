import AuthGuard from '@/components/AuthGuard'
import Tabs from '@/components/Tabs'

export default function AppLayout({children}:{children:React.ReactNode}){
  return (
    <AuthGuard>
      <Tabs />
      <div className="container pb-16">{children}</div>
    </AuthGuard>
  )
}
