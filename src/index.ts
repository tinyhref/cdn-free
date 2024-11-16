import { Data, uploadParams } from './types';
import createPackageNpm from './createPackageNpm';

const uploadCdn = async (params: uploadParams) => {
  // Process more data here: create multiple images of different sizes,...
  const { isReturnLink = true } = params;

  const data = await createPackageNpm(params);

  if (isReturnLink) {
    const { filename, version, packageName }: Data = data;
    const path = `${packageName}@${version}/${filename}`;

    const providers = [
      'https://cdn.jsdelivr.net/npm',
      'https://unpkg.com',
      'https://esm.sh'
    ]

    return {
      links: providers.map(provider => `${provider}/${path}`),
      package: data
    }
  }

  return data
}

export {
  uploadCdn,
  createPackageNpm
}