import { CloudRegionEnum } from './enums';

export type DevCommandOptions = {
  port: string;
  origin: string;
  region: `${CloudRegionEnum}`;
  studioPort: string;
  dashboardUrl: string;
  route: string;
  tunnel: string;
  headless: boolean;
};

export type LocalTunnelResponse = {
  id: string;
  url: string;
};
