import { Icon } from '@components/Icon';
import { ProfilePicture } from '@components/ProfilePicture';

interface TripParticipant {
  id: string;
  name: string;
  pictureUrl: string | null;
}

interface TripOption {
  id: number;
  date: Date;
  description: string | null;
  country: {
    name: string;
    code: string;
    twoLetterCode: string;
  };
  participants: TripParticipant[];
}

interface Props {
  trip: TripOption;
}

export default function TripDetailsBox({ trip }: Props) {
  const tripDate = new Date(trip.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <div className=" flex flex-col gap-2 w-full h-full">
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/${trip?.country?.twoLetterCode}.svg`}
            alt={`${trip?.country?.name} flag`}
            className="w-10 h-6 rounded-sm shadow-sm object-cover"
          />
          <h1 className="text-lg font-bold">{trip?.country?.name}</h1>
        </div>

        <div className="flex gap-2 items-center">
          <Icon name="calendar" size={20} className="text-gray-600" />
          <p className="text-gray-500">{tripDate}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {trip?.participants?.map((participant) => (
            <div
              key={participant.id}
              className="py-2 text-sm font-medium flex flex-col items-center"
            >
              <ProfilePicture picUrl={participant.pictureUrl} name={participant.name} />
              {participant.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
