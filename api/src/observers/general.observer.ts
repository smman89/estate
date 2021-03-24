import {
    inject,
    lifeCycleObserver,
    LifeCycleObserver
} from '@loopback/core';
import faker from 'faker';
import {AdRepository} from '../repositories/ad.repository';
const {name, random, lorem, image} = faker;

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class SampleObserver implements LifeCycleObserver {
    constructor(
        @inject('repositories.AdRepository') private adRepo: AdRepository,
    ) { }

    /**
     * This method will be invoked when the application starts
     */
    async start(): Promise<void> {
        // Add your logic for start
        if (false) {
            await this.createAds();
        }
    }

    /**
     * This method will be invoked when the application stops
     */
    async stop(): Promise<void> {
        // Add your logic for stop
    }

    async createAds(): Promise<void> {
        const NUMBER_OF_ADS = 100
        const ads: object[] = []

        for (let index = 0; index < NUMBER_OF_ADS; index++) {

            ads.push({

                description: lorem.sentences(),
                cityId: random.number({min: 1, max: 100}),
                userId: random.number({min: 1000, max: 1000000}),
                postId: random.number({min: 100, max: 1000}),
                avatar: image.imageUrl(),
                publicId: random.number({min: 100, max: 1000}),
                createdAt: random.number({min: 1616425635, max: 1616485635}),
                firstname: name.firstName(),
                adType: random.number({min: 0, max: 1}),
                images: [...Array(5)].map(() => image.imageUrl())
            })
        };

        for (const ad of ads) {
            await this.adRepo.create(ad);
        }
    }

}
