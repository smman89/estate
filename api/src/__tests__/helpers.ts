
import {Ad} from '../models';

/**
 * Generate a complete Ad object for use with tests.
 * @param ad - A partial (or complete) Ad object.
 */
export function givenAd(ad?: Partial<Ad>) {
  const data = Object.assign(
    {
      description: 'There are some things that need doing',
      cityId: 1,
      userId: 1,
      postId: 1122,
      price: 100,
      address: 'Address',
      createdAt: 11777771,
      adType: 1,
    },
    ad,
  );
  return new Ad(data);
}

export function givenAdWithoutId(ad?: Partial<Ad>): Omit<Ad, 'id'> {
  return givenAd(ad);
}
