import { Test, TestingModule } from '@nestjs/testing';
import { ShippingAddressResolver } from './shipping-address.resolver';

describe('ShippingAddressResolver', () => {
  let resolver: ShippingAddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingAddressResolver],
    }).compile();

    resolver = module.get<ShippingAddressResolver>(ShippingAddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
