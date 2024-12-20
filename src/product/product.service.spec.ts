import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductDbService } from '../DB/product-db/product-db.service';
import { JwtService } from '@nestjs/jwt';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const fakeProductDbService = {
      create: () => ({}),
      findAll: () => ({}),
      findOne: () => ({}),
      update: () => ({}),
      delete: () => ({}),
    };
    const fakeJwtService = {
      signAsync: jest.fn().mockResolvedValue('fake-token'),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductDbService,
          useValue: fakeProductDbService,
        },
        {
          provide: JwtService,
          useValue: fakeJwtService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const product = {
      name: 'test product',
      price: 100,
    };

    const createdProduct = {
      name: 'test product',
      description: "that's very good product",
      price: 100,
      stock: 50,
      _id: '6765a5af3b3e98a771e2cba3',
      createdAt: '2024-12-20T17:13:19.916Z',
      updatedAt: '2024-12-20T17:13:19.916Z',
      __v: 0,
    };

    const mockCreate = jest.fn().mockResolvedValue(createdProduct);
    (service as any).productDbService.create = mockCreate;

    const result = await service.createProduct(product);
    expect(result).toEqual(createdProduct);
    expect(mockCreate).toHaveBeenCalledWith(product);
  });
  it('should get all products', async () => {
    const products = [
      {
        name: 'test product',
        description: "that's very good product",
        price: 100,
        stock: 50,
        _id: '6765a5af3b3e98a771e2cba3',
        createdAt: '2024-12-20T17:13:19.916Z',
        updatedAt: '2024-12-20T17:13:19.916Z',
        __v: 0,
      },
    ];

    const mockFindAll = jest.fn().mockResolvedValue(products);
    (service as any).productDbService.findAll = mockFindAll;

    const result = await service.getAllProducts();
    expect(result).toEqual(products);
    expect(mockFindAll).toHaveBeenCalledWith();
  });
  it('should get product by id', async () => {
    const product = {
      name: 'test product',
      description: "that's very good product",
      price: 100,
      stock: 50,
      _id: '6765a5af3b3e98a771e2cba3',
      createdAt: '2024-12-20T17:13:19.916Z',
      updatedAt: '2024-12-20T17:13:19.916Z',
      __v: 0,
    };

    const mockFindOne = jest.fn().mockResolvedValue(product);
    (service as any).productDbService.findById = mockFindOne;

    const result = await service.getProductById(product._id);
    expect(result).toEqual(product);
    expect(mockFindOne).toHaveBeenCalledWith(product._id);
  });
  it('should update product', async () => {
    const product = {
      name: 'test product',
      description: "that's very good product",
      price: 100,
      stock: 50,
      _id: '6765a5af3b3e98a771e2cba3',
      createdAt: '2024-12-20T17:13:19.916Z',
      updatedAt: '2024-12-20T17:13:19.916Z',
      __v: 0,
    };

    const mockUpdate = jest.fn().mockResolvedValue(product);
    (service as any).productDbService.update = mockUpdate;

    const result = await service.updateProduct(product._id, product);
    expect(result).toEqual(product);
    expect(mockUpdate).toHaveBeenCalledWith(product._id, product);
  });
  it('should delete product', async () => {
    const product = {
      name: 'test product',
      description: "that's very good product",
      price: 100,
      stock: 50,
      _id: '6765a5af3b3e98a771e2cba3',
      createdAt: '2024-12-20T17:13:19.916Z',
      updatedAt: '2024-12-20T17:13:19.916Z',
      __v: 0,
    };

    const mockDelete = jest.fn().mockResolvedValue(true);
    (service as any).productDbService.delete = mockDelete;

    const result = await service.deleteProduct(product._id);
    expect(result).toEqual({ message: 'Product deleted successfully' });
    expect(mockDelete).toHaveBeenCalledWith(product._id);
  });
});
