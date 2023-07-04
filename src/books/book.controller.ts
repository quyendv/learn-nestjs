import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Post('create')
  async create(@Body() book: CreateBookDto): Promise<Book> {
    return await this.bookService.create(book);
  }

  @Post(':id')
  async findOne(@Param('id') bookId: string) {
    return await this.bookService.findById(+bookId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
