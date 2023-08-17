import cacheManager, { CacheManagerOptions, Cacheable } from '@type-cacheable/core';

import { LRUCache } from 'lru-cache';
import { useAdapter } from '@type-cacheable/lru-cache-adapter';

const client = new LRUCache({ max: 50_000 });
useAdapter(client);

cacheManager.setOptions({ debug: true } as CacheManagerOptions);


export class TestClass {
  private values: any[] = [1, 2, 3, 4, 5];

  // This static method is being called to generate a cache key based on the given arguments.
  // Not featured here: the second argument, context, which is the instance the method
  // was called on.
  static setCacheKey = (args: any[]) => args[0];

  @Cacheable({ cacheKey: 'values' })
  public getValues(): Promise<number[]> {
    return Promise.resolve(this.values);
  }
}