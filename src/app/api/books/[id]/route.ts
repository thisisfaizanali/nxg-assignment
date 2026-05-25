import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.book.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: 'Book deleted successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { title, author, genre, year } = body;

    if (!title || !author || !genre || !year) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const updatedBook = await prisma.book.update({
      where: {
        id,
      },
      data: {
        title,
        author,
        genre,
        year: Number(year),
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    );
  }
}
