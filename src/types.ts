export interface LocationInfo {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
}

export interface AsInfo {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

export interface IpAddressInfo {
  ip: string;
  location: LocationInfo;
  domains: string[];
  as: AsInfo;
  isp: string;
}
