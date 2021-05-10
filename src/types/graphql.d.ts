export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type SortOrder = 'NEWEST' | 'OLDEST' | 'CLOSEST' | 'FURTHEST';

export type GardenSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export type UploadResponse = {
  readonly __typename?: 'UploadResponse';
  readonly newFilename: Scalars['String'];
  readonly originalFilename: Scalars['String'];
};

export type File = {
  readonly __typename?: 'File';
  readonly filename: Scalars['String'];
};

export type FileInput = {
  readonly filename: Scalars['String'];
};

export type Location = {
  readonly __typename?: 'Location';
  readonly latitude: Scalars['Float'];
  readonly longitude: Scalars['Float'];
};

export type LocationInput = {
  readonly latitude: Scalars['Float'];
  readonly longitude: Scalars['Float'];
};

export type Owner = {
  readonly __typename?: 'Owner';
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly username: Scalars['String'];
};

export type User = {
  readonly __typename?: 'User';
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly emailAddress: Scalars['String'];
  readonly password: Scalars['String'];
};

export type OwnerInput = {
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly username: Scalars['String'];
};

export type Garden = {
  readonly __typename?: 'Garden';
  readonly _id: Scalars['ID'];
  readonly owner: Owner;
  readonly description: Scalars['String'];
  readonly photos: ReadonlyArray<File>;
  readonly location: Location;
};

export type GardenList = {
  readonly __typename?: 'GardenList';
  readonly gardens: ReadonlyArray<Garden>;
  readonly count: Scalars['Int'];
};

export type AddressPrediction = {
  readonly __typename?: 'AddressPrediction';
  readonly description: Scalars['String'];
  readonly place_id: Scalars['String'];
};

export type Viewer = {
  readonly __typename?: 'Viewer';
  readonly convertPlaceToCoordinates: Location;
  readonly getGeocodedLocation: ReadonlyArray<AddressPrediction>;
  readonly getGarden?: Maybe<Garden>;
  readonly getGardens: GardenList;
};

export type ViewerConvertPlaceToCoordinatesArgs = {
  placeId: Scalars['String'];
};

export type ViewerGetGeocodedLocationArgs = {
  address: Scalars['String'];
};

export type ViewerGetGardenArgs = {
  id: Scalars['ID'];
};

export type ViewerGetGardensArgs = {
  first: Scalars['Int'];
  after: Scalars['Int'];
  sortEnum: SortOrder;
  location?: Maybe<LocationInput>;
  searchDistance?: Maybe<Scalars['Float']>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly viewer: Viewer;
};

export type GardenInput = {
  readonly owner: OwnerInput;
  readonly description: Scalars['String'];
  readonly photos: ReadonlyArray<FileInput>;
  readonly location: LocationInput;
};

export type UserInput = {
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly emailAddress: Scalars['String'];
  readonly password: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly singleUpload: UploadResponse;
  readonly createGarden: Scalars['Boolean'];
  readonly createUser: Scalars['String'];
};

export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};

export type MutationCreateGardenArgs = {
  garden: GardenInput;
};

export type MutationCreateUserArgs = {
  user: UserInput;
};

export type Garden_GardenFragment = {
  readonly __typename?: 'Garden';
  readonly description: string;
  readonly owner: {
    readonly __typename?: 'Owner';
    readonly firstName: string;
  };
  readonly photos: ReadonlyArray<{
    readonly __typename?: 'File';
    readonly filename: string;
  }>;
};

export type GardenGrid_GardensFragment = {
  readonly __typename?: 'Garden';
  readonly _id: string;
} & Garden_GardenFragment;

export type FeaturedGardensQueryVariables = Exact<{
  first: Scalars['Int'];
  after: Scalars['Int'];
  sortEnum: SortOrder;
}>;

export type FeaturedGardensQuery = {
  readonly __typename?: 'Query';
  readonly viewer: {
    readonly __typename?: 'Viewer';
    readonly getGardens: {
      readonly __typename?: 'GardenList';
      readonly count: number;
      readonly gardens: ReadonlyArray<
        {
          readonly __typename?: 'Garden';
        } & GardenGrid_GardensFragment
      >;
    };
  };
};

export type PaginationContainer_ViewerFragment = {
  readonly __typename?: 'Viewer';
  readonly getGardens: {
    readonly __typename?: 'GardenList';
    readonly count: number;
    readonly gardens: ReadonlyArray<
      { readonly __typename?: 'Garden' } & GardenGrid_GardensFragment
    >;
  };
};

export type PaginationContainerRefetchQueryVariables = Exact<{
  first: Scalars['Int'];
  after: Scalars['Int'];
  sortEnum: SortOrder;
  location?: Maybe<LocationInput>;
  searchDistance?: Maybe<Scalars['Float']>;
}>;

export type PaginationContainerRefetchQuery = {
  readonly __typename?: 'Query';
  readonly viewer: {
    readonly __typename?: 'Viewer';
  } & PaginationContainer_ViewerFragment;
};

export type AutocompleteSearchQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type AutocompleteSearchQuery = {
  readonly __typename?: 'Query';
  readonly viewer: {
    readonly __typename?: 'Viewer';
    readonly predictions: ReadonlyArray<{
      readonly __typename?: 'AddressPrediction';
      readonly description: string;
      readonly place_id: string;
    }>;
  };
};

export type CreateGardenMutationVariables = Exact<{
  garden: GardenInput;
}>;

export type CreateGardenMutation = {
  readonly __typename?: 'Mutation';
  readonly success: boolean;
};

export type CreateUserMutationVariables = Exact<{
  user: UserInput;
}>;

export type CreateUserMutation = {
  readonly __typename?: 'Mutation';
  readonly response: string;
};

export type GeocodeLocationQueryVariables = Exact<{
  placeId: Scalars['String'];
}>;

export type GeocodeLocationQuery = {
  readonly __typename?: 'Query';
  readonly viewer: {
    readonly __typename?: 'Viewer';
    readonly location: {
      readonly __typename?: 'Location';
      readonly latitude: number;
      readonly longitude: number;
    };
  };
};

export type SingleUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;

export type SingleUploadMutation = {
  readonly __typename?: 'Mutation';
  readonly file: {
    readonly __typename?: 'UploadResponse';
    readonly newFilename: string;
    readonly originalFilename: string;
  };
};

export type SearchQueryVariables = Exact<{
  first: Scalars['Int'];
  after: Scalars['Int'];
  sortEnum: SortOrder;
  location?: Maybe<LocationInput>;
  searchDistance?: Maybe<Scalars['Float']>;
}>;

export type SearchQuery = {
  readonly __typename?: 'Query';
  readonly viewer: {
    readonly __typename?: 'Viewer';
  } & PaginationContainer_ViewerFragment;
};
