
import {Ad} from '../models';

/*
 ==============================================================================
 HELPER FUNCTIONS
 If you find yourself creating the same helper functions across different
 test files, then extracting those functions into helper modules is an easy
 way to reduce duplication.

 Other tips:

 - Using the super awesome Partial<T> type in conjunction with Object.assign
   means you can:
   * customize the object you get back based only on what's important
   to you during a particular test
   * avoid writing test logic that is brittle with respect to the properties
   of your object
 - Making the input itself optional means you don't need to do anything special
   for tests where the particular details of the input don't matter.
 ==============================================================================
 */

/**
 * Generate a complete Ad object for use with tests.
 * @param ad - A partial (or complete) Ad object.
 */
export function givenAd(ad?: Partial<Ad>) {
  const data = Object.assign(
    {
      title: 'do a thing',
      desc: 'There are some things that need doing',
      isComplete: false,
      todoListId: 999,
    },
    ad,
  );
  return new Ad(data);
}

export function givenAdWithoutId(ad?: Partial<Ad>): Omit<Ad, 'id'> {
  return givenAd(ad);
}
