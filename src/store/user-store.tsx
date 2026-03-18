"use client";

import * as React from "react";
import { toast } from "@/src/hooks/use-toast";
import { getProductById } from "@/src/lib/products";

export type PaymentMethod = "bank" | "ewallet" | "va";

export type CartItem = {
  productId: number;
  quantity: number;
};

export type OrderStatus = "processing" | "shipping" | "delivered";

export type OrderPaymentInfo =
  | {
      method: "va";
      invoiceNumber: string;
      virtualAccountNumber: string;
    }
  | {
      method: "bank";
      invoiceNumber: string;
      bankName: string;
      virtualAccountNumber: string;
    }
  | {
      method: "ewallet";
      invoiceNumber: string;
      provider: string;
      paymentLink: string;
    };

export type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  createdAtISO: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress?: string;
  total: number;
  payment: OrderPaymentInfo;
};

export type ProductReview = {
  id: string;
  productId: number;
  orderId: string;
  createdAtISO: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  userName: string;
};

type State = {
  cart: CartItem[];
  wishlist: number[];
  orders: Order[];
  reviews: ProductReview[];
  coins: number;
  energy: number;
  seeds: Record<string, number>;
  lastDailyClaimISODate: string | null;
  user: { name: string };
};

type Actions = {
  addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  setCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  toggleWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  moveWishlistToCart: (productId: number) => void;

  checkout: (method: PaymentMethod, opts?: { provider?: string }) => Order;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  addReview: (input: {
    productId: number;
    orderId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
  }) => void;

  addCoins: (amount: number) => void;
  spendEnergy: (amount: number) => boolean;
  addEnergy: (amount: number) => void;
  claimDailyBonus: () => boolean;
  addSeeds: (seedId: string, amount: number) => void;
  useSeed: (seedId: string) => boolean;
};

const STORAGE_KEY = "josjis:user-store:v1";

const initialState: State = {
  cart: [],
  wishlist: [],
  orders: [],
  reviews: [],
  coins: 2450,
  energy: 20,
  seeds: { talas: 3, pala: 2, jambu: 2 },
  lastDailyClaimISODate: null,
  user: { name: "User" },
};

function safeParse(json: string | null) {
  if (!json) return null;
  try {
    return JSON.parse(json) as unknown;
  } catch {
    return null;
  }
}

function generateId(prefix: string) {
  const rand = Math.random().toString(16).slice(2, 10).toUpperCase();
  const time = Date.now().toString(16).toUpperCase();
  return `${prefix}-${time}-${rand}`;
}

function computeTotal(items: OrderItem[]) {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}

function buildPaymentInfo(
  method: PaymentMethod,
  opts?: { provider?: string },
): OrderPaymentInfo {
  const invoiceNumber = generateId("INV");

  if (method === "va") {
    return {
      method: "va",
      invoiceNumber,
      virtualAccountNumber: `8808${Math.floor(100000000 + Math.random() * 899999999)}`,
    };
  }

  if (method === "bank") {
    const bankName = opts?.provider ?? "BCA";
    return {
      method: "bank",
      invoiceNumber,
      bankName,
      virtualAccountNumber: `8801${Math.floor(100000000 + Math.random() * 899999999)}`,
    };
  }

  const provider = opts?.provider ?? "GoPay";
  return {
    method: "ewallet",
    invoiceNumber,
    provider,
    paymentLink: `https://pay.josjis.local/${invoiceNumber}`,
  };
}

const UserStoreContext = React.createContext<(State & Actions) | null>(null);

export function UserStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<State>(initialState);

  React.useEffect(() => {
    const parsed = safeParse(globalThis.localStorage?.getItem(STORAGE_KEY));
    if (parsed && typeof parsed === "object") {
      const next = parsed as Partial<State>;
      setState((prev) => ({
        ...prev,
        ...next,
        cart: Array.isArray(next.cart) ? next.cart : prev.cart,
        wishlist: Array.isArray(next.wishlist) ? next.wishlist : prev.wishlist,
        orders: Array.isArray(next.orders) ? next.orders : prev.orders,
        reviews: Array.isArray(next.reviews) ? next.reviews : prev.reviews,
        coins: typeof next.coins === "number" ? next.coins : prev.coins,
        energy: typeof next.energy === "number" ? next.energy : prev.energy,
        seeds:
          next.seeds && typeof next.seeds === "object" ? (next.seeds as State["seeds"]) : prev.seeds,
        lastDailyClaimISODate:
          typeof next.lastDailyClaimISODate === "string" || next.lastDailyClaimISODate === null
            ? (next.lastDailyClaimISODate as State["lastDailyClaimISODate"])
            : prev.lastDailyClaimISODate,
      }));
    }
  }, []);

  React.useEffect(() => {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence errors (private mode, quota, etc)
    }
  }, [state]);

  const addToCart: Actions["addToCart"] = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return;

    setState((prev) => {
      const existing = prev.cart.find((c) => c.productId === productId);
      const nextCart = existing
        ? prev.cart.map((c) =>
            c.productId === productId
              ? { ...c, quantity: c.quantity + quantity }
              : c,
          )
        : [...prev.cart, { productId, quantity }];
      return { ...prev, cart: nextCart };
    });

    toast({
      title: "Berhasil ditambahkan",
      description: `"${product.name}" masuk ke keranjang.`,
    });
  };

  const removeFromCart: Actions["removeFromCart"] = (productId) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => c.productId !== productId),
    }));
  };

  const setCartQuantity: Actions["setCartQuantity"] = (productId, quantity) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((c) =>
        c.productId === productId
          ? { ...c, quantity: Math.max(1, quantity) }
          : c,
      ),
    }));
  };

  const clearCart: Actions["clearCart"] = () => {
    setState((prev) => ({ ...prev, cart: [] }));
  };

  const toggleWishlist: Actions["toggleWishlist"] = (productId) => {
    const product = getProductById(productId);
    if (!product) return;

    let description = "Wishlist diperbarui.";
    setState((prev) => {
      const exists = prev.wishlist.includes(productId);
      description = exists
        ? `"${product.name}" dihapus dari wishlist.`
        : `"${product.name}" masuk ke wishlist.`;
      const next = exists
        ? prev.wishlist.filter((id) => id !== productId)
        : [...prev.wishlist, productId];
      return { ...prev, wishlist: next };
    });

    toast({ title: "Wishlist", description });
  };

  const removeFromWishlist: Actions["removeFromWishlist"] = (productId) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((id) => id !== productId),
    }));
  };

  const moveWishlistToCart: Actions["moveWishlistToCart"] = (productId) => {
    const product = getProductById(productId);
    if (!product) return;

    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((id) => id !== productId),
      cart: prev.cart.some((c) => c.productId === productId)
        ? prev.cart.map((c) =>
            c.productId === productId
              ? { ...c, quantity: c.quantity + 1 }
              : c,
          )
        : [...prev.cart, { productId, quantity: 1 }],
    }));

    toast({
      title: "Dipindahkan ke keranjang",
      description: `"${product.name}" dipindahkan dari wishlist.`,
    });
  };

  const checkout: Actions["checkout"] = (method, opts) => {
    let createdOrder: Order | null = null;
    setState((prev) => {
      const items = prev.cart
        .map((c) => {
          const p = getProductById(c.productId);
          if (!p) return null;
          return { productId: c.productId, quantity: c.quantity, price: p.price };
        })
        .filter(Boolean) as OrderItem[];

      if (items.length === 0) return prev;

      const createdAtISO = new Date().toISOString();
      const orderId = generateId("ORD");
      const payment = buildPaymentInfo(method, opts);
      const order: Order = {
        id: orderId,
        createdAtISO,
        status: "processing",
        items,
        total: computeTotal(items),
        payment,
      };
      createdOrder = order;
      return { ...prev, orders: [order, ...prev.orders], cart: [] };
    });

    if (!createdOrder) {
      toast({
        title: "Keranjang kosong",
        description: "Tambahkan produk ke keranjang sebelum checkout.",
      });
      return {
        id: "ORD-EMPTY",
        createdAtISO: new Date().toISOString(),
        status: "processing",
        items: [],
        total: 0,
        payment: buildPaymentInfo(method, opts),
      };
    }

    toast({
      title: "Checkout berhasil",
      description: `Invoice ${createdOrder.payment.invoiceNumber} berhasil dibuat.`,
    });
    return createdOrder;
  };

  const setOrderStatus: Actions["setOrderStatus"] = (orderId, status) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    }));
  };

  const addReview: Actions["addReview"] = (input) => {
    const product = getProductById(input.productId);
    if (!product) return;

    const review: ProductReview = {
      id: generateId("REV"),
      productId: input.productId,
      orderId: input.orderId,
      createdAtISO: new Date().toISOString(),
      rating: input.rating,
      comment: input.comment,
      userName: state.user.name,
    };

    setState((prev) => ({
      ...prev,
      reviews: [review, ...prev.reviews],
    }));

    toast({
      title: "Terima kasih!",
      description: "Rating dan ulasan kamu sudah tersimpan.",
    });
  };

  const addCoins: Actions["addCoins"] = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    setState((prev) => ({ ...prev, coins: prev.coins + amount }));
  };

  const spendEnergy: Actions["spendEnergy"] = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) return true;
    let ok = false;
    setState((prev) => {
      if (prev.energy < amount) return prev;
      ok = true;
      return { ...prev, energy: prev.energy - amount };
    });
    if (!ok) {
      toast({
        title: "Energi tidak cukup",
        description: "Tunggu bonus harian atau kembali besok untuk energi tambahan.",
      });
    }
    return ok;
  };

  const addEnergy: Actions["addEnergy"] = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    setState((prev) => ({ ...prev, energy: prev.energy + amount }));
  };

  const isoDateOnly = (d: Date) => d.toISOString().slice(0, 10);

  const claimDailyBonus: Actions["claimDailyBonus"] = () => {
    const today = isoDateOnly(new Date());
    let claimed = false;
    setState((prev) => {
      if (prev.lastDailyClaimISODate === today) return prev;
      claimed = true;
      return {
        ...prev,
        lastDailyClaimISODate: today,
        energy: prev.energy + 10,
        seeds: {
          ...prev.seeds,
          talas: (prev.seeds.talas ?? 0) + 1,
          jambu: (prev.seeds.jambu ?? 0) + 1,
        },
      };
    });
    if (claimed) {
      toast({
        title: "Bonus harian diterima",
        description: "+10 energi, +1 bibit Talas, +1 bibit Jambu.",
      });
    }
    return claimed;
  };

  const addSeeds: Actions["addSeeds"] = (seedId, amount) => {
    if (!seedId || !Number.isFinite(amount) || amount <= 0) return;
    setState((prev) => ({
      ...prev,
      seeds: { ...prev.seeds, [seedId]: (prev.seeds[seedId] ?? 0) + amount },
    }));
  };

  const useSeed: Actions["useSeed"] = (seedId) => {
    let ok = false;
    setState((prev) => {
      const current = prev.seeds[seedId] ?? 0;
      if (current <= 0) return prev;
      ok = true;
      return { ...prev, seeds: { ...prev.seeds, [seedId]: current - 1 } };
    });
    if (!ok) {
      toast({
        title: "Bibit habis",
        description: "Ambil bonus harian untuk dapat bibit tambahan.",
      });
    }
    return ok;
  };

  const value: State & Actions = {
    ...state,
    addToCart,
    removeFromCart,
    setCartQuantity,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    moveWishlistToCart,
    checkout,
    setOrderStatus,
    addReview,
    addCoins,
    spendEnergy,
    addEnergy,
    claimDailyBonus,
    addSeeds,
    useSeed,
  };

  return (
    <UserStoreContext.Provider value={value}>
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore() {
  const ctx = React.useContext(UserStoreContext);
  if (!ctx) throw new Error("useUserStore must be used within UserStoreProvider");
  return ctx;
}

