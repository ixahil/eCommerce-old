"use client";
import React from "react";
import {
  ProductCard,
  CardHeader,
  CardBody,
  Title,
  Content,
  Footer,
  Actions,
  Badges,
  Price,
} from "./ProductCard";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/services/redux/slice/cart-slice";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

const ProductsGrid = ({ products, className }) => {
  const dispatch = useDispatch();
  if (!products?.length)
    return (
      <p className="text-center font-bold py-16">
        No Products found for this query
      </p>
    );
  return (
    <div className={cn("grid grid-cols-product-card", className)}>
      {products.map((product, index) => (
        <ProductCard key={index}>
          <CardHeader>
            {product?.mainImage?.url && (
              <figure className="relative w-full h-[200px]">
                <Image
                  src={product.mainImage.url}
                  alt="Shoes"
                  sizes="(min-width: 808px) 50vw, 100vw"
                  fill
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  blurDataURL={product.mainImage.url}
                  placeholder="blur"
                />
                <div className="absolute right-0 space-x-2 top-1">
                  {product.isFeatured && (
                    <span className="bg-accent text-xs px-2 py-2 font-bold text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {product.isFeatured && "Featured"}
                    </span>
                  )}
                  {product.isFreeShipping && (
                    <span className="bg-accent text-xs px-2 py-2 font-bold text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {product.isFreeShipping && "Free Shipping"}
                    </span>
                  )}
                </div>
              </figure>
            )}
          </CardHeader>
          <CardBody>
            <Title>{product.name}</Title>
            <Content></Content>
            <Price>
              <p className="font-medium text-gray-900">${product.price}</p>
            </Price>
          </CardBody>
          <Footer>
            <Badges>
              <div className="border p-2">{product?.collections?.name}</div>
            </Badges>
            <Actions>
              <Button
                className="w-full rounded-none"
                onClick={() => {
                  dispatch(
                    addToCart({
                      _id: product._id,
                      sku: product.sku,
                      price: product.price,
                      name: product.name,
                      image: product.mainImage.url,
                    })
                  );
                }}
              >
                Add to Cart
              </Button>
              <button className="text-black bg-white w-full py-2">
                Buy Now
              </button>
            </Actions>
          </Footer>
        </ProductCard>
      ))}
    </div>
  );
};

export default ProductsGrid;
