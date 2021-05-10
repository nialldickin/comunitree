import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { BeatLoader } from 'react-spinners';
import { GardenGrid_GardensFragment } from '../../types/graphql';
import DelayedMount from './DelayedMount';
import GardenCard from './Garden';

interface Props {
  gardens: ReadonlyArray<GardenGrid_GardensFragment>;
  loading?: boolean;
}

const GardenGrid = ({ gardens, loading = false }: Props) => {
  return (
    <div className="gardenlist-grid">
      {loading && (
        <DelayedMount
          delayMs={500}
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center bg-gray-50 bg-opacity-50"
        >
          <div className="my-auto">
            <BeatLoader color={'#77DD77'} size={50} margin={1} />
          </div>
        </DelayedMount>
      )}
      {gardens.map((garden) => (
        <GardenCard key={garden._id} garden={garden} />
      ))}
    </div>
  );
};

export default createFragmentContainer(GardenGrid, {
  gardens: graphql`
    fragment GardenGrid_gardens on Garden @relay(plural: true) {
      _id
      ...Garden_garden
    }
  `
});
