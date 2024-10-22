// src/app/api/restaurants/route.ts
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const vibe = searchParams.get('vibe')
  const cuisineType = searchParams.get('cuisineType')
  const priceRange = searchParams.get('priceRange')

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        attributes: {
          some: {
            AND: [
              vibe ? { 
                category: 'vibe',
                value: vibe 
              } : {},
            ]
          }
        },
        cuisineTypes: cuisineType ? {
          has: cuisineType
        } : undefined,
        priceRange: priceRange || undefined,
      },
      include: {
        attributes: true,
        photos: {
          take: 1
        },
        _count: {
          select: { reviews: true }
        }
      },
      take: 20
    })

    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}