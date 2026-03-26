export interface CategoryItem {
  id: number;
  slug: string;
  en: string;
  ar: string;
  image: string;
  children?: CategoryItem[];
}

export const categoriesData: CategoryItem[] = [
  {
    id: 1,
    slug: "baby-supplies",
    en: "Baby Supplies",
    ar: "مستلزمات الأطفال",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600&h=400",
    children: [
      {
        id: 11,
        slug: "baby-carrier",
        en: "Baby Carrier",
        ar: "حمّالة أطفال",
        image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 111, slug: "clothes", en: "Clothes", ar: "ملابس", image: "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 112, slug: "carrycot", en: "Carrycot", ar: "سرير محمول", image: "https://images.unsplash.com/photo-1596464716127-f2a82984bde4?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 113, slug: "pooty", en: "Pooty", ar: "نونية", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 114, slug: "spare-table", en: "Spare Table", ar: "طاولة إضافية", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 115, slug: "summer-collection", en: "Summer Collection", ar: "مجموعة الصيف", image: "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 116, slug: "training-cup", en: "Training Cup", ar: "كوب تدريب", image: "https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 12,
        slug: "baby-stroller",
        en: "Baby Stroller",
        ar: "عربة أطفال",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984bde4?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 121, slug: "double-stroller", en: "Double Stroller", ar: "عربة مزدوجة", image: "https://images.unsplash.com/photo-1596464716127-f2a82984bde4?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 122, slug: "jogger-stroller", en: "Jogger Stroller", ar: "عربة للجري", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 123, slug: "travel-system", en: "Travel System", ar: "نظام سفر", image: "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 13,
        slug: "baby-walker",
        en: "Baby Walker",
        ar: "مشاية أطفال",
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 131, slug: "standard-walker", en: "Standard Walker", ar: "مشاية عادية", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 132, slug: "activity-center", en: "Activity Center", ar: "مركز أنشطة", image: "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 14,
        slug: "baby-bouncer",
        en: "Baby Bouncer",
        ar: "كرسي هزاز",
        image: "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 141, slug: "vibrating-bouncer", en: "Vibrating Bouncer", ar: "كرسي هزاز هزاز", image: "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 142, slug: "electronic-swing", en: "Electronic Swing", ar: "أرجوحة إلكترونية", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 15,
        slug: "baby-bed",
        en: "Baby Bed",
        ar: "سرير أطفال",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 151, slug: "crib", en: "Crib", ar: "مهد", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 152, slug: "bassinet", en: "Bassinet", ar: "سرير صغير", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 16,
        slug: "baby-bag",
        en: "Baby Bag",
        ar: "حقيبة أطفال",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 161, slug: "diaper-bag", en: "Diaper Bag", ar: "حقيبة حفاضات", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 162, slug: "backpack", en: "Backpack", ar: "حقيبة ظهر", image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "nutritional-supplies",
    en: "Nutritional Supplies",
    ar: "المكملات الغذائية",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600&h=400",
    children: [
      {
        id: 21,
        slug: "food-chair",
        en: "Food Chair",
        ar: "كرسي طعام",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 211, slug: "high-chair", en: "High Chair", ar: "كرسي مرتفع", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 22,
        slug: "bowls-and-spoon",
        en: "Bowls and Spoon",
        ar: "أطباق وملاعق",
        image: "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 221, slug: "silicone-bowls", en: "Silicone Bowls", ar: "أطباق سيليكون", image: "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 23,
        slug: "feeding-bottle",
        en: "Feeding Bottle",
        ar: "رضّاعة",
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 231, slug: "anti-colic", en: "Anti-Colic Bottle", ar: "رضّاعة مضادة للمغص", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "bathing-skin-care",
    en: "Bathing & Skin Care",
    ar: "الاستحمام والعناية بالبشرة",
    image: "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=600&h=400",
    children: [
      {
        id: 31,
        slug: "bath-tube",
        en: "Bath Tube",
        ar: "حوض استحمام",
        image: "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 311, slug: "inflatable-bath", en: "Inflatable Bath", ar: "حوض قابل للنفخ", image: "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 32,
        slug: "shower-cosmetics",
        en: "Shower Cosmetics",
        ar: "مستحضرات الاستحمام",
        image: "https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 321, slug: "baby-shampoo", en: "Baby Shampoo", ar: "شامبو أطفال", image: "https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 33,
        slug: "brushes-comb",
        en: "Brushes & Comb",
        ar: "فرش وأمشاط",
        image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 331, slug: "soft-brush", en: "Soft Brush", ar: "فرشاة ناعمة", image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "breastfeeding-supplies",
    en: "Breastfeeding Supplies",
    ar: "مستلزمات الرضاعة",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=400",
    children: [
      {
        id: 41,
        slug: "breast-pump",
        en: "Breast Pump",
        ar: "مضخة ثدي",
        image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 411, slug: "manual-pump", en: "Manual Pump", ar: "مضخة يدوية", image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=400" },
          { id: 412, slug: "electric-pump", en: "Electric Pump", ar: "مضخة كهربائية", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 42,
        slug: "milk-storage",
        en: "Milk Storage",
        ar: "تخزين الحليب",
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 421, slug: "storage-bags", en: "Storage Bags", ar: "أكياس تخزين", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
      {
        id: 43,
        slug: "baby-cover",
        en: "Baby Cover",
        ar: "غطاء رضاعة",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600&h=400",
        children: [
          { id: 431, slug: "nursing-cover", en: "Nursing Cover", ar: "غطاء تمريض", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600&h=400" },
        ],
      },
    ],
  },
];

// Helper to find category by slug at any level
export function findCategoryBySlug(slug: string): CategoryItem | undefined {
  for (const cat of categoriesData) {
    if (cat.slug === slug) return cat;
    if (cat.children) {
      for (const sub of cat.children) {
        if (sub.slug === slug) return sub;
        if (sub.children) {
          for (const subsub of sub.children) {
            if (subsub.slug === slug) return subsub;
          }
        }
      }
    }
  }
  return undefined;
}

export function findParentCategory(childSlug: string): CategoryItem | undefined {
  for (const cat of categoriesData) {
    if (cat.children?.some((c) => c.slug === childSlug)) return cat;
    if (cat.children) {
      for (const sub of cat.children) {
        if (sub.children?.some((c) => c.slug === childSlug)) return sub;
      }
    }
  }
  return undefined;
}
