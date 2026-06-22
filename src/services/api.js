import axios from "axios";
import { products, getProductById, getRelated } from "../data/products";

// Configured axios instance — ready to point at a real backend later.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 10000,
});

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Mock service layer that simulates network latency over the local catalogue.
export const productService = {
  async list() {
    await delay(700);
    return products;
  },
  async get(id) {
    await delay(500);
    const p = getProductById(id);
    if (!p) throw new Error("Product not found");
    return { ...p, related: getRelated(p) };
  },
  async search(q) {
    await delay(300);
    const term = q.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(term) || p.category.includes(term)
    );
  },
};
