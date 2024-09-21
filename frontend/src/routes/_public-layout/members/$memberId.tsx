import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getMemberById } from '../../../api/member';
import { MemberCard } from '../../../features/Member/components/MemberCard';

export const Route = createFileRoute('/_public-layout/members/$memberId')({
  component: () => <MemberDetailPage />
});

function MemberDetailPage() {
  const { memberId } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['member-detail-' + memberId],
    queryFn: async () => await getMemberById(memberId)
  });

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading";
  }

  if (!data) {
    return "Empty";
  }

  return (
    <div className='place-content-center grid w-full h-screen'>
      <MemberCard member={data} />
    </div>
  );
}
