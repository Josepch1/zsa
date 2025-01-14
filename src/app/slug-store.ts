import { create } from 'zustand'

interface SlugStore {
  slug: string | null
  setSlug: (slug: string) => void
  resetSlug: () => void
}

export const useSlugStore = create<SlugStore>((set) => ({
  slug: null,
  setSlug: (slug) => set({ slug }),
  resetSlug: () => set({ slug: null }),
}))