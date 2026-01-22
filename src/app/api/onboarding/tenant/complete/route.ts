import { type NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userEmail, data } = body;

    if (!userEmail || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: userEmail and data' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // No validation - all fields are optional

    // Verify user exists before creating profile
    const existingUser = await db.user.findUnique({
      where: { email: userEmail },
      select: { id: true, userType: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found. Please ensure you are logged in.' },
        { status: 404 }
      );
    }

    if (existingUser.userType !== 'TENANT') {
      return NextResponse.json(
        { error: 'Only tenant users can create tenant profiles.' },
        { status: 403 }
      );
    }

    // Create or update tenant profile
    const tenantProfile = await db.tenantProfile.upsert({
      where: { userId: existingUser.id },
      update: {
        brandName: data.brandName || null,
        industry: data.industry || null,
        tennentExperience: data.tennentExperience || null,
        spaceLooking: data.spaceLooking || [],
        spaceNeed: data.spaceNeed ? parseInt(data.spaceNeed) : null,
        rentRangeDesire: data.rentRangeDesire ? parseInt(data.rentRangeDesire) : null,
        cityNext: data.cityNext || [],
        whenNextOpen: data.whenNextOpen || null,
        typcialCustomer: data.typcialCustomer || [],
        typcialCustomerSpend: data.typcialCustomerSpend || null,
        personalityTags: data.personalityTags || [],
        brandKeywords: data.brandKeywords || [],
        toneTags: data.toneTags || [],
        logoUrl: data.logoUrl || null,
        notes: data.notes || null,
      },
      create: {
        mode: 'BRAND', // Default mode for onboarding
        brandName: data.brandName || null,
        industry: data.industry || null,
        tennentExperience: data.tennentExperience || null,
        spaceLooking: data.spaceLooking || [],
        spaceNeed: data.spaceNeed ? parseInt(data.spaceNeed) : null,
        rentRangeDesire: data.rentRangeDesire ? parseInt(data.rentRangeDesire) : null,
        cityNext: data.cityNext || [],
        whenNextOpen: data.whenNextOpen || null,
        typcialCustomer: data.typcialCustomer || [],
        typcialCustomerSpend: data.typcialCustomerSpend || null,
        personalityTags: data.personalityTags || [],
        brandKeywords: data.brandKeywords || [],
        toneTags: data.toneTags || [],
        logoUrl: data.logoUrl || null,
        notes: data.notes || null,
        user: {
          connect: { id: existingUser.id }
        }
      },
    });

    // Update user onboarding status
    await db.user.update({
      where: { email: userEmail },
      data: { onboardingCompleted: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Tenant profile saved successfully',
      profileId: tenantProfile.id,
    });

  } catch (error) {
    console.error('Profile save error:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      // Handle unique constraint violations
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Profile already exists for this user' },
          { status: 409 }
        );
      }
      
      // Handle foreign key constraint violations
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'User not found. Please ensure you are logged in.' },
          { status: 404 }
        );
      }
      
      // Handle database connection errors
      if (error.message.includes('Can\'t reach database server') || 
          error.message.includes('Connection refused') ||
          error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please try again later.' },
          { status: 503 }
        );
      }
      
      // Handle timeout errors
      if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 408 }
        );
      }
      
      // Handle validation errors from Prisma
      if (error.message.includes('Argument validation failed')) {
        return NextResponse.json(
          { error: 'Invalid data format provided' },
          { status: 400 }
        );
      }
    }
    
    // Generic server error
    return NextResponse.json(
      { error: 'Failed to save tenant profile. Please try again later.' },
      { status: 500 }
    );
  }
}