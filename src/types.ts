export interface Params {
  npmToken: string;
  dataFile: any;
  filename: string;
  packageVersion: string;
  packageNames: string[];
  packageDescription?: string,
  mainFile?: string;
}

export interface uploadParams extends Params {
  isReturnLink?: boolean
}

export interface Data {
  filename: string;
  version: string;
  packageName: string;
}