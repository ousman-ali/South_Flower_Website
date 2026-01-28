"use client";

import { getBatchData, getProductCategories } from "@/api/service";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import GetQuote from "@/components/contact/GetQuote";
import Loading from "@/components/loading/Loading";
import { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [{ name: "ecommerce_product", amount: 100000 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);
        const categories = await getProductCategories();
        setProducts(data.ecommerce_product || []);
        setCategories(categories || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Global loading done!
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb
        pageTitle="Contacts"
        pageName="Our Socials"
        currentPage="Contact South Flower"
        backgroundImage="/images/contact-bread.jpg"
      />
      <GetQuote categories={categories} products={products.data} />
    </div>
  );
};

export default page;
