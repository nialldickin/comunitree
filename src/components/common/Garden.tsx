import { graphql, createFragmentContainer } from 'react-relay';
import { Garden_GardenFragment } from '../../types/graphql';

interface Props {
  garden: Garden_GardenFragment;
}

const Card = ({ garden }: Props) => {
  return (
    <div className="rounded-2xl shadow-lg bg-white mx-auto">
      <div
        className="bg-no-repeat bg-center h-60 bg-cover rounded-t-2xl"
        style={{
          backgroundImage: `url('http://localhost:8080/images/${garden.photos[0].filename}')`
        }}
      />
      <div className="px-6 py-4">
        <div className="font-semibold text-xl mb-2">
          {`${garden.owner.firstName.trim()}'s Garden`}
        </div>
        <p className="text-gray-700 line-clamp-3 overflow-hidden h-three-lines">
          {garden.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Available
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          1m x 2m
        </span>
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          No-Fee
        </span>
      </div>
    </div>
  );
};

export default createFragmentContainer(Card, {
  garden: graphql`
    fragment Garden_garden on Garden {
      owner {
        firstName
      }
      description
      photos {
        filename
      }
    }
  `
});
