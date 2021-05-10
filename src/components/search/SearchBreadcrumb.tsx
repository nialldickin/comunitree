interface Props {
  location: string;
  distance: number;
}

export const SearchBreadcrumb = ({ location, distance }: Props) => (
  <span className="font-light text-lg self-start mr-auto">
    Search {'>'}{' '}
    {location.length
      ? `Gardens ${distance ? 'near' : 'in'} ${location}`
      : 'All Gardens'}
  </span>
);
