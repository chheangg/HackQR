import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState } from 'react';
import { getAllAttendances } from '../../../api/attendance';
import { MemberTableContext } from '../../../features/Member/contexts/MemberTableContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';

export const Route = createFileRoute('/_protected-layout/members')({
  component: () => <MemberLayoutPage />
});

function MemberLayoutPage() {
  const [tableOption, setTableOption] = useState<string>('');
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['member-attendance-dates'],
    queryFn: async () => await getAllAttendances()
  });

  if (isError) {
    return 'Error';
  }

  if (isLoading) {
    return 'Loading';
  }

  if (!data) {
    return 'Empty';
  }

  const todayDate = dayjs().format('YYYY-MM-DD');
  const isToday = data.find((a) => todayDate === a.date);

  if (isToday && !tableOption) {
    setTableOption(todayDate);
  }

  return (
    <div>
      <div className="flex flex-row-reverse gap-2 font-body">
        <Select
          onValueChange={(e) => setTableOption(e)}
          defaultValue={tableOption}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            {data.map((a) => (
              <SelectItem value={a.date} key={a.date}>
                {a.date}
              </SelectItem>
            ))}
            <SelectItem value="all">All Members</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs defaultValue="not-yet-arrived" className="mt-2 w-full">
        <TabsList className="grid grid-cols-3 bg-neutral-200 w-full">
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
            Absent
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <MemberTableContext.Provider value={{ date: tableOption }}>
            <Outlet />
          </MemberTableContext.Provider>
        </div>
      </Tabs>
    </div>
  );
}