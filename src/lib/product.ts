export type VariantId = "200g" | "500g" | "1kg" | "5kg";

export type Variant = {
  id: VariantId;
  label: string;
  weight: string;
  mrp: number;
  price: number;
  note: string;
};

export const VARIANTS: Variant[] = [
  { id: "200g", label: "200 gm", weight: "200 gm", mrp: 499, price: 349, note: "First taste" },
  { id: "500g", label: "500 gm", weight: "500 gm", mrp: 1199, price: 849, note: "Everyday jar" },
  { id: "1kg", label: "1 Kg", weight: "1 Kg", mrp: 2199, price: 1599, note: "Most loved" },
  { id: "5kg", label: "5 Kg", weight: "5 Kg", mrp: 4000, price: 3099, note: "Family tin" },
];

export const getVariant = (id: VariantId) => VARIANTS.find((v) => v.id === id) ?? VARIANTS[2]!;

export const savings = (v: Variant) => v.mrp - v.price;
export const savingsPct = (v: Variant) => Math.round(((v.mrp - v.price) / v.mrp) * 100);

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const PRODUCT = {
  name: "Dehati Amrit Ghee",
  nameHi: "देहाती अमृत घी",
  tagline: "शुद्ध • सात्विक • स्वदेशी",
  brandLine: "गाँव की शुद्धता, स्वास्थ्य का वादा",
};

export const REVIEWS = [
  {
    name: "Anjali Sharma",
    city: "Jaipur",
    rating: 5,
    text: "The aroma the moment you open the jar takes me straight to my grandmother's kitchen. Nothing in a supermarket comes close.",
  },
  {
    name: "Rakesh Verma",
    city: "Lucknow",
    rating: 5,
    text: "Grainy, golden, and it melts the second it touches a hot roti. We have already ordered the 5 Kg tin twice.",
  },
  {
    name: "Meera Nair",
    city: "Pune",
    rating: 5,
    text: "I was sceptical about ordering ghee online. This one is honest — thick texture, clean finish, no oily aftertaste.",
  },
  {
    name: "Sandeep Yadav",
    city: "Patna",
    rating: 5,
    text: "Packaging arrived sealed and spotless. The 1 Kg jar lasted our family a full month of daily cooking.",
  },
  {
    name: "Farah Qureshi",
    city: "Hyderabad",
    rating: 5,
    text: "Made my winter panjiri with it. My mother asked where I found ghee that smells like the village again.",
  },
];

export const FAQS = [
  {
    q: "How is Dehati Amrit Ghee made?",
    a: "It is prepared the slow, traditional way — cultured, hand-churned, and simmered gently in small batches until the grain and aroma arrive on their own.",
  },
  {
    q: "What is the shelf life?",
    a: "Nine months from the date of packing. Keep the jar in a cool, dry place and close the lid tightly after each use. Refrigeration is not required.",
  },
  {
    q: "Why does the ghee look grainy?",
    a: "A natural grain is the signature of slow-cooked ghee. Texture may shift between seasons — softer in summer, firmer in winter. Both are perfectly normal.",
  },
  {
    q: "Do you add preservatives or colour?",
    a: "No. There are no preservatives and no adulteration of any kind. The colour you see comes only from the process itself.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are packed within 24 hours and generally reach you in 3–6 working days, depending on your pin code. Shipping is free on every order.",
  },
  {
    q: "Can I return an order?",
    a: "If a jar arrives damaged or the seal is broken, write to us within 48 hours with a photograph and we will replace it — no questions asked.",
  },
];

export const RECIPES = [
  {
    title: "Atta Halwa",
    time: "25 min",
    line: "Wheat, jaggery, and a generous spoon that turns everything golden.",
  },
  {
    title: "Dal Tadka",
    time: "10 min",
    line: "A last-minute tempering that changes the whole pot.",
  },
  {
    title: "Ghee Paratha",
    time: "15 min",
    line: "Brushed hot off the tawa, the way mornings are meant to begin.",
  },
];
