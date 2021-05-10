import { Environment, RecordSource, Store } from 'relay-runtime';
import {
  RelayNetworkLayer,
  uploadMiddleware,
  urlMiddleware
} from 'react-relay-network-modern';

const network = new RelayNetworkLayer([
  uploadMiddleware(),
  urlMiddleware({
    url: (req) => Promise.resolve('http://localhost:8080/graphql')
  })
]);

const environment = new Environment({
  network: network,
  store: new Store(new RecordSource())
});

export default environment;
