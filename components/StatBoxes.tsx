import { Icon } from '@components/Icon';
import { getStatCounts } from '@db/queries';

export default async function StatBoxes() {
  const stats = await getStatCounts();

  const statItems = [
    { key: 'trips', label: 'Trips', icon: 'plane', colour: 'blue' },
    { key: 'countries', label: 'Countries', icon: 'globe', colour: 'coral' },
    { key: 'users', label: 'Users', icon: 'users', colour: 'coral' },
    { key: 'scores', label: 'Scores', icon: 'tick', colour: 'green' },
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.key}
          className="rounded-lg shadow-md flex flex-col items-center gap-2 p-8 bg-white"
        >
          <div className="bg-primary-coral p-1 rounded-full w-fit">
            <Icon name={item.icon} className="text-white" />
          </div>
          <p className="flex flex-col text-center">
            <span className="font-bold text-2xl">{stats[item.key]}</span>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
