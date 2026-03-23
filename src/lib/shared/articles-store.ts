"use client"

import { dummyArticles, type ArticleRecord } from "@/src/lib/dummyData"

const STORAGE_KEY = "sadaya_articles"

export function loadArticles(): ArticleRecord[] {
  if (typeof window === "undefined") return dummyArticles

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return dummyArticles
    const parsed = JSON.parse(raw) as ArticleRecord[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : dummyArticles
  } catch {
    return dummyArticles
  }
}

export function saveArticles(items: ArticleRecord[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
