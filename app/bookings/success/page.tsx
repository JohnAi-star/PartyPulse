import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  // Redirect if session_id is missing
  if (!sessionId) {
    redirect('/');
  }

  // Retrieve the session
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session) {
    redirect('/');
  }

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center">Booking Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Thank you for your booking. We've sent a confirmation email with
              all the details.
            </p>
            <Button asChild>
              <Link href="/activities">Browse More Activities</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
