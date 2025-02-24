import BrowsingHistoryList from "@/components/shared/browsing-history-list";
import { HomeCard } from "@/components/shared/home/home-card";
import { HomeCarousel } from "@/components/shared/home/home-carousel";
import ProductSlider from "@/components/shared/product/product-slider";
import { Card, CardContent } from "@/components/ui/card";
import InfiniteScroller from "@/components/shared/infinite-scroller";
import CategoryShop from "@/components/shared/category-shop";

import {
  getProductsForCard,
  getProductsByTag,
  getAllCategories,
} from "@/lib/actions/product.actions";
import { getSetting } from "@/lib/actions/setting.actions";
import { toSlug } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const { carousels } = await getSetting();
  const todaysDeals = await getProductsByTag({ tag: "todays-deal" });
  const bestSellingProducts = await getProductsByTag({ tag: "best-seller" });

  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({
    tag: "new-arrival",
  });
  const featureds = await getProductsForCard({
    tag: "featured",
  });
  const bestSellers = await getProductsForCard({
    tag: "best-seller",
  });
  const cards = [
    {
      title: t("Categories to explore"),
      link: {
        text: t("See More"),
        href: "/search",
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: t("Explore New Arrivals"),
      items: newArrivals,
      link: {
        text: t("View All"),
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: t("Discover Best Sellers"),
      items: bestSellers,
      link: {
        text: t("View All"),
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: t("Featured Products"),
      items: featureds,
      link: {
        text: t("Shop Now"),
        href: "/search?tag=new-arrival",
      },
    },
  ];

  return (
    <>
      <div className="flex justify-around items-center flex-wrap p-4 bg-background border-b border-gray-200">
        <div>
          <h4 className="font-semibold text-sm">
            Free shipping on orders over $50!
          </h4>
        </div>
        <div>
          <h4 className="font-semibold text-sm">
            Free delivery in Australia and USA!
          </h4>
        </div>
        <div>
          <h4 className="font-semibold text-sm">Free returns over $50!</h4>
        </div>
      </div>
      <HomeCarousel items={carousels} />
      <div className="md:p-4 md:space-y-4 bg-border">
        <HomeCard cards={cards} />
        <CategoryShop />
        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider title={t("Today's Deals")} products={todaysDeals} />
          </CardContent>
        </Card>
        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider
              title={t("Best Selling Products")}
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-background">
        <BrowsingHistoryList />
      </div>
      <InfiniteScroller />
    </>
  );
}
