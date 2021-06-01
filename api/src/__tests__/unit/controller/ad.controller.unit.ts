import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor
} from '@loopback/testlab';
import {AdController} from '../../../controllers';
import {Ad} from '../../../models';
import {AdRepository} from '../../../repositories';
import {givenAd} from '../../helpers';

describe('AdController', () => {
  let adRepo: StubbedInstanceWithSinonAccessor<AdRepository>;
  let controller: AdController;
  let ad: Ad;
  let adWithId: Ad;
  let aChangedAd: Ad;
  let aListOfAds: Ad[];

  beforeEach(resetRepositories);

  describe('createAd', () => {
    it('creates an Ad', async () => {
      const create = adRepo.stubs.create;
      create.resolves(adWithId);
      const result = await controller.create(ad);
      expect(result).to.eql(adWithId);
      sinon.assert.calledWith(create, ad);
    });
  });

  describe('findAdById', () => {
    it('returns an ad if it exists', async () => {
      const findById = adRepo.stubs.findById;
      findById.resolves(adWithId);
      expect(await controller.findById(adWithId.id as number)).to.eql(
        adWithId,
      );
      sinon.assert.calledWith(findById, adWithId.id);
    });
  });

  describe('findAds', () => {
    it('returns multiple ads if they exist', async () => {
      const find = adRepo.stubs.find;
      find.resolves(aListOfAds);
      expect(await controller.find()).to.eql(aListOfAds);
      sinon.assert.called(find);
    });

    it('returns empty list if no ads exist', async () => {
      const find = adRepo.stubs.find;
      const expected: Ad[] = [];
      find.resolves(expected);
      expect(await controller.find()).to.eql(expected);
      sinon.assert.called(find);
    });
  });

  describe('replaceAd', () => {
    it('successfully replaces existing items', async () => {
      const replaceById = adRepo.stubs.replaceById;
      replaceById.resolves();
      await controller.replaceById(adWithId.id as number, aChangedAd);
      sinon.assert.calledWith(replaceById, adWithId.id, aChangedAd);
    });
  });

  describe('updateAd', () => {
    it('successfully updates existing items', async () => {
      const updateById = adRepo.stubs.updateById;
      updateById.resolves();
      await controller.updateById(adWithId.id as number, aChangedAd);
      sinon.assert.calledWith(updateById, adWithId.id, aChangedAd);
    });
  });

  describe('deleteAd', () => {
    it('successfully deletes existing items', async () => {
      const deleteById = adRepo.stubs.deleteById;
      deleteById.resolves();
      await controller.deleteById(adWithId.id as number);
      sinon.assert.calledWith(deleteById, adWithId.id);
    });
  });

  function resetRepositories() {
    adRepo = createStubInstance(AdRepository);
    ad = givenAd();
    adWithId = givenAd({
      id: 1,
    });
    aListOfAds = [
      adWithId,
      givenAd({
        id: 2,
        description: 'New Home',
      }),
    ] as Ad[];
    aChangedAd = givenAd({
      id: adWithId.id,
      description: 'Amazing flat',
    });

    controller = new AdController(adRepo);
  }
});
