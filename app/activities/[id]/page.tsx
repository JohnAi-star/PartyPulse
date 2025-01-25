import { Metadata } from 'next';
import { activities } from '@/lib/data/activities';
import ActivityHeader from '@/components/activities/activity-header';
import ActivityDetails from '@/components/activities/activity-details';
import BookingForm from '@/components/activities/booking-form';
import { notFound } from 'next/navigation';

// Define the Activity interface
interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string; // Ensure `date` exists and is a string
}

// Props for the page component
interface PageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  return activities.map((activity) => ({
    id: activity.id,
  }));
}

// Generate metadata dynamically based on the activity
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const activity = activities.find((a) => a.id === params.id);

  if (!activity) {
    return {}; // Return empty metadata if activity is not found
  }

  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      title: activity.title,
      description: activity.description,
      images: [activity.image],
    },
  };
}

// Dynamic route page component
export default function ActivityPage({ params }: PageProps) {
  // Find the activity by ID
  const activity = activities.find((a) => a.id === params.id);

  if (!activity) {
    return notFound(); // Show 404 if the activity is not found
  }

  // Handle booking form submission
  const handleBookingSubmit = (formData: {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
  }) => {
    console.log('Booking submitted:', formData);
    // Add booking logic here if needed
  };

  return (
    <div>
      <ActivityHeader
        title={activity.title}
        date={activity.date} // Ensure `date` is present in `Activity` type
        description={activity.description}
      />
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Activity details */}
          <div className="lg:col-span-2">
            <ActivityDetails activity={activity} />
          </div>
          {/* Booking form */}
          <div>
            <div className="sticky top-24">
              <BookingForm onSubmit={handleBookingSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
