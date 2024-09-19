import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs'

export const Route = createFileRoute('/members')({
  component: () => <MemberLayoutPage />
})

function MemberLayoutPage() {
  const navigate = useNavigate()
  return (
    <Tabs defaultValue='not-yet-arrived' className='w-full'>
      <TabsList className='grid grid-cols-4 bg-neutral-200 w-full'>
        <TabsTrigger 
          value="not-yet-arrived" 
          onClick={() => navigate({ to: '/members' })}
        >
          Not Yet Arrived
        </TabsTrigger>
        <TabsTrigger 
          value="present" 
          onClick={() => navigate({ to: '/members/present' })}
        >
          Present
        </TabsTrigger>
        <TabsTrigger
          value="late" 
          onClick={() => navigate({ to: '/members/late' })}
        >
          Late
        </TabsTrigger>
        <TabsTrigger
          value="absent" 
          onClick={() => navigate({ to: '/members/absent' })}       
        >  
          Absent
        </TabsTrigger>
      </TabsList>
      <div>
        <Outlet />
      </div>
    </Tabs>
  )
}