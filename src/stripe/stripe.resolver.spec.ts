import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './stripe.resolver';

describe('StripeResolver', () => {
  let resolver: PaymentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentResolver],
    }).compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
