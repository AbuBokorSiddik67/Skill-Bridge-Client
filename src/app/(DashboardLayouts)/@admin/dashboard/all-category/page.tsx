import CategoryManagement from '@/components/all-category'
import { getAllCategories } from '@/services/category';
import React from 'react'

export default async function AllCategoryPage() {
    const category = await getAllCategories();
  return (
      <div>
          <CategoryManagement initialCategories={category.data} />
    </div>
  )
}
