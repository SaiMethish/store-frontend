import { ResolveFn } from '@angular/router';
import { ProductService } from './product.service';
import { inject } from '@angular/core';

export const productResolver: ResolveFn<any> = (route, state) => {
  let id=route.params['id'];
  let productService=inject(ProductService);
  return productService.getProductById(id);
};
